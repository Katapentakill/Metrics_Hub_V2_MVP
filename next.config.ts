
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de internacionalización (i18n)
  i18n: {
    locales: ['es', 'en'], // Idiomas soportados
    defaultLocale: 'es',  // Idioma por defecto (el que usarán las rutas sin prefijo)
  },
  //... otras configuraciones
};

module.exports = nextConfig;