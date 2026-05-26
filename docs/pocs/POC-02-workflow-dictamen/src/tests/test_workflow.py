"""Tests unitarios lógica pura — POC-02."""
from api.workflow import evaluar_cierre, nueva_version_tras_rechazo, validar_dictamen

IND1 = "d4444444-4444-4444-8444-444444444401"
IND2 = "d4444444-4444-4444-8444-444444444402"


def test_aprobar_desde_en_revision():
    nuevo, err = validar_dictamen("EN_REVISION", "APROBAR", None)
    assert err is None
    assert nuevo == "APROBADO"


def test_rechazar_sin_justificacion_falla():
    nuevo, err = validar_dictamen("EN_REVISION", "RECHAZAR", "corta")
    assert nuevo is None
    assert err == "SIGESA_VAL_JUSTIFICATION_SHORT"


def test_rechazar_con_justificacion_ok():
    nuevo, err = validar_dictamen(
        "EN_REVISION",
        "RECHAZAR",
        "Falta firma TEST_director en documento example.invalid",
    )
    assert err is None
    assert nuevo == "RECHAZADO"


def test_nueva_version_solo_desde_rechazado():
    nuevo, err = nueva_version_tras_rechazo("RECHAZADO")
    assert nuevo == "EN_REVISION"
    _, err2 = nueva_version_tras_rechazo("APROBADO")
    assert err2 == "SIGESA_WF_INVALID_STATE"


def test_evaluar_cierre_con_pendientes():
    inds = [
        {"id": IND1, "codigo": "TEST_IND-01", "estado": "APROBADO", "obligatorio": True},
        {"id": IND2, "codigo": "TEST_IND-02", "estado": "EN_REVISION", "obligatorio": True},
    ]
    r = evaluar_cierre(inds)
    assert r["puede_cerrar"] is False
    assert len(r["motivos"]) >= 1
    assert len(r["indicadores_pendientes"]) == 1


def test_evaluar_cierre_todos_aprobados():
    inds = [
        {"id": IND1, "codigo": "TEST_IND-01", "estado": "APROBADO", "obligatorio": True},
        {"id": IND2, "codigo": "TEST_IND-02", "estado": "APROBADO", "obligatorio": True},
    ]
    r = evaluar_cierre(inds)
    assert r["puede_cerrar"] is True
    assert r["motivos"] == []


def test_dictamen_invalido_desde_pendiente():
    nuevo, err = validar_dictamen("PENDIENTE", "APROBAR", None)
    assert nuevo is None
    assert err == "SIGESA_WF_INVALID_STATE"


def test_cierre_ignora_no_obligatorio_pendiente():
    inds = [
        {"id": IND1, "codigo": "TEST_IND-01", "estado": "APROBADO", "obligatorio": True},
        {"id": IND2, "codigo": "TEST_IND-02", "estado": "PENDIENTE", "obligatorio": False},
    ]
    r = evaluar_cierre(inds)
    assert r["puede_cerrar"] is True
