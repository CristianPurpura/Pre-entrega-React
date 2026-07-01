# Pre Entrega React

Proyecto ecommerce con React y Vite.

## Instalacion

```bash
npm install
npm run dev
```

## Variables de entorno

Crear `.env.local` con:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Funcionalidades

- Carrito con Context API
- Autenticacion con Firebase
- CRUD de productos con Firestore
- Busqueda y paginacion de productos
- Rutas protegidas para admin y perfil
- Diseño responsive y SEO basico

## Rutas

- `/` inicio
- `/productos` catalogo
- `/producto/:id` detalle
- `/carrito` carrito
- `/login` login y registro
- `/admin` panel de productos
- `/perfil` perfil de usuario

## Deploy

```bash
npm run build
```

En Netlify agregar las mismas variables de entorno y volver a desplegar.

