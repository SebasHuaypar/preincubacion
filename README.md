# Pre-incubación START Lima - Landing Page

Landing page oficial para el programa de pre-incubación dirigido a jóvenes emprendedores de provincias del Perú.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **Base de datos**: Supabase
- **Iconos**: Lucide React

## 📋 Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta la migración SQL en supabase/migrations/001_applications.sql en el SQL Editor de Supabase
3. Copia las credenciales de tu proyecto

### 3. Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

## 🎨 Personalización

### Logos e Imágenes

Reemplaza los placeholders en `public/images/`:
- `logo-start-lima.png` - Logo oficial de START Lima

### Colores

Los colores del brand están definidos en `src/app/globals.css`. Para personalizar:

```css
:root {
  --accent-green-500: #10b981; /* Color principal */
  --primary-900: #0f172a;       /* Color institucional */
}
```

## 🏃‍♂️ Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Build

```bash
npm run build
```

## 📤 Despliegue en Vercel

1. Push tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno
4. Deploy automático

## 📱 Secciones de la Landing

1. **Hero** - Above the fold con CTAs
2. **Social Proof** - Logos de aliados
3. **Program Overview** - ¿Qué es el programa?
4. **Target Audience** - ¿A quién está dirigido?
5. **Methodology** - ¿Cómo aprenderás?
6. **Program Structure** - Estructura detallada por semana
7. **Deliverables** - Entregables semanales
8. **Benefits** - Beneficios para participantes
9. **Demo Day** - Evento final
10. **Final CTA** - Llamado a la acción
11. **Footer** - Contacto y redes sociales

## 📝 Formulario de Inscripción

El formulario captura:
- Datos personales (nombre, email, edad, ciudad, institución, teléfono)
- Motivación e idea de negocio
- Disponibilidad y compromiso horario
- Experiencia previa (opcional)
- Comunidad (opcional)

Los datos se almacenan en Supabase con validación y constraints.

## 🎯 Características

✅ Diseño mobile-first responsive
✅ Animaciones con Framer Motion
✅ Validación de formularios con Zod
✅ Integración con Supabase
✅ SEO optimizado
✅ Performance optimizado
✅ Accesibilidad (WCAG)
✅ Ilustraciones modernas generadas

## 📧 Contacto

**Camila Cabrera**  
Project Manager – START Lima  
📧 camila.cabrera@start-lima.com  
📱 +51 960 062 757

---

Desarrollado con ❤️ para START Lima
