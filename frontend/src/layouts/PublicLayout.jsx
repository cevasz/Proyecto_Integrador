import { Link, NavLink, Outlet, useParams } from 'react-router-dom';

import BrandLogo from '../components/BrandLogo';

const defaultCountry = 'argentina';

export default function PublicLayout() {
  const { paisSlug } = useParams();

  const selectedCountry =
    paisSlug || localStorage.getItem('publicCountry') || defaultCountry;

  return (
    <div className="public-site">
      <header className="public-navbar">
        <Link to="/" className="public-logo">
          <BrandLogo />
        </Link>

        <nav className="public-menu">
          <NavLink to={`/paises/${selectedCountry}/noticias`}>
            Noticias
          </NavLink>

          <NavLink to={`/paises/${selectedCountry}/testimonios`}>
            Testimonios
          </NavLink>

          <NavLink to={`/paises/${selectedCountry}/solicitudes`}>
            Solicitudes
          </NavLink>

          <Link to="/admin/login" className="public-login-btn">
            CMS Login
          </Link>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
