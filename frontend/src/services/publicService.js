import axiosClient from '../api/axiosClient';

export async function getPublicNoticias(paisSlug) {
  const response = await axiosClient.get(
    `/public/paises/${paisSlug}/noticias`
  );

  return response.data;
}

export async function getPublicNoticiaBySlug(paisSlug, noticiaSlug) {
  const response = await axiosClient.get(
    `/public/paises/${paisSlug}/noticias/${noticiaSlug}`
  );

  return response.data;
}

export async function getPublicTestimonios(paisSlug) {
  const response = await axiosClient.get(
    `/public/paises/${paisSlug}/testimonios`
  );

  return response.data;
}

export async function getPublicTestimonioById(paisSlug, id) {
  const response = await axiosClient.get(
    `/public/paises/${paisSlug}/testimonios/${id}`
  );

  return response.data;
}