---
name: PC-SIG-08-gobernanza-seguridad-agents
id: PC-SIG-08
description: Actualización de Gobernanza y Seguridad en AGENTS.md
type: prompt-contract
date: 2026-05-17
---
ACTIVA EL CONTRATO DE PROMPT: [PC-SIG-08] - Actualización de Gobernanza y Seguridad en AGENTS.md

### 1. CONTEXTO (Context)
Eres el Lead AI Architect y Security Officer del proyecto SIGESA (UMSS). Nuestro archivo maestro `AGENTS.md` ya contiene la visión general, los perfiles de agentes, y los catálogos de Skills y Rules. Para alcanzar un nivel de madurez empresarial y cumplir con auditorías normativas, necesitamos expandir este manifiesto integrando políticas estrictas de Seguridad, Privacidad, Trazabilidad, Auditoría y Gestión de Riesgos de la IA.

### 2. ENTRADA ESPERADA (Input)
1. Lee el archivo actual `AGENTS.md` ubicado en la raíz del repositorio.
2. Toma exactamente el siguiente contenido normativo que te proporciono a continuación para integrarlo:

<contenido_normativo>
## 6. Políticas de seguridad
| Política | Descripción |
|----------|-------------|
| **P-S01** | Sin secretos en prompts, reglas o issues públicos. |
| **P-S02** | JWT y datos personales mínimos en contexto del agente. |
| **P-S03** | Dependencias IA escaneadas en CI (véase `M-AI-011`). |
| **P-S04** | Entornos `prod` y `staging` con IAM distintos; agentes sin acceso directo `prod` DB. |

## 7. Privacidad
- Datos de carrera y documentos son **institucionales sensibles**: minimizar contenido en logs de terceros.  
- Portal público solo expone lo definido por JD (`RB-07`, alcance LFSD §2.1).  
- Cualquier uso de modelo cloud: revisión de **DPIA** institucional UMSS antes de tráfico de datos identificables.

## 8. Trazabilidad y explainability
- Toda sugerencia IA persistida: `prompt_hash`, `model_id`, `trace_id`, autor humano que aceptó/rechazó.  
- Explicaciones cortas obligatorias (`M-AI-013`).  
- Correlación con `matriz_trazabilidad.md` (IDs PRD-REQ, FSD-UC).

## 9. Auditoría
- Eventos de aceptación/rechazo de sugerencias IA en misma tabla append-only que acciones humanas (conceptualmente alineado `NFR-013`).  
- Revisiones trimestrales conjuntas DUEA + AcredIA con muestreo HER.

## 10. Gestión de riesgos (IA)
| Riesgo | Control |
|--------|---------|
| Alucinación normativa | Golden set + RAG corpus aprobado |
| Automatismo indebido | RB-11 + transiciones de estado solo con rol humano |
| Fuga de datos | P-S01–P04 + kill-switch feature flag |
</contenido_normativo>

### 3. SALIDA ESPERADA (Output)
Actualiza el archivo `AGENTS.md` en la raíz. Debes:
1. **Preservar:** Mantén intactas las secciones del 1 al 5 (Visión, Perfiles, Skills, Rules, Workflow).
2. **Integrar:** Añade las secciones del 6 al 10 proporcionadas en el input al final del documento.
3. **Formatear:** Asegúrate de que las tablas Markdown se rendericen correctamente y el espaciado sea limpio y profesional.

### 4. RESTRICCIONES INQUEBRANTABLES (Invariants)
1. **Regla de No Destrucción:** Tienes PROHIBIDO sobrescribir el archivo eliminando el catálogo de Skills o Rules existente. Esta es una operación de "Append/Merge".
2. **Fidelidad del Texto:** No alteres el significado de las políticas proporcionadas. Debes mantener las referencias a `DPIA`, `NFR-013`, `RB-11` y los controles de alucinación tal como fueron redactados.
3. **Zero-Icons:** Aplica la regla global de optimización de tokens. Cero emojis o íconos decorativos en las nuevas secciones.

### 5. MODOS DE FALLO (Failure Modes)
Aborta y repórtalo si:
- *Fallo 1:* El archivo `AGENTS.md` no existe en la raíz. (Notifícame para que primero corramos el contrato `PC-SIG-07`).
- *Fallo 2:* Detectas que el contenido proporcionado entra en conflicto directo con alguna Skill o Rule documentada previamente.

Confirma tu comprensión y procede a actualizar `AGENTS.md` añadiendo las capas de gobernanza.
