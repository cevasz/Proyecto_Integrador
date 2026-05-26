import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getPublicNoticiaBySlug } from '../../services/publicService';

export default function PublicNoticiaDetailPage() {
  const { paisSlug, noticiaSlug } = useParams();

  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadNoticia() {
      try {
        setLoading(true);
        setError('');

        const data = await getPublicNoticiaBySlug(paisSlug, noticiaSlug);
        setNoticia(data);
      } catch (err) {
        setError(
          err.response?.data?.error || 'Error al cargar la noticia'
        );
      } finally {
        setLoading(false);
      }
    }

    if (paisSlug && noticiaSlug) {
      localStorage.setItem('publicCountry', paisSlug);
      loadNoticia();
    }
  }, [paisSlug, noticiaSlug]);

  function formatCountryName(slug) {
    if (!slug) return '';
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  }

  if (loading) {
    return (
      <main className="public-page">
        <div className="container py-5">
          <div className="alert alert-info">Cargando noticia...</div>
        </div>
      </main>
    );
  }

  if (error || !noticia) {
    return (
      <main className="public-page">
        <div className="container py-5">
          <div className="alert alert-danger">
            {error || 'Noticia no encontrada'}
          </div>
          <Link
            to={`/paises/${paisSlug}/noticias`}
            className="btn btn-primary"
          >
            <i className="bi bi-arrow-left me-2" />
            Volver a noticias
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
            to={`/paises/${paisSlug}/noticias`}
            className="public-back-link"
          >
            <i className="bi bi-arrow-left me-2" />
            Volver a noticias
          </Link>

          <span className="public-detail-badge">
            {noticia.pais?.nombre || formatCountryName(paisSlug)}
          </span>

          <h1>{noticia.titulo}</h1>

          <div className="public-detail-meta">
            <span>
              <i className="bi bi-calendar3 me-2" />
              {noticia.fecha_publicacion
                ? new Date(noticia.fecha_publicacion).toLocaleDateString(
                    'es-ES',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }
                  )
                : 'Publicado'}
            </span>

            {noticia.autor && (
              <span>
                <i className="bi bi-person me-2" />
                {noticia.autor.nombre} {noticia.autor.apellido}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="container public-detail-content">
        {noticia.imagen_principal_url && (
          <div className="public-detail-image">
            <img src={noticia.imagen_principal_url} alt={noticia.titulo} />
          </div>
        )}

        <div className="public-detail-body">
          <div className="public-detail-summary">
            <h2>Resumen</h2>
            <p>{noticia.resumen}</p>
          </div>

          <div className="public-detail-text">
            <h2>Contenido</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: noticia.contenido.replace(/\n/g, '<br />')
              }}
            />
          </div>
        </div>

        <div className="public-detail-footer">
          <Link
            to={`/paises/${paisSlug}/noticias`}
            className="btn btn-outline-primary"
          >
            <i className="bi bi-arrow-left me-2" />
            Ver más noticias
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
