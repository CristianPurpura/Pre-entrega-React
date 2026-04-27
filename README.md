# Pre entrega React

Proyecto ecommerce con Vite y React.

## Instalar dependencias

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build para producción

```bash
npm run build
```

## Deploy en Netlify

1. Hacer push a GitHub:

```bash
git remote add origin https://github.com/tu-usuario/Pre-entrega-React.git
git branch -M main
git push -u origin main
```

2. En Netlify:
   - Ir a https://app.netlify.com
   - Elegir "New site from Git"
   - Conectar repositorio GitHub
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy

3. Compartir URL de Netlify generado.

## Características

- Catálogo de 6 productos informáticos
- Carrito con Context API
- Ruteo con react-router-dom (/, /productos, /producto/:id, /carrito)
- Layout consistente con Header, Nav, Footer
- Información de 3 personas en footer

