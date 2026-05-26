import dotenv from 'dotenv';
import { supabaseAdmin } from '../config/supabase.js';

dotenv.config();

async function createSampleNews() {
  // Obtener países
  const { data: paises, error: paisError } = await supabaseAdmin
    .from('paises')
    .select('id, nombre, slug');

  if (paisError) {
    console.error('Error obteniendo países:', paisError.message);
    return;
  }

  // Obtener superadmin
  const { data: usuarios, error: userError } = await supabaseAdmin
    .from('usuarios')
    .select('id')
    .eq('username', 'superadmin')
    .limit(1);

  if (userError || !usuarios || usuarios.length === 0) {
    console.error('Error: No se encontró el superadmin');
    return;
  }

  const autorId = usuarios[0].id;

  // Noticias de ejemplo para cada país
  const noticiasEjemplo = [
    // Ecuador
    {
      titulo: 'Latinoamérica Comparte llega a Ecuador con proyectos de impacto social',
      slug: 'latinoamerica-comparte-llega-ecuador',
      resumen: 'Iniciamos operaciones en Ecuador con programas enfocados en educación, emprendimiento y desarrollo comunitario.',
      imagen: 'ecuador-educacion.jpg',
      contenido: `<h2>Un nuevo capítulo en Ecuador</h2>
<p>Nos complace anunciar el inicio de nuestras operaciones en Ecuador, donde trabajaremos de la mano con comunidades locales para impulsar proyectos de alto impacto social.</p>

<h3>Áreas de enfoque</h3>
<ul>
<li><strong>Educación:</strong> Programas de capacitación y formación para jóvenes</li>
<li><strong>Emprendimiento:</strong> Apoyo a pequeños negocios y microempresas</li>
<li><strong>Desarrollo comunitario:</strong> Proyectos de infraestructura y servicios básicos</li>
</ul>

<h3>Alianzas estratégicas</h3>
<p>Hemos establecido alianzas con organizaciones locales, universidades y el sector privado para maximizar el impacto de nuestras iniciativas.</p>

<p>Invitamos a toda la comunidad ecuatoriana a ser parte de este movimiento que busca construir una región más humana, productiva y consciente.</p>`,
      pais_slug: 'ecuador',
      estado: 'publicado',
      destacado: true,
      autor_id: autorId
    },
    {
      titulo: 'Programa de becas educativas beneficia a 200 estudiantes ecuatorianos',
      slug: 'programa-becas-educativas-ecuador',
      resumen: 'Nuestro programa de becas ha permitido que 200 jóvenes ecuatorianos accedan a educación de calidad.',
      imagen: 'ecuador-becas.jpg',
      contenido: `<h2>Transformando vidas a través de la educación</h2>
<p>El programa de becas educativas de Latinoamérica Comparte ha beneficiado a 200 estudiantes ecuatorianos durante este año, brindándoles acceso a educación de calidad y oportunidades de desarrollo.</p>

<h3>Resultados destacados</h3>
<ul>
<li>200 becas otorgadas en diferentes niveles educativos</li>
<li>85% de tasa de retención escolar</li>
<li>Mejora promedio del 30% en el rendimiento académico</li>
</ul>

<h3>Testimonios</h3>
<p>"Gracias a esta beca pude continuar mis estudios universitarios y ahora estoy a punto de graduarme como ingeniera. Este programa cambió mi vida." - María González, becaria 2025</p>`,
      pais_slug: 'ecuador',
      estado: 'publicado',
      destacado: false,
      autor_id: autorId
    },
    // Argentina
    {
      titulo: 'Red de emprendedores argentinos crece con apoyo de Latinoamérica Comparte',
      slug: 'red-emprendedores-argentina',
      resumen: 'Más de 150 emprendedores argentinos se han unido a nuestra red de apoyo mutuo y desarrollo empresarial.',
      imagen: 'argentina-emprendedores.jpg',
      contenido: `<h2>Fortaleciendo el ecosistema emprendedor</h2>
<p>La red de emprendedores de Latinoamérica Comparte en Argentina ha crecido significativamente, alcanzando más de 150 miembros activos que colaboran, aprenden y crecen juntos.</p>

<h3>Servicios de la red</h3>
<ul>
<li>Mentorías con empresarios exitosos</li>
<li>Talleres de capacitación en gestión empresarial</li>
<li>Acceso a financiamiento y capital semilla</li>
<li>Networking y oportunidades de negocio</li>
</ul>

<h3>Casos de éxito</h3>
<p>Varios emprendimientos de la red han logrado escalar sus operaciones y generar empleo en sus comunidades, demostrando el poder de la colaboración y el apoyo mutuo.</p>`,
      pais_slug: 'argentina',
      estado: 'publicado',
      destacado: true,
      autor_id: autorId
    },
    {
      titulo: 'Proyecto de agricultura sostenible transforma comunidades rurales argentinas',
      slug: 'agricultura-sostenible-argentina',
      resumen: 'Implementamos técnicas de agricultura sostenible que han mejorado la productividad y los ingresos de familias rurales.',
      imagen: 'argentina-agricultura.jpg',
      contenido: `<h2>Innovación en el campo argentino</h2>
<p>Nuestro proyecto de agricultura sostenible ha transformado la vida de más de 80 familias rurales en Argentina, implementando técnicas modernas que respetan el medio ambiente y aumentan la productividad.</p>

<h3>Técnicas implementadas</h3>
<ul>
<li>Sistemas de riego eficiente</li>
<li>Rotación de cultivos y agricultura regenerativa</li>
<li>Control biológico de plagas</li>
<li>Comercialización directa y valor agregado</li>
</ul>

<h3>Impacto económico</h3>
<p>Las familias participantes han reportado un aumento promedio del 40% en sus ingresos, mientras reducen el uso de agroquímicos y mejoran la salud del suelo.</p>`,
      pais_slug: 'argentina',
      estado: 'publicado',
      destacado: false,
      autor_id: autorId
    },
    // Chile
    {
      titulo: 'Programa de inclusión digital capacita a adultos mayores en Chile',
      slug: 'inclusion-digital-adultos-mayores-chile',
      resumen: 'Más de 300 adultos mayores chilenos han aprendido a usar tecnología digital para conectarse con sus familias y acceder a servicios.',
      imagen: 'chile-digital.jpg',
      contenido: `<h2>Cerrando la brecha digital generacional</h2>
<p>Nuestro programa de inclusión digital en Chile ha capacitado a más de 300 adultos mayores en el uso de tecnologías digitales, permitiéndoles conectarse con sus seres queridos y acceder a servicios esenciales.</p>

<h3>Contenidos del programa</h3>
<ul>
<li>Uso básico de smartphones y tablets</li>
<li>Videollamadas y redes sociales</li>
<li>Banca en línea y trámites digitales</li>
<li>Seguridad y privacidad en internet</li>
</ul>

<h3>Testimonios emotivos</h3>
<p>"Ahora puedo ver a mis nietos que viven en el extranjero todos los días. La tecnología ya no me da miedo, me acerca a mi familia." - Rosa Martínez, 72 años</p>`,
      pais_slug: 'chile',
      estado: 'publicado',
      destacado: true,
      autor_id: autorId
    },
    {
      titulo: 'Iniciativa de reciclaje comunitario reduce residuos en barrios chilenos',
      slug: 'reciclaje-comunitario-chile',
      resumen: 'Programa de reciclaje ha logrado reducir en 60% los residuos en comunidades participantes.',
      imagen: 'chile-reciclaje.jpg',
      contenido: `<h2>Comunidades más limpias y sostenibles</h2>
<p>La iniciativa de reciclaje comunitario de Latinoamérica Comparte en Chile ha logrado resultados impresionantes, reduciendo en un 60% los residuos que llegan a vertederos en las comunidades participantes.</p>

<h3>Componentes del programa</h3>
<ul>
<li>Puntos de reciclaje en barrios</li>
<li>Educación ambiental para todas las edades</li>
<li>Compostaje comunitario</li>
<li>Economía circular y reutilización creativa</li>
</ul>

<h3>Impacto ambiental</h3>
<p>Se han reciclado más de 50 toneladas de materiales en el último año, generando además ingresos para las comunidades a través de la venta de materiales reciclables.</p>`,
      pais_slug: 'chile',
      estado: 'publicado',
      destacado: false,
      autor_id: autorId
    }
  ];

  console.log('🚀 Creando noticias de ejemplo...\n');

  for (const noticia of noticiasEjemplo) {
    // Buscar el país
    const pais = paises.find(p => p.slug === noticia.pais_slug);
    
    if (!pais) {
      console.log(`❌ País no encontrado: ${noticia.pais_slug}`);
      continue;
    }

    // Verificar si la noticia ya existe
    const { data: existing } = await supabaseAdmin
      .from('noticias')
      .select('id')
      .eq('slug', noticia.slug)
      .limit(1);

    if (existing && existing.length > 0) {
      console.log(`⏭️  Noticia ya existe: ${noticia.titulo}`);
      continue;
    }

    // Crear la noticia
    const { error } = await supabaseAdmin
      .from('noticias')
      .insert([{
        titulo: noticia.titulo,
        slug: noticia.slug,
        resumen: noticia.resumen,
        contenido: noticia.contenido,
        pais_id: pais.id,
        estado: noticia.estado,
        autor_id: noticia.autor_id,
        fecha_publicacion: new Date().toISOString()
      }]);

    if (error) {
      console.log(`❌ Error creando noticia "${noticia.titulo}":`, error.message);
    } else {
      console.log(`✅ Noticia creada: ${noticia.titulo} (${pais.nombre})`);
    }
  }

  console.log('\n🎉 Proceso completado!');
  console.log('📊 Total de noticias: 6 (2 por país)');
}

createSampleNews();
