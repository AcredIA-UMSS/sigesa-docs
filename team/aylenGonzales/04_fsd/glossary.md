# Glosario — AcredIA / SIGESA
**Archivo:** `team/aylenGonzales/docs/fsd/glossary.md`
**Versión:** 1.0 | **Fecha:** 2026-05-14 | **Autora:** Aylen Mariangel Gonzales Alvino
**Fuente:** FSD v2.0 §10 | **Relaciones:** BRD v2 · PRD v1 · MRD v1

---

> Los términos están agrupados por dominio y ordenados alfabéticamente dentro de cada grupo.
> Los identificadores entre corchetes `[CC]`, `[TD]`, `[JD]`, `[P]` corresponden a los roles del sistema.

---

## 1. Dominio de Acreditación y Normativa

**ARCU-SUR**
Sistema de Acreditación Regional de Carreras Universitarias del MERCOSUR. Marco normativo regional que establece los criterios de calidad para la acreditación de carreras de grado en los países miembro. AcredIA/SIGESA incluye sus taxonomías preconfiguradas desde el día 1.

**CEUB**
Comité Ejecutivo de la Universidad Boliviana. Organismo que coordina el sistema universitario nacional en Bolivia y define las fases e indicadores del proceso de evaluación y acreditación institucional. Sus taxonomías de fases e indicadores están preconfiguradas en SIGESA.

**Evaluación institucional**
Proceso sistemático mediante el cual una unidad académica analiza su desempeño en relación con estándares predefinidos (CEUB/ARCU-SUR) con el fin de obtener o renovar la acreditación formal.

**Expediente de acreditación**
Conjunto estructurado de evidencias, documentos y registros que una carrera presenta ante el CEUB o ARCU-SUR para demostrar el cumplimiento de los criterios de calidad. En SIGESA, cada carrera tiene un expediente digital único.

**Fase CEUB**
Cada una de las etapas definidas por el CEUB dentro del proceso de autoevaluación y acreditación (ej.: Fase 1 - Organización y Gestión, Fase 2 - Gestión Académica). Las fases están preconfiguradas en SIGESA y no pueden modificarse sin autorización.

**Indicador**
Criterio medible asociado a una fase CEUB o dimensión ARCU-SUR que permite evaluar el grado de cumplimiento de un estándar de calidad (ej.: Indicador 2.3 - Actualización del plan de estudios).

**Modalidad**
Forma de impartición de una carrera universitaria: presencial, semipresencial o a distancia. Es un campo de filtro en el buscador de SIGESA.

---

## 2. Dominio del Sistema (SIGESA)

**AcredIA**
Nombre del producto/plataforma. Sistema Inteligente de Gestión de Evidencias para la acreditación universitaria, desarrollado para la DUEA de la UMSS.

**ADR (Architecture Decision Record)**
Registro formal de una decisión arquitectónica tomada en el proyecto. En SIGESA, el ADR-0002 define la política de inmutabilidad del LOG_AUDITORIA.

**Control de versiones**
Mecanismo automático del sistema que registra cada actualización de un documento con número de versión incremental (`v1.0`, `v2.0`…), autor, timestamp y hash SHA-256. Las versiones anteriores son inmutables.

**Dashboard**
Pantalla principal personalizada según el rol del usuario al iniciar sesión. Cada rol ([CC], [TD], [JD]) tiene un dashboard con accesos directos a sus funciones específicas.

**Expediente digital**
Representación electrónica del expediente de acreditación de una carrera dentro de SIGESA. Contiene todas las evidencias cargadas, sus versiones y el historial de aprobaciones.

**Hash SHA-256**
Función criptográfica utilizada por SIGESA para generar una huella digital única de cada archivo cargado. Permite detectar duplicados y garantizar la integridad del documento a lo largo del tiempo.

**LOG_AUDITORIA**
Tabla de base de datos que registra de forma inmutable todas las acciones realizadas en el sistema (carga, versión, aprobación, rechazo, búsqueda, login). Ninguna entrada puede modificarse ni eliminarse (constraint ADR-0002). Columnas principales: `id`, `usuario_id`, `accion`, `entidad`, `entidad_id`, `timestamp`, `ip_origen`, `detalle_json`.

**Prompt Contract (PC)**
Contrato formal que define el comportamiento esperado de un componente de IA generativa dentro de un caso de uso del sistema. Incluye system prompt, input esperado, output esperado y criterios de rechazo.

**SIGESA**
Sistema de Gestión de Evidencias para la Acreditación. Nombre técnico del producto AcredIA en el contexto institucional de la UMSS/DUEA.

**Taxonomía**
Conjunto de categorías predefinidas y jerarquizadas (fases, indicadores, tipos de documento) que estructuran la organización de evidencias en SIGESA, derivadas de los marcos CEUB y ARCU-SUR.

---

## 3. Roles del Sistema

**[CC] — Coordinador de Carrera**
Usuario responsable de cargar, actualizar y hacer seguimiento de las evidencias de su carrera. Es el actor principal de FSD-UC-001 y FSD-UC-002. Accede con correo `@umss.edu.bo`.

**[JD] — Jefe de Departamento**
Usuario con autoridad de aprobación final en el flujo CC→TD→JD. Genera reportes ejecutivos PDF (FSD-UC-005) y tiene visibilidad completa sobre todas las carreras de su departamento.

**[P] — Público**
Rol de solo lectura, sin autenticación requerida (previsto para el portal público MRD-N-10, pendiente en GAP-001). Podrá consultar el estado general de acreditación de las carreras.

**[TD] — Técnico DUEA**
Usuario de la Dirección Universitaria de Evaluación y Acreditación. Primer revisor en el flujo de aprobación (FSD-UC-003). Responsable de validar la pertinencia técnica de las evidencias antes de elevarlas al [JD].

---

## 4. Dominio de Proceso y Flujo

**Aprobación final**
Estado `APROBADO_FINAL` de una evidencia, alcanzado tras la aprobación del [TD] y del [JD]. Es el estado requerido para que una evidencia sea incluida en reportes y métricas de avance.

**Flujo de aprobación CC→TD→JD**
Secuencia de revisión y aprobación que sigue una evidencia desde su carga por el [CC], revisión técnica por el [TD] y aprobación final por el [JD]. Definida en FSD-UC-003.

**Gestión**
Período académico semestral identificado por año y semestre (ej.: `2026-I`, `2026-II`). Usado como campo de filtro y agrupación en reportes y búsquedas.

**Justificación de rechazo**
Texto obligatorio (mínimo 20 caracteres) que el [TD] o [JD] debe ingresar al rechazar una evidencia. Queda registrado en el log de auditoría y es enviado al [CC] por notificación.

**Prompt Coverage**
Métrica AI-SDLC que mide qué proporción de los casos de uso del FSD tiene un Prompt Contract definido. Fórmula: `n_UC_con_PC / total_UC`. Valor actual: 4/7 ≈ 57 %.

**Req Coverage**
Métrica AI-SDLC que mide qué proporción de los requerimientos de mercado (MRD-N) tienen cobertura funcional en el FSD. Fórmula: `n_MRD-N_con_FSD-UC / 12`. Valor actual: 10/12 ≈ 83 %.

**Test Coverage**
Métrica AI-SDLC que mide qué proporción de los casos de uso tiene al menos un caso de prueba (TC) asociado. Fórmula: `n_UC_con_TC / total_UC`.

---

## 5. Institucional

**DUEA**
Dirección Universitaria de Evaluación y Acreditación. Unidad de la UMSS responsable de coordinar los procesos de autoevaluación y acreditación de las carreras universitarias. Es el cliente institucional primario de SIGESA.

**UMSS**
Universidad Mayor de San Simón. Universidad pública boliviana con sede en Cochabamba. El dominio institucional de correo es `@umss.edu.bo`, único dominio permitido para autenticación en SIGESA.

---

## Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 1.0 | 2026-05-14 | Aylen Gonzales Alvino | Versión inicial: 23 términos derivados de FSD v2.0 §10 |