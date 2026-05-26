import dotenv from 'dotenv';
import { supabaseAdmin } from '../config/supabase.js';

dotenv.config();

async function createSampleNews() {
  const { data: paises, error: paisError } = await supabaseAdmin
    .from('paises')
    .select('id, nombre, slug');

  if (paisError) {
    console.error('Error obteniendo países:', paisError.message);
    return;
  }

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

  const noticiasEjemplo = [
    {
      titulo: 'Latinoamérica Comparte consolida su llegada a Ecuador con agenda de impacto social',
      slug: 'latinoamerica-comparte-llega-ecuador',
      resumen: 'La organización inició operaciones en Ecuador con una hoja de ruta centrada en educación, fortalecimiento productivo y desarrollo territorial sostenible.',
      contenido: `<h2>Inicio de operaciones con enfoque territorial</h2>
<p>Latinoamérica Comparte inició su operación en Ecuador con un plan de trabajo orientado a generar impacto medible en comunidades urbanas y rurales. La estrategia integra actores públicos, sector privado y organizaciones locales para acelerar resultados en inclusión y productividad.</p>

<h3>Ejes de trabajo priorizados</h3>
<ul>
<li><strong>Educación y empleabilidad:</strong> formación técnica para jóvenes y vinculación con oportunidades de inserción laboral.</li>
<li><strong>Emprendimiento:</strong> acompañamiento a micro y pequeñas empresas con asistencia técnica y herramientas de gestión.</li>
<li><strong>Desarrollo comunitario:</strong> proyectos para mejorar capacidades locales, articulación institucional y bienestar social.</li>
</ul>

<h3>Modelo de implementación</h3>
<p>El despliegue se ejecutará por fases, con indicadores de resultado y seguimiento trimestral. Las alianzas con universidades y organizaciones de base permitirán escalar las intervenciones en los próximos meses.</p>

<p>Con esta expansión, la organización fortalece su presencia regional y reafirma su compromiso con un desarrollo más inclusivo, sostenible y colaborativo.</p>`,
      pais_slug: 'ecuador',
      estado: 'publicado',
      autor_id: autorId
    },
    {
      titulo: 'Programa de becas en Ecuador impulsa continuidad académica de 200 jóvenes',
      slug: 'programa-becas-educativas-ecuador',
      resumen: 'La iniciativa de becas reporta mejoras en permanencia estudiantil y desempeño académico, ampliando el acceso a trayectorias educativas de calidad.',
      contenido: `<h2>Resultados del programa durante el último ciclo</h2>
<p>El programa de becas educativas en Ecuador benefició a 200 estudiantes en niveles técnico y universitario. El esquema de apoyo combina financiamiento parcial, acompañamiento académico y seguimiento psicosocial para reducir la deserción.</p>

<h3>Indicadores clave</h3>
<ul>
<li>200 becas activas en distintas provincias del país.</li>
<li>85% de permanencia estudiantil durante el periodo evaluado.</li>
<li>Mejora promedio del 30% en indicadores de rendimiento.</li>
</ul>

<h3>Valor agregado del modelo</h3>
<p>Además del soporte económico, el programa incorpora mentorías y orientación vocacional para fortalecer la toma de decisiones académicas y profesionales. Este enfoque integral mejora la transición al empleo formal y la continuidad en estudios superiores.</p>

<p>La organización proyecta ampliar cupos y cobertura territorial para el próximo año, priorizando poblaciones con mayor vulnerabilidad socioeconómica.</p>`,
      pais_slug: 'ecuador',
      estado: 'publicado',
      autor_id: autorId
    },
    {
      titulo: 'Red de emprendedores en Argentina supera los 150 miembros activos',
      slug: 'red-emprendedores-argentina',
      resumen: 'La red colaborativa consolida servicios de mentoría, formación y conexión comercial para fortalecer el crecimiento de emprendimientos locales.',
      contenido: `<h2>Expansión del ecosistema emprendedor</h2>
<p>La red de emprendedores impulsada por Latinoamérica Comparte en Argentina alcanzó más de 150 miembros activos. El crecimiento refleja una mayor demanda por espacios de formación aplicada, cooperación empresarial y acceso a mercados.</p>

<h3>Servicios implementados</h3>
<ul>
<li>Mentorías especializadas en estrategia, finanzas y comercialización.</li>
<li>Capacitaciones en gestión operativa y escalamiento de negocios.</li>
<li>Conexión con oportunidades de financiamiento y capital semilla.</li>
<li>Rondas de networking para alianzas entre emprendimientos.</li>
</ul>

<h3>Impacto observado</h3>
<p>Los emprendimientos vinculados a la red reportan avances en formalización, aumento de ventas y generación de empleo local. La metodología colaborativa permite compartir conocimiento práctico y reducir brechas de gestión.</p>

<p>Para el siguiente semestre se prevé ampliar la red a nuevas ciudades y robustecer la oferta de servicios para industrias creativas y economía verde.</p>`,
      pais_slug: 'argentina',
      estado: 'publicado',
      autor_id: autorId
    },
    {
      titulo: 'Agricultura sostenible en Argentina mejora productividad de familias rurales',
      slug: 'agricultura-sostenible-argentina',
      resumen: 'El proyecto integra prácticas regenerativas, eficiencia hídrica y comercialización directa, con mejoras sostenidas en ingresos y resiliencia productiva.',
      contenido: `<h2>Transformación productiva con enfoque sostenible</h2>
<p>El programa de agricultura sostenible en Argentina acompañó a más de 80 familias rurales en la adopción de prácticas que mejoran la productividad y reducen el impacto ambiental. El trabajo combina asistencia técnica, transferencia de tecnología y articulación comercial.</p>

<h3>Prácticas implementadas</h3>
<ul>
<li>Sistemas de riego eficiente para optimizar uso de agua.</li>
<li>Rotación de cultivos y manejo regenerativo del suelo.</li>
<li>Control biológico para disminuir dependencia de agroquímicos.</li>
<li>Canales de venta directa con mayor valor para productores.</li>
</ul>

<h3>Resultados económicos y ambientales</h3>
<p>Las unidades productivas participantes reportaron incrementos promedio del 40% en ingresos, junto con mejoras en salud del suelo y reducción de costos operativos. El modelo fortalece la sostenibilidad financiera de las familias y la resiliencia frente a variaciones climáticas.</p>

<p>La siguiente fase contemplará ampliación de cobertura y fortalecimiento de cadenas de valor territoriales.</p>`,
      pais_slug: 'argentina',
      estado: 'publicado',
      autor_id: autorId
    },
    {
      titulo: 'Inclusión digital en Chile fortalece autonomía de personas mayores',
      slug: 'inclusion-digital-adultos-mayores-chile',
      resumen: 'Más de 300 participantes completaron formación en herramientas digitales, facilitando acceso a servicios, comunicación y trámites en línea.',
      contenido: `<h2>Reducción de brechas digitales intergeneracionales</h2>
<p>El programa de inclusión digital en Chile capacitó a más de 300 personas mayores en el uso práctico de tecnologías para la vida cotidiana. La iniciativa prioriza competencias digitales básicas con un enfoque pedagógico adaptado.</p>

<h3>Contenidos formativos</h3>
<ul>
<li>Manejo de teléfonos inteligentes y aplicaciones esenciales.</li>
<li>Comunicación digital segura mediante videollamadas y mensajería.</li>
<li>Uso de servicios bancarios y trámites públicos en línea.</li>
<li>Buenas prácticas de ciberseguridad y protección de datos.</li>
</ul>

<h3>Beneficios observados</h3>
<p>La formación incrementó la autonomía de los participantes para resolver gestiones diarias y mejorar su integración social. También se registró mayor confianza en el uso de canales digitales para atención en salud y servicios financieros.</p>

<p>La organización proyecta replicar el modelo en nuevas comunas, incorporando módulos de alfabetización digital avanzada.</p>`,
      pais_slug: 'chile',
      estado: 'publicado',
      autor_id: autorId
    },
    {
      titulo: 'Reciclaje comunitario en Chile reduce residuos y activa economía circular local',
      slug: 'reciclaje-comunitario-chile',
      resumen: 'El programa alcanzó una reducción de residuos del 60% en barrios participantes y consolidó prácticas de separación, compostaje y reutilización.',
      contenido: `<h2>Gestión ambiental con participación ciudadana</h2>
<p>La iniciativa de reciclaje comunitario en Chile reportó una reducción del 60% en residuos enviados a disposición final en los territorios intervenidos. El modelo combina infraestructura de reciclaje, educación ambiental y mecanismos de valorización de materiales.</p>

<h3>Componentes operativos</h3>
<ul>
<li>Instalación de puntos limpios y rutas de recolección diferenciada.</li>
<li>Talleres de educación ambiental para hogares y organizaciones.</li>
<li>Compostaje comunitario para residuos orgánicos.</li>
<li>Acciones de reutilización y economía circular barrial.</li>
</ul>

<h3>Impacto del programa</h3>
<p>Durante el último año se recuperaron más de 50 toneladas de materiales reciclables, con beneficios ambientales y sociales para las comunidades. La experiencia demuestra que la articulación local puede escalar soluciones sostenibles de forma eficiente.</p>

<p>La siguiente etapa priorizará trazabilidad de residuos y fortalecimiento de capacidades de gestión comunitaria.</p>`,
      pais_slug: 'chile',
      estado: 'publicado',
      autor_id: autorId
    }
  ];

  console.log('Iniciando sincronización de noticias...\n');

  for (const noticia of noticiasEjemplo) {
    const pais = paises.find((p) => p.slug === noticia.pais_slug);

    if (!pais) {
      console.log(`Pais no encontrado: ${noticia.pais_slug}`);
      continue;
    }

    const payload = {
      titulo: noticia.titulo,
      slug: noticia.slug,
      resumen: noticia.resumen,
      contenido: noticia.contenido,
      pais_id: pais.id,
      estado: noticia.estado,
      autor_id: noticia.autor_id,
      fecha_publicacion: new Date().toISOString()
    };

    const { data: existing, error: existingError } = await supabaseAdmin
      .from('noticias')
      .select('id')
      .eq('slug', noticia.slug)
      .limit(1);

    if (existingError) {
      console.log(`Error verificando "${noticia.titulo}":`, existingError.message);
      continue;
    }

    let error;
    if (existing && existing.length > 0) {
      ({ error } = await supabaseAdmin
        .from('noticias')
        .update(payload)
        .eq('id', existing[0].id));
    } else {
      ({ error } = await supabaseAdmin
        .from('noticias')
        .insert(payload));
    }

    if (error) {
      console.log(`Error sincronizando "${noticia.titulo}":`, error.message);
    } else {
      console.log(`OK: ${noticia.titulo} (${pais.nombre})`);
    }
  }

  console.log('\nSincronizacion finalizada.');
}

createSampleNews();
