"""Tests integración API + PostgreSQL — requiere docker compose."""
import pytest
from fastapi.testclient import TestClient

from api.main import TEST_SUBFASE_ID, app

IND1 = "d4444444-4444-4444-8444-444444444401"
IND2 = "d4444444-4444-4444-8444-444444444402"
IND3 = "d4444444-4444-4444-8444-444444444403"


@pytest.fixture
def client():
    with TestClient(app) as c:
        c.post("/api/v1/test/reset")
        yield c
        c.post("/api/v1/test/reset")


def _revision(client, ind_id: str):
    return client.post(f"/api/v1/indicadores/{ind_id}/enviar-revision")


def test_tc06_aprobar_indicador(client):
    _revision(client, IND1)
    r = client.patch(
        f"/api/v1/indicadores/{IND1}/decision",
        json={"accion": "APROBAR"},
    )
    assert r.status_code == 200
    assert r.json()["estado"] == "APROBADO"


def test_tc07_rechazo_y_nueva_version(client):
    _revision(client, IND2)
    r = client.patch(
        f"/api/v1/indicadores/{IND2}/decision",
        json={
            "accion": "RECHAZAR",
            "justificacion": "Documento TEST incompleto segun checklist example.invalid",
        },
    )
    assert r.status_code == 200
    assert r.json()["estado"] == "RECHAZADO"
    r2 = client.post(f"/api/v1/indicadores/{IND2}/nueva-version")
    assert r2.status_code == 200
    assert r2.json()["estado"] == "EN_REVISION"


def test_tc08_cierre_subfase_incompleta(client):
    ev = client.get(f"/api/v1/subfases/{TEST_SUBFASE_ID}/puede-cerrar")
    assert ev.status_code == 200
    assert ev.json()["puede_cerrar"] is False
    assert ev.json()["motivos"]
    r = client.post(
        f"/api/v1/subfases/{TEST_SUBFASE_ID}/avance",
        json={"confirmar": True},
    )
    assert r.status_code == 409
    assert r.json()["detail"]["error"]["code"] == "SIGESA_WF_INCOMPLETE"


def test_cierre_subfase_todos_aprobados(client):
    for ind in (IND1, IND2, IND3):
        _revision(client, ind)
        client.patch(
            f"/api/v1/indicadores/{ind}/decision",
            json={"accion": "APROBAR"},
        )
    ev = client.get(f"/api/v1/subfases/{TEST_SUBFASE_ID}/puede-cerrar")
    assert ev.json()["puede_cerrar"] is True
    r = client.post(
        f"/api/v1/subfases/{TEST_SUBFASE_ID}/avance",
        json={"confirmar": True},
    )
    assert r.status_code == 200
    assert r.json()["nuevoEstado"] == "CERRADA"


def test_concurrencia_doble_dictamen(client):
    _revision(client, IND1)
    r1 = client.patch(
        f"/api/v1/indicadores/{IND1}/decision",
        json={"accion": "APROBAR"},
    )
    r2 = client.patch(
        f"/api/v1/indicadores/{IND1}/decision",
        json={"accion": "RECHAZAR", "justificacion": "Segundo intento TEST conflicto example.invalid"},
    )
    codes = sorted([r1.status_code, r2.status_code])
    assert codes == [200, 409]
