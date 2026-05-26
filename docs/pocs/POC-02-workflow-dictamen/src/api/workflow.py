"""
Lógica pura de workflow SIGESA POC-02 (FSD-UC-003, RB-03).
"""
from __future__ import annotations

from typing import TypedDict

ESTADOS = frozenset({"PENDIENTE", "EN_REVISION", "APROBADO", "RECHAZADO"})
TRANSICIONES_DICTAMEN = {
    "EN_REVISION": {"APROBAR": "APROBADO", "RECHAZAR": "RECHAZADO"},
}
MIN_JUSTIFICACION = 20


class IndicadorRow(TypedDict):
    id: str
    codigo: str
    estado: str
    obligatorio: bool


class CierreEval(TypedDict):
    puede_cerrar: bool
    motivos: list[str]
    indicadores_pendientes: list[dict]


def validar_dictamen(estado_actual: str, accion: str, justificacion: str | None) -> tuple[str | None, str | None]:
    """Retorna (nuevo_estado, codigo_error)."""
    accion = accion.upper()
    if estado_actual not in TRANSICIONES_DICTAMEN:
        return None, "SIGESA_WF_INVALID_STATE"
    if accion not in ("APROBAR", "RECHAZAR"):
        return None, "SIGESA_WF_INVALID_ACTION"
    if accion == "RECHAZAR":
        j = (justificacion or "").strip()
        if len(j) < MIN_JUSTIFICACION:
            return None, "SIGESA_VAL_JUSTIFICATION_SHORT"
    return TRANSICIONES_DICTAMEN[estado_actual][accion], None


def nueva_version_tras_rechazo(estado_actual: str) -> tuple[str | None, str | None]:
    if estado_actual != "RECHAZADO":
        return None, "SIGESA_WF_INVALID_STATE"
    return "EN_REVISION", None


def evaluar_cierre(indicadores: list[IndicadorRow]) -> CierreEval:
    pendientes = [
        {"id": i["id"], "codigo": i["codigo"], "estado": i["estado"]}
        for i in indicadores
        if i["obligatorio"] and i["estado"] != "APROBADO"
    ]
    motivos: list[str] = []
    if pendientes:
        for p in pendientes:
            motivos.append(
                f"Indicador obligatorio {p['codigo']} en estado {p['estado']}; se requiere APROBADO."
            )
    return {
        "puede_cerrar": len(pendientes) == 0,
        "motivos": motivos,
        "indicadores_pendientes": pendientes,
    }
