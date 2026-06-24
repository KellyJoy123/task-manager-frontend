# Task Manager Frontend

Aplicación web para la gestión de tareas personales desarrollada con **React**, **Vite**, **TypeScript** y **Joy UI**. Consume la API REST construida con NestJS para realizar operaciones CRUD sobre tareas.

---

## Índice

* [Descripción](#descripción)
* [Tecnologías utilizadas](#tecnologías-utilizadas)
* [Características](#características)
* [Requisitos previos](#requisitos-previos)
* [Instalación y ejecución](#instalación-y-ejecución)
* [Arquitectura y funcionamiento](#arquitectura-y-funcionamiento)
* [Estructura del proyecto](#estructura-del-proyecto)
* [Variables de entorno](#variables-de-entorno)
* [Scripts disponibles](#scripts-disponibles)
* [Autora](#autora)

---

## Descripción

Task Manager Frontend es una interfaz web moderna que permite administrar tareas personales mediante una experiencia intuitiva y responsiva.

La aplicación consume una API REST desarrollada con NestJS y permite crear, visualizar, editar, completar y eliminar tareas en tiempo real.

---

## Tecnologías utilizadas

| Tecnología       | Propósito                       |
| ---------------- | ------------------------------- |
| React 18         | Construcción de interfaces      |
| Vite             | Bundler y entorno de desarrollo |
| TypeScript       | Tipado estático                 |
| Joy UI (MUI)     | Sistema de diseño y componentes |
| Axios            | Comunicación con la API         |
| React Hot Toast  | Notificaciones                  |
| CSS Flexbox/Grid | Layout responsivo               |

---

## Características

* Crear nuevas tareas.
* Editar título y descripción.
* Marcar tareas como completadas o pendientes.
* Eliminar tareas.
* Filtrar tareas por estado.
* Visualizar estadísticas y progreso.
* Notificaciones visuales de éxito y error.
* Diseño responsivo para escritorio y dispositivos móviles.
* Manejo centralizado de llamadas HTTP mediante Axios.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

### Node.js

Versión 18 o superior.

```bash
node --version
```

### API Backend

La API NestJS debe estar ejecutándose.

Por defecto:

```text
http://localhost:3000
```

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/task-manager-frontend.git

cd task-manager-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo:

```bash
cp .env.example .env
```

Configurar:

```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

### 5. Generar build de producción

```bash
npm run build
```

### Aplicación disponible en

```text
http://localhost:5173
```

---

## Arquitectura y funcionamiento

La aplicación sigue una estructura modular basada en separación de responsabilidades.

### Flujo principal

1. El usuario interactúa con la interfaz.
2. Los componentes invocan acciones del hook `useTasks`.
3. `useTasks` utiliza funciones del módulo `api/tasks.ts`.
4. Axios realiza la petición al backend.
5. La respuesta actualiza el estado local.
6. La interfaz se renderiza nuevamente con los datos actualizados.

### Gestión de estado

El estado de las tareas se administra mediante React Hooks personalizados.

```text
UI
 ↓
useTasks
 ↓
api/tasks.ts
 ↓
Axios Client
 ↓
NestJS API
 ↓
MongoDB
```

---

## Estructura del proyecto

```text
src/
├── api/
│   ├── client.ts
│   └── tasks.ts
│
├── components/
│   ├── tasks/
│   │   ├── TaskCard.tsx
│   │   ├── TaskEditModal.tsx
│   │   ├── TaskFilters.tsx
│   │   ├── TaskForm.tsx
│   │   └── TaskList.tsx
│   │
│   └── ui/
│       ├── Header.tsx
│       └── StatsBar.tsx
│
├── hooks/
│   └── useTasks.ts
│
├── pages/
│   └── HomePage.tsx
│
├── theme/
│   └── index.ts
│
├── types/
│   └── task.ts
│
├── App.tsx
└── main.tsx
```

---

## Variables de entorno

| Variable     | Descripción        | Valor por defecto     |
| ------------ | ------------------ | --------------------- |
| VITE_API_URL | URL base de la API | http://localhost:3001/api |

### Ejemplo

```env
VITE_API_URL=http://localhost:3001/api
```

---

## Scripts disponibles

### Desarrollo

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Vista previa de producción

```bash
npm run preview
```

### Linter

```bash
npm run lint
```

---

