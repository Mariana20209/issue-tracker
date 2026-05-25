md# Issue Tracker - Sistema de Gestión de Incidencias

Aplicación web desarrollada como prueba técnica para el cargo de Desarrollador Frontend Junior. Permite gestionar reportes de errores (bugs) de forma organizada y eficiente.

##  Demo en vivo
- **Frontend:** https://issue-tracker-[https://issue-tracker-amber-nu.vercel.app/].vercel.app
- **API:** https://issue-tracker-8scw.onrender.com/incidencias

## Stack Tecnológico
- React.js + Vite
- React Router DOM
- Tailwind CSS
- SweetAlert2
- JSON Server (API REST simulada)
- LocalStorage (sesión simulada)
- Git + GitHub (GitFlow)

## Funcionalidades
- Login con nombre y rol, sesión persistente en LocalStorage
- Rutas protegidas
- CRUD completo de incidencias
- Confirmación con SweetAlert2 al eliminar
- Skeleton loader mientras carga la API
- Buscador por título
- Filtros por estado
- Contadores de incidencias por estado
- Badges de colores por prioridad y estado
- Diseño responsivo

## Estructura del proyecto
src/
├── pages/
├── components/
├── services/
├── helpers/
└── routes/

## Instalación local

```bash
git clone https://github.com/Mariana20209/issue-tracker.git
cd issue-tracker
npm install
npm run dev
```

En otra terminal:
```bash
json-server db.json --port 3001
```