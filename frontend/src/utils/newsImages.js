// Importar imágenes de noticias
import ecuadorEducacion from '../assets/news/ecuador-educacion.jpg';
import ecuadorBecas from '../assets/news/ecuador-becas.jpg';
import argentinaEmprendedores from '../assets/news/argentina-emprendedores.jpg';
import argentinaAgricultura from '../assets/news/argentina-agricultura.jpg';
import chileDigital from '../assets/news/chile-digital.jpg';
import chileReciclaje from '../assets/news/chile-reciclaje.jpg';

// Mapeo de slugs a imágenes
export const newsImages = {
  'latinoamerica-comparte-llega-ecuador': ecuadorEducacion,
  'programa-becas-educativas-ecuador': ecuadorBecas,
  'red-emprendedores-argentina': argentinaEmprendedores,
  'agricultura-sostenible-argentina': argentinaAgricultura,
  'inclusion-digital-adultos-mayores-chile': chileDigital,
  'reciclaje-comunitario-chile': chileReciclaje,
};

// Función para obtener imagen por slug
export function getNewsImage(slug) {
  return newsImages[slug] || null;
}
