# 🧩 shared-base-code

A reusable collection of Angular **standalone components, services, directives, guards, and models** that can be shared across multiple Angular projects using **Git submodules**.

---

## 📦 What This Is

This repository contains shared Angular code that can be easily plugged into other Angular applications. All code is organized as **standalone Angular features**, and designed to be **imported and used directly**, without needing to publish to npm.

---

## 🛠️ What’s Inside

- ✅ Standalone Components
- ✅ Services (`@Injectable({ providedIn: 'root' })`)
- ✅ Reusable Models and Interfaces
- ✅ Modular SCSS styling (shared design tokens or themes)
- ✅ Built for Angular 15+ with standalone app support

---

## 🔗 How to Use in Another Angular Project

You can integrate this code into any Angular project using **Git submodules**.

### 📁 1. Add This Repo as a Git Submodule

In the root of your Angular project:

```bash
git submodule add https://github.com/YOUR-USERNAME/shared-base-code.git src/shared

```

This will create:

```bash
/src
  /app
  /shared   ✅ ← points to this repo!
```
📥 2. Import and Use a Shared Component
Example: Using the ModalWindowComponent in your app.

✅ In your app.component.ts (or any other standalone component):

```bash
import { Component } from '@angular/core';
import { ModalWindowComponent } from '../shared/projects/shared/src/lib/components/modal-window/modal-window.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ModalWindowComponent],
  template: `<app-modal-window></app-modal-window>`,
})
export class AppComponent {}
```

