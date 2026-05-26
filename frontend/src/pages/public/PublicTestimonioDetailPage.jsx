import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getPublicTestimonioById } from '../../services/publicService';

export default function PublicTestimonioDetailPage() {
  const { paisSlug, id } = useParams();

  const [testimonio, setTestimonio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTestimonio() {
      try {
        setLoading(true);
        setError('');

        const data = await getPublicTestimonioById(paisSlug, id);
        setTestimonio(data);
      } catch (err) {
        setError(
          err.response?.data?.error || 'Error al cargar el testimonio'
        );
      } finally {
        setLoading(false);
      }
    }

    if (paisSlug && id) {
      localStorage.setItem('publicCountry', paisSlug);
      loadTestimonio();
    }
  }, [paisSlug, id]);

  function formatCountryName(slug) {
    if (!slug) return '';
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  }

  if (loading) {
    return (
      <main className="public-page">
        <div className="container py-5">
          <div className="alert alert-info">Cargando testimonio...</div>
        </div>
      </main>
    );
  }

  if (error || !testimonio) {
    return (
      <main className="public-page">
        <div className="container py-5">
          <div className="alert alert-danger">
            {error || 'Testimonio no encontrado'}
          </div>
          <Link
            to={`/paises/${paisSlug}/testimonios`}
            className="btn btn-primary"
          >
            <i className="bi bi-arrow-left me-2" />
            Volver a testimonios
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="public-detail-page">
      <section className="public-detail-hero">
        <div className="container">
          <Link
            to={`/paises/${paisSlug}/testimonios`}
            className="public-back-link"
          >
            <i className="bi bi-arrow-left me-2" />
            Volver a testimonios
          </Link>

          <span className="public-detail-badge">
            {testimonio.pais?.nombre || formatCountryName(paisSlug)}
          </span>

          {testimonio.destacado && (
            <span className="public-detail-badge featured">
              <i className="bi bi-star-fill me-1" />
              Destacado
            </span>
          )}

          <h1>Testimonio de {testimonio.nombre}</h1>

          <div className="public-detail-meta">
            {testimonio.cargo && (
              <span>
                <i className="bi bi-briefcase me-2" />
                {testimonio.cargo}
              </span>
            )}

            {testimonio.empresa && (
              <span>
                <i className="bi bi-building me-2" />
                {testimonio.empresa}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="container public-detail-content">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="public-testimonial-detail-card">
              {testimonio.foto_url ? (
                <img
                  src={testimonio.foto_url}
                  alt={testimonio.nombre}
                  className="testimonial-detail-photo"
                />
              ) : (
                <div className="testimonial-detail-photo placeholder">
                  <i className="bi bi-person" />
                </div>
              )}

              <h3>{testimonio.nombre}</h3>

              {testimonio.cargo && <p className="text-muted">{testimonio.cargo}</p>}

              {testimonio.empresa && (
                <p className="fw-bold">{testimonio.empresa}</p>
              )}

              {(testimonio.instagram_url || testimonio.facebook_url) && (
                <div className="testimonial-detail-socials">
                  {testimonio.instagram_url && (
                    <a
                      href={testimonio.instagram_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-instagram" />
                      Instagram
                    </a>
                  )}

                  {testimonio.facebook_url && (
                    <a
                      href={testimonio.facebook_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-facebook" />
                      Facebook
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-8">
            <div className="public-testimonial-detail-content">
              <div className="testimonial-quote-icon-large">
                <i className="bi bi-quote" />
              </div>

              <h2>Su experiencia</h2>

              <div className="testimonial-detail-text">
                {testimonio.contenido}
              </div>

              {testimonio.fecha_publicacion && (
                <div className="testimonial-detail-date">
                  <i className="bi bi-calendar3 me-2" />
                  Publicado el{' '}
                  {new Date(testimonio.fecha_publicacion).toLocaleDateString(
                    'es-ES',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="public-detail-footer">
          <Link
            to={`/paises/${paisSlug}/testimonios`}
            className="btn btn-outline-primary"
          >
            <i className="bi bi-arrow-left me-2" />
            Ver más testimonios
          </Link>

          <Link
            to={`/paises/${paisSlug}/solicitudes`}
            className="btn btn-primary"
          >
            Enviar solicitud
            <i className="bi bi-send ms-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}
