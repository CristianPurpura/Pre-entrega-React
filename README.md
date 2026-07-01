# Pre Entrega React

Proyecto ecommerce realizado con React + Vite.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalacion y ejecucion local

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en desarrollo:

```bash
npm run dev
```

3. Build de produccion:

```bash
npm run build
```

4. Previsualizacion local de build:

```bash
npm run preview
```

## Variables de entorno (Firebase)

Si queres usar Firebase real, crear un archivo `.env` en la raiz con:

```bash
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

Si estas variables no existen, la app funciona en modo local de prueba:

- Login/registro mock con localStorage
- CRUD de productos en localStorage + carga inicial desde `public/productos.json`

## Funcionalidades implementadas

### Requerimiento 1

- Carrito con Context API
- Agregar, eliminar y vaciar carrito
- Autenticacion con Firebase Auth (o fallback local)
- Rutas protegidas para panel admin y perfil

### Requerimiento 2

- CRUD de productos (crear, listar, editar y eliminar)
- Validaciones de formulario (nombre requerido y precio mayor a 0)
- Modal de confirmacion para eliminar
- Estados de carga y mensajes de error

### Requerimiento 3

- UI responsive (grid adaptable para cards y layout)
- React-Bootstrap en grillas de footer
- Styled-components en portada
- React Icons en acciones de admin
- SEO basico con React Helmet Async

### Requerimiento 4

- Barra de busqueda en tiempo real
- Paginador de productos

### Requerimiento 5

- README detallado
- Configuracion lista para deploy en Netlify (`netlify.toml`)

## Rutas principales

- `/` Inicio
- `/productos` Catalogo
- `/producto/:id` Detalle
- `/carrito` Carrito
- `/login` Login/registro
- `/admin` Panel CRUD protegido
- `/perfil` Perfil protegido

## Deploy en Netlify

1. Subir repositorio a GitHub.
2. En Netlify elegir **New site from Git**.
3. Configurar:

- Build command: `npm run build`
- Publish directory: `dist`

4. Si usas Firebase real, agregar las variables `VITE_FIREBASE_*` en el panel de Netlify.

