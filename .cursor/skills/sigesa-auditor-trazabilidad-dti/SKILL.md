---
name: sigesa-auditor-trazabilidad-dti
description: |
  Actúa como Tech Lead y Auditor de Calidad para SIGESA. Compila la versión final del DTI
  y genera la Matriz de Trazabilidad, asegurando que cada requerimiento de negocio esté atado
  a una decisión arquitectónica y un caso de uso.
allowed-tools:
  - read
  - edit
  - ask-user
model-tier: claude-3-opus
fsd-version-min: v0.1
status: stable
owner: Módulo 4 – UMSS (Equipo SIGESA)
---

# Skill: Auditor de Trazabilidad y Compilador DTI

> El guardián final de la coherencia. Asegura que no existan requerimientos huérfanos ni
> componentes técnicos sin justificación de negocio.

## 1. Cuándo activarlo (triggers)
- DURANTE: La fase de cierre del diseño, antes de implementar o realizar un release.
- ARRANCA cuando: El usuario solicita "Generar la matriz de trazabilidad", "Compilar el DTI" o "Verificar cobertura PRD→FSD".

## 2. Entradas obligatorias
- Carpeta de Negocio: `docs/01_brd/`, `docs/02_mrd/`, `docs/03_prd/`.
- Carpeta Técnica: `docs/04_fsd/` (Casos de Uso, ADRs, NFRs).

## 3. Procedimiento Estricto (Workflow)
1. **Recolecta IDs:** Extrae IDs de requerimiento y US en BRD/PRD.
2. **Mapea a FSD:** Localiza cada Caso de Uso y verifica existencia de diseño asociado (ER, endpoints, ADR, NFR).
3. **Genera Matriz:** Produce `matriz_trazabilidad.md` con columnas: `BRD_ID | PRD_US | FSD_CU | ADRs | NFRs | Componente`.
4. **Detecta Huérfanos:** Marca items sin correspondencia y clasifica severidad (info/warning/error).
5. **Compila DTI:** Consolida `DTI.md` en `docs/05_dti/` incluyendo: resumen ejecutivo, diagramas Mermaid (ER/sequence), NFRs, ADRs y la matriz de trazabilidad como anexo.
6. **Solicita revisión humana:** Si existen inconsistencias críticas, detener antes de escribir `DTI.md` final y pedir aprobación.

## 4. Salida esperada
- `matriz_trazabilidad.md` en repo raíz o `docs/08_trazabilidad/` según convención.
- `docs/05_dti/DTI.md` con estructura clara y artefactos embebidos.
- `report_findings.md` con lista de huérfanos e inconsistencias.

## 5. Anti-patrones
- Añadir componentes técnicos en DTI sin un requisito BRD que lo justifique. El agente debe marcar y pedir justificación.

## 6. Verificación (Checklist Auditor)
- [ ] Todas las US del PRD tienen al menos 1 Caso de Uso en FSD.
- [ ] Cada Caso de Uso tiene referencias a ADR/NFR o componente técnico.
- [ ] Matriz de trazabilidad completa y sin IDs duplicadas.

## 7. Ejemplo de tabla en `matriz_trazabilidad.md`

| BRD_ID | PRD_US | FSD_CU | ADRs | NFRs | Componente |
|--------|--------|--------|------|------|------------|
| BRD-01 | US-01  | CU-01  | ADR-0001 | NFR-001 | mod-evidencias |
