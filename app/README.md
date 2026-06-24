# SIGESA Application Modules (Git Submodules)

> **Context-Aware Development:** Backend and Frontend code maintained in separate repositories as Git submodules for independent versioning, clear separation of concerns, and shared documentation context.

---

## Directory Structure

```
app/
├── sigesa-backend/           ← Git submodule: Backend (Spring Boot)
└── README.md                 ← This file
```

---

## Submodules

### 1. Backend: `sigesa-backend-springboot`

**Repository:** `git@github.com:AcredIA-UMSS/sigesa-backend-springboot.git`  
**Path:** `app/sigesa-backend`  
**Language:** Java / Spring Boot  
**Technology Stack:**
- Spring Boot 3.x
- Maven
- PostgreSQL 16 (data access)
- AWS EventBridge + SQS FIFO (event-driven)
- JWT + RBAC (authentication)

**Key Responsibilities:**
- RESTful API endpoints (OpenAPI 3.0 contracts)
- Domain logic & state machine enforcement
- Database persistence (append-only Evidence)
- Event publishing & choreography
- RBAC validation & JWT token management

---

## Getting Started with Submodules

### Clone the Repository with Submodules

```bash
# Clone main repo + initialize and update all submodules
git clone --recurse-submodules git@github.com:AcredIA-UMSS/sigesa-docs.git

# OR if already cloned, initialize submodules:
cd sigesa-docs
git submodule update --init --recursive
```

### Pull Latest Changes from Submodules

```bash
# Update all submodules to latest remote versions
git submodule update --remote --recursive

# OR fetch + pull each submodule individually
cd app/sigesa-backend && git pull origin main && cd ../..
cd app/sigesa-front && git pull origin main && cd ../..
```

### Update Submodule to Specific Commit

```bash
# Point backend to a specific commit (from docs repo perspective)
cd app/sigesa-backend
git checkout <commit-hash>
cd ../..

# Stage the change in parent repo
git add app/sigesa-backend

# Commit
git commit -m "chore: pin sigesa-backend to <commit-hash>"
git push
```

---

## Workflow: Adding Features Across Modules

### Scenario: Adding a New Evidence Validator Endpoint

**Step 1: Update Docs Repo (Context)**
```bash
# In sigesa-docs main repo
# 1. Update API contracts
vim docs/05_dti/api_contracts_cloud.md
# Add POST /evidencias/{id}/validate endpoint spec

# 2. Update backend design_phases if needed
cd app/sigesa-backend
vim design_phases.md
# Add validator implementation phase

# 3. Commit in parent repo
cd ../..
git add docs/05_dti/api_contracts_cloud.md
git commit -m "docs: add evidence validator endpoint contract"
git push
```

**Step 2: Implement in Backend Submodule**
```bash
# In backend repo
cd app/sigesa-backend
git checkout -b feature/evidence-validator

# Implement validator endpoint following contract
vim src/main/java/com/umss/sigesa/api/EvidenceController.java
# Reference: ../../docs/05_dti/api_contracts_cloud.md

# Follow state machine from ../../context/04_state_machine.md
# Enforce RBAC from ../../docs/04_fsd/reglas_negocio.md

git add .
git commit -m "feat: implement evidence validator endpoint (sigesa-docs API contract)"
git push origin feature/evidence-validator
```

**Step 4: Update Submodule Pointers in Docs Repo**
```bash
# Back in docs repo, pull latest from submodules
cd /path/to/sigesa-docs

# Update backend submodule to latest
cd app/sigesa-backend && git pull origin main && cd ../..
git add app/sigesa-backend

# Commit in docs repo
git commit -m "chore: pin sigesa-backend and sigesa-front to latest"
git push
```

---

## Development Setup

### Backend Setup

```bash
cd app/sigesa-backend

# Build with Maven
mvn clean install

# Run tests
mvn test

# Start server (Spring Boot)
mvn spring-boot:run

# Server runs on http://localhost:8080
```

**Dependencies & Context:**
- Read `design_phases.md` for architecture decisions
- Reference `../../docs/05_dti/DTI.md` for system design
- Follow `../../docs/04_fsd/casos_uso.md` for API requirements
- Check `../../context/04_state_machine.md` for state validation

---

## Key Files in Each Submodule

### Backend (`app/sigesa-backend`)

| File | Purpose |
|------|---------|
| `design_phases.md` | Implementation phases & architecture decisions |
| `agents.md` | IA/AI agent integration strategy |
| `pom.xml` | Maven dependencies (Spring Boot, AWS SDK, DB drivers) |
| `src/main/java/com/umss/sigesa/` | Source code (controllers, services, entities) |

---

## Context Preservation & Queries

### When Backend/Frontend Developers Need Context

**Question:** "What is the exact state transition rule for Indicador approval?"  
**Answer:** Reference `../../context/04_state_machine.md` (shared in both submodules)

**Question:** "What roles can view this Evidence?"  
**Answer:** Reference `../../docs/04_fsd/reglas_negocio.md` (enforced in backend, guarded in frontend)

**Question:** "What is the API contract for uploading Evidence?"  
**Answer:** Reference `../../docs/05_dti/api_contracts_cloud.md` (canonical endpoint spec)

**Question:** "Which ADR covers append-only Evidence?"  
**Answer:** Reference `../../docs/adr/ADR-0001-append-only-evidence.md`

---

## Branch Strategy

| Branch | Repo | Purpose |
|--------|------|---------|
| `main` | All | Stable production-ready code |
| `develop` | All | Integration branch for features |
| `feature/*` | Backend/Frontend | Feature branches (issue-specific) |
| `module4` | sigesa-docs | Main documentation branch (UMSS course) |

### Syncing Documentation with Code

When backend/frontend code references the docs repo context, use:

```bash
# In backend or frontend submodule
cd /path/to/app/sigesa-backend

# Read contract from parent docs repo
cat ../../docs/05_dti/api_contracts_cloud.md

# After implementing per spec, commit with reference
git commit -m "feat: implement endpoint per docs API contract §3.2"
```

---

## Common Issues & Solutions

### Issue: Submodule Shows "Not Tracking Branch"

```bash
# Solution: Check out the correct branch in submodule
cd app/sigesa-backend
git checkout main
git pull origin main
cd ../..
git add app/sigesa-backend
git commit -m "chore: update backend to main branch"
```

### Issue: Submodule Commit Hash Mismatch

```bash
# Solution: Update submodules to latest from remote
git submodule update --remote --merge

# Or update specific submodule
cd app/sigesa-backend && git pull origin main && cd ../..
git add app/sigesa-backend
```

### Issue: Frontend Tests Reference Backend API Contract

```bash
# Solution: API contract is in parent docs repo
# Frontend tests should reference: ../../docs/05_dti/api_contracts_cloud.md

# Example in test:
// Reference contract spec for mock responses
const API_CONTRACT = require('../../docs/05_dti/api_contracts_cloud.md');
```

---

## Documentation Hierarchy

```
sigesa-docs/ (parent repo)
├── context/
│   ├── 03_domain_glossary.md      ← Ubiquitous language
│   └── 04_state_machine.md        ← State transitions
├── docs/
│   ├── 04_fsd/
│   │   ├── casos_uso.md           ← Feature requirements
│   │   ├── reglas_negocio.md      ← RBAC & business rules
│   │   └── api_contracts.md       ← Contract specs (shared ref)
│   ├── 05_dti/
│   │   ├── DTI.md                 ← System architecture
│   │   └── api_contracts_cloud.md ← OpenAPI 3.0 (canonical)
│   └── adr/
│       ├── ADR-0001-*.md          ← Append-only Evidence
│       ├── ADR-0006-*.md          ← PostgreSQL 16
│       ├── ADR-0010-*.md          ← EventBridge choreography
│       └── README.md              ← All ADRs indexed
└── app/
    ├── sigesa-backend/            ← Submodule (refers to docs/)
    └── README.md                  ← This file
```

**Key Rule:** Backend and Frontend always refer to **parent repo** (sigesa-docs) for contracts, state machine, glosario, and ADRs. Never duplicate these in submodule-local files.

---

## Collaboration Between Teams

| Team | Repo | Key Reference |
|------|------|----------------|
| **Backend** | `sigesa-backend-springboot` | `../../docs/05_dti/api_contracts_cloud.md` |
| **Docs/Arch** | `sigesa-docs` (main) | `docs/05_dti/DTI.md`, `docs/adr/` |
| **UMSS Course** | `sigesa-docs` (main) | `team/<integrante>/` |

---

## Checklist: Before Committing Submodule Changes

- [ ] Code references correct context file from parent docs repo?
- [ ] State transitions validated against `../../context/04_state_machine.md`?
- [ ] RBAC rules enforced per `../../docs/04_fsd/reglas_negocio.md`?
- [ ] API endpoints follow `../../docs/05_dti/api_contracts_cloud.md` contract?
- [ ] Tests mock using contract specs, not hardcoded values?
- [ ] Commit message references docs context or ADR where applicable?

---

## See Also

- **Backend Setup:** `app/sigesa-backend/design_phases.md`
- **API Contracts:** `docs/05_dti/api_contracts_cloud.md`
- **State Machine:** `context/04_state_machine.md`
- **RBAC Rules:** `docs/04_fsd/reglas_negocio.md`
- **Architecture:** `docs/05_dti/DTI.md`
- **ADRs:** `docs/adr/README.md`

---

**Last Updated:** 2026-06-19  
**Version:** 1.0
