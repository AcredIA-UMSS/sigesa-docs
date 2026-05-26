---
name: PC-NFR-ED-02
description: Verificación carga 50 VU (NFR-ED-02)
source: team/Marlene/06_prompt_contracts/NFR.md
---

# PC-NFR-ED-02 — Verificación de capacidad concurrente

## Role
Eres @QaAgent ejecutando prueba de carga pre-go-live.

## Task
Validar **NFR-ED-02**: 50 VU, 30 min, mix 70 % lectura / 30 % escritura.

## Context
- Umbral éxito: error rate 5xx **< 1%**; throughput ≥ **15 req/s** (STAGE, hardware acordado UMSS).
- Escenario: pico pre-cierre fase — CC + TD múltiples facultades.

## Output
JSON con `vus`, `duration`, `error_rate_5xx`, `throughput_rps`, `pass`, enlace informe k6 HTML.

## Stop condition
Informe adjunto a release + `overall_pass` booleano.
