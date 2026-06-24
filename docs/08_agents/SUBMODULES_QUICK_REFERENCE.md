# Git Submodules Quick Reference — SIGESA

> **Fast commands for working with Backend & Frontend submodules while maintaining documentation context.**

---

## 🚀 First-Time Setup

```bash
# Clone with submodules
git clone --recurse-submodules git@github.com:AcredIA-UMSS/sigesa-docs.git

# OR if already cloned
cd sigesa-docs
git submodule update --init --recursive
```

---

## 📥 Pulling Latest Changes

```bash
# Update all submodules to latest commits
git submodule update --remote --recursive

# OR update specific submodule
cd app/sigesa-backend
git pull origin main
cd ../..

# Stage & commit the submodule pointer update
git add app/sigesa-backend
git commit -m "chore: update backend to latest"
git push
```

---

## 🌿 Creating Features in Submodules

### Backend Workflow

```bash
# 1. Go to backend submodule
cd app/sigesa-backend

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Implement feature
# → Reference: ../../docs/05_dti/api_contracts_cloud.md
# → Reference: ../../context/04_state_machine.md
# → Reference: ../../docs/04_fsd/reglas_negocio.md

# 4. Commit with context reference
git add .
git commit -m "feat: add my feature (refs docs/05_dti API contract §X)"

# 5. Push
git push origin feature/my-feature

# 6. Create PR in backend repo (not in docs repo)
# → Link PR to design_phases.md phase

# 7. After merge, update docs repo pointer
cd ../..
git add app/sigesa-backend
git commit -m "chore: pin backend after my-feature merge"
git push
```

### Frontend Workflow

```bash
# 1. Go to frontend submodule
cd app/sigesa-front

# 2. Create feature branch
git checkout -b feature/my-ui

# 3. Implement UI
# → Reference: ../../docs/05_dti/api_contracts_cloud.md (API spec)
# → Reference: ../../docs/04_fsd/reglas_negocio.md (RBAC rules)
# → Reference: ../../context/03_domain_glossary.md (terminology)

# 4. Commit with context reference
git add .
git commit -m "feat: add my-ui (refs docs API contract §Y)"

# 5. Push & create PR
git push origin feature/my-ui

# 6. After merge, update docs repo pointer
cd ../..
git add app/sigesa-front
git commit -m "chore: pin frontend after my-ui merge"
git push
```

---

## 🔄 Syncing Submodule to Specific Commit

```bash
# If you need to pin backend to specific commit
cd app/sigesa-backend
git checkout <commit-hash>
cd ../..

git add app/sigesa-backend
git commit -m "chore: pin sigesa-backend to <commit-hash> for stability"
git push
```

---

## 📂 Directory References (Use in Code)

When you're **inside a submodule**, reference parent docs:

```bash
# From app/sigesa-backend/src/main/java/...
# Reference API contract 2 levels up:
// See: ../../docs/05_dti/api_contracts_cloud.md

# From app/sigesa-front/src/components/...
# Reference state machine 2 levels up:
// See: ../../context/04_state_machine.md
```

---

## ⚠️ Common Pitfalls

### ❌ Creating commits in docs repo that reference submodule files
```bash
# WRONG:
cd app/sigesa-backend/src
vim Controller.java
git add -A
git commit -m "modified backend code"
# ^^ This commits in backend repo, NOT docs repo!
```

### ✅ Correct way: Update submodule pointer in docs repo
```bash
# RIGHT:
cd app/sigesa-backend
git pull origin main
cd ../..
git add app/sigesa-backend
git commit -m "chore: update backend pointer"
# ^^ This commits in docs repo
```

### ❌ Modifying docs from inside submodule
```bash
# WRONG:
cd app/sigesa-backend
vim ../../docs/05_dti/api_contracts_cloud.md
# ^^ You're in backend repo; this edit won't be committed to backend repo!
```

### ✅ Correct way: Modify docs in docs repo
```bash
# RIGHT:
cd /path/to/sigesa-docs  # Back to docs repo root
vim docs/05_dti/api_contracts_cloud.md
git add docs/05_dti/api_contracts_cloud.md
git commit -m "docs: update API contract"
git push
```

---

## 🔍 Viewing Submodule Status

```bash
# See which commits submodules are pointing to
git status

# Show all submodules
git config --file .gitmodules --name-only --get-regexp path

# Check submodule details
cat .gitmodules

# Inspect specific submodule
cd app/sigesa-backend && git log --oneline -1 && cd ../..
```

---

## 🚨 Fixing Submodule Issues

### Submodule "Not tracking branch"

```bash
# Solution 1: Checkout main
cd app/sigesa-backend
git checkout main
git pull origin main
cd ../..

# Solution 2: Update from docs repo
git submodule update --remote sigesa-backend
git add app/sigesa-backend
git commit -m "chore: sync backend to remote main"
```

### Submodule pointing to old commit

```bash
# Update all submodules to latest remote
git submodule update --remote --merge

# Commit the pointer updates
git add app/
git commit -m "chore: update all submodules to latest"
```

### Submodule failed to clone

```bash
# Remove and re-initialize
git submodule deinit app/sigesa-backend
git submodule init
git submodule update --recursive
```

---

## 📋 Recommended .gitignore for Submodules

Both submodules should have:

```gitignore
# Backend (.gitignore in sigesa-backend)
target/
*.class
.classpath
.project
.settings/

# Frontend (.gitignore in sigesa-front)
node_modules/
.next/
*.js.map
.env.local
```

---

## 🔗 Related Documentation

| Reference | Path | Purpose |
|-----------|------|---------|
| **Submodules Guide** | `app/README.md` | Full guide (this reference is a quick summary) |
| **API Contracts** | `docs/05_dti/api_contracts_cloud.md` | Backend/Frontend contract (shared spec) |
| **State Machine** | `context/04_state_machine.md` | Indicator/Phase/Evidence transitions |
| **RBAC Rules** | `docs/04_fsd/reglas_negocio.md` | Permission rules (backend enforces, frontend guards) |
| **Backend Setup** | `app/sigesa-backend/design_phases.md` | Implementation phases & architecture |

---

## ✅ Pre-Commit Checklist

Before committing code in a submodule, verify:

- [ ] Feature branch follows naming: `feature/*`, `bugfix/*`, `hotfix/*`?
- [ ] Code references parent repo context (API contract, state machine, RBAC)?
- [ ] Commit message includes context reference (e.g., "refs docs/05_dti §3")?
- [ ] All tests pass locally?
- [ ] No hardcoded values (use contracts instead)?

---

**Quick Ref Version:** 1.0  
**Last Updated:** 2026-06-19
