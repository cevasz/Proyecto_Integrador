import dotenv from 'dotenv';
import { supabaseAdmin } from '../config/supabase.js';

dotenv.config();

async function testConnection() {
  console.log('🔍 Verificando conexión a Supabase...\n');

  // Verificar URL
  console.log('📍 URL:', process.env.SUPABASE_URL);
  
  // Verificar Anon Key (primeros y últimos caracteres)
  const anonKey = process.env.SUPABASE_ANON_KEY;
  console.log('🔑 Anon Key:', anonKey.substring(0, 20) + '...' + anonKey.substring(anonKey.length - 20));
  
  // Verificar Service Role Key
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  console.log('🔐 Service Role Key:', serviceKey.substring(0, 20) + '...' + serviceKey.substring(serviceKey.length - 20));
  
  console.log('\n🧪 Probando conexión...\n');

  try {
    // Test 1: Verificar roles
    const { data: roles, error: roleError } = await supabaseAdmin
      .from('roles')
      .select('id, nombre')
      .limit(5);

    if (roleError) {
      console.error('❌ Error al consultar roles:', roleError.message);
      return;
    }

    console.log('✅ Roles encontrados:', roles.length);
    roles.forEach(role => {
      console.log(`   - ${role.nombre} (ID: ${role.id})`);
    });

    // Test 2: Verificar países
    const { data: paises, error: paisError } = await supabaseAdmin
      .from('paises')
      .select('id, nombre, slug')
      .limit(5);

    if (paisError) {
      console.error('❌ Error al consultar países:', paisError.message);
      return;
    }

    console.log('\n✅ Países encontrados:', paises.length);
    paises.forEach(pais => {
      console.log(`   - ${pais.nombre} (${pais.slug})`);
    });

    // Test 3: Verificar usuarios
    const { data: usuarios, error: userError } = await supabaseAdmin
      .from('usuarios')
      .select('id, username, nombre, apellido, rol:roles(nombre)')
      .limit(5);

    if (userError) {
      console.error('❌ Error al consultar usuarios:', userError.message);
      return;
    }

    console.log('\n✅ Usuarios encontrados:', usuarios.length);
    usuarios.forEach(user => {
      console.log(`   - ${user.username} (${user.nombre} ${user.apellido}) - Rol: ${user.rol?.nombre || 'N/A'}`);
    });

    // Test 4: Verificar noticias
    const { data: noticias, error: newsError } = await supabaseAdmin
      .from('noticias')
      .select('id, titulo, estado')
      .limit(5);

    if (newsError) {
      console.error('❌ Error al consultar noticias:', newsError.message);
      return;
    }

    console.log('\n✅ Noticias encontradas:', noticias.length);
    noticias.forEach(noticia => {
      console.log(`   - ${noticia.titulo.substring(0, 50)}... (${noticia.estado})`);
    });

    console.log('\n🎉 ¡Conexión exitosa! Todas las tablas son accesibles.');
    console.log('✅ Las API keys están funcionando correctamente.');

  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

testConnection();
