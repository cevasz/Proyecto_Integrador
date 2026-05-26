import { Link } from 'react-router-dom';

import argentinaLogo from '../../assets/cms/argentina-comparte.jpeg';
import chileLogo from '../../assets/cms/chile-comparte.jpeg';
import ecuadorLogo from '../../assets/cms/ecuador-comparte.jpeg';
import portalReference from '../../assets/cms/portal-referencia.jpeg';
import BrandLogo from '../../components/BrandLogo';

const countries = [
  {
    slug: 'ecuador',
    code: 'EC',
    name: 'Ecuador',
    image: ecuadorLogo
  },
  {
    slug: 'argentina',
    code: 'AR',
    name: 'Argentina',
    image: argentinaLogo
  },
  {
    slug: 'chile',
    code: 'CL',
    name: 'Chile',
    image: chileLogo
  }
];

export default function HomePage() {
  function saveCountry(slug) {
    localStorage.setItem('publicCountry', slug);
  }

  return (
    <section
      className="public-hero"
      style={{
        '--hero-image': `url(${portalReference})`
      }}
    >
      <div className="public-hero-overlay">
        <div className="public-hero-content">
          <span className="public-badge">
            CMS público multipaís
          </span>

          <h1>
            Un propósito que nació de Colombia
          </h1>

          <p className="public-subtitle">
            Hoy inspira a toda Latinoamérica
          </p>

          <div className="country-selector">
            {countries.map((country) => (
              <Link
                key={country.slug}
                to={`/paises/${country.slug}/noticias`}
                className="country-card"
                onClick={() => saveCountry(country.slug)}
              >
                <span className="country-logo-crop" aria-hidden="true">
                  <img src={country.image} alt="" />
                </span>
                <strong>{country.code}</strong>
                <span>{country.name}</span>
              </Link>
            ))}

            <Link
              to={`/paises/${localStorage.getItem('publicCountry') || 'argentina'}/noticias`}
              className="country-card country-main"
              onClick={() => saveCountry(localStorage.getItem('publicCountry') || 'argentina')}
              aria-label="Ver noticias de Latinoamérica Comparte"
            >
              <BrandLogo showText={false} className="country-brand-logo" />
              <strong>LC</strong>
              <span>Portal regional</span>
            </Link>
          </div>

          <p className="public-description">
            Una red que une personas, empresas y comunidades para construir una
            región más humana, productiva y consciente.
          </p>

          <div className="public-actions">
            <Link
              to="/paises/argentina/noticias"
              className="btn btn-light fw-bold"
              onClick={() => saveCountry('argentina')}
            >
              Ver noticias
            </Link>

            <Link
              to="/paises/argentina/solicitudes"
              className="btn btn-outline-light fw-bold"
              onClick={() => saveCountry('argentina')}
            >
              Enviar solicitud
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
