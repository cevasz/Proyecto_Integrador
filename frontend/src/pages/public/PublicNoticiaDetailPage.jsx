import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getPublicNoticiaBySlug } from '../../services/publicService';
import { getNewsImage } from '../../utils/newsImages';

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

  const localImage = noticia ? getNewsImage(noticia.slug) : '';
  const displayImage = localImage || noticia?.imagen_principal_url;

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

          {noticia.resumen && (
            <p className="public-detail-lead">
              {noticia.resumen}
            </p>
          )}

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

            <span>
              <i className="bi bi-clock me-2" />
              {Math.max(1, Math.ceil((noticia.contenido?.length || 0) / 900))}{' '}
              min de lectura
            </span>
          </div>
        </div>
      </section>

      <section className="container public-detail-content">
        {displayImage && (
          <div className="public-detail-image">
            <img src={displayImage} alt={noticia.titulo} />
          </div>
        )}

        <div className="public-detail-body">
          <div className="public-detail-text">
            <h2>Informe</h2>
            <div
              className="public-detail-richtext"
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
