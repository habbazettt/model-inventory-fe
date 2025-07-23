# 📦 model-inventory-fe

Frontend Repository for `model-inventory-fe` — a modern web application interface for managing model inventory operations.

---

## 🧭 Branching Strategy

This project follows a **multi-stage branching strategy** for smooth feature development, staging, and production releases.

### 🌳 Main Branches

| Branch Name         | Purpose                                                                 |
|---------------------|-------------------------------------------------------------------------|
| `main`              | Mirrors the latest **production code** as deployed in the live system. |
| `release/prod`      | Stable **production-ready** branch. Tag versions here for releases.     |
| `release/non-prod`  | Active non-production environment (e.g., UAT, integration testing).     |
| `release/staging`   | Staging area for testing new features before merging into non-prod.     |
| `feature/<name>`    | Temporary branches for developing new features, fixes, or improvements. |

> ✅ **Note:** Only thoroughly locally tested and approved changes from `release/staging` get merged into `release/non-prod`, and later into `release/prod`.

---

## 🚀 Getting Started

1. Clone the repository  

   ```bash
   git clone https://github.com/habbazettt/model-inventory-fe.git
