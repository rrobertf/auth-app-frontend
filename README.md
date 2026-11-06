# Secure Auth System — Frontend

Cliente React 19 para [secure-auth-system](https://github.com/rrobertf/secure-auth-system): registro en dos pasos, login y dashboard protegido. Conserva la interfaz existente y utiliza Vite para desarrollo/compilación y Vitest + Testing Library para pruebas; sustituye las dependencias antiguas de Create React App.

## Inicio

Node.js 22.12+ y npm:

```bash
npm ci
cp .env.example .env
npm start
```

Abre `http://localhost:3000` y ejecuta el backend en `http://localhost:5001`. `VITE_API_URL` cambia la URL completa de la API (por defecto `http://localhost:5001/api`). Es una variable pública de compilación; no incluyas secretos. Configura `FRONTEND_ORIGIN` en el backend para el origen exacto de tu frontend. Usa HTTPS para ambos servicios en un despliegue público.

```bash
npm test
npm run test:watch
npm run build
npm run preview
npm audit
```

La compilación se guarda en `dist/` (antes `build/`). El punto de entrada es `index.html` en la raíz y `src/index.jsx`. Vite utiliza `VITE_*`, no `REACT_APP_*` ni `%PUBLIC_URL%`. No hay comando `eject`.

## Autenticación

1. Registro o login devuelve un JWT; `/api/auth/me` valida la sesión antes de mostrar el dashboard.
2. El token se guarda en `sessionStorage` por pestaña. Sobrevive a recargas de esa pestaña; ya no se conserva de forma permanente en `localStorage`.
3. Un token antiguo de `localStorage` se mueve una sola vez a la sesión de la pestaña y se elimina de allí.
4. Cerrar sesión limpia usuario y token. Una respuesta de verificación tardía no puede restaurar una sesión cerrada. Requests de verificación se cancelan al cambiar de sesión y tienen un timeout de 10 segundos.
5. Si falla la verificación, se pide iniciar sesión de nuevo. Los errores se muestran en la página.

El token es accesible a JavaScript y no es una cookie HttpOnly. Un JWT copiado sigue válido hasta su expiración; el backend actual no implementa revocación. La aplicación no incluye 2FA, recuperación de contraseñas ni ajustes de cuenta funcionales; esos elementos del dashboard son demostrativos.

Las validaciones de registro reflejan el backend: mínimo 8 caracteres y máximo 72 bytes UTF-8. Las etiquetas están asociadas a sus campos para teclado, lectores de pantalla y pruebas. Las contraseñas antiguas de seis caracteres se permiten en login.

## Pruebas

Testing Library comprueba login y perfil verificado, restauración/cierre de sesión por pestaña, rechazo de tokens inválidos, validación de registro y respuestas tardías después de cancelar. Las llamadas HTTP se simulan; las pruebas de API con SQLite viven en el backend. GitHub Actions ejecuta pruebas y compilación en cada PR.
