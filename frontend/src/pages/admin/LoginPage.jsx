import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import BrandLogo from '../../components/BrandLogo';
import InteractiveBackground from '../../components/InteractiveBackground';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [blockedSeconds, setBlockedSeconds] = useState(0);

  const [toast, setToast] = useState({
    show: false,
    type: 'danger',
    message: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!toast.show) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        show: false
      }));
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.show, toast.message]);

  useEffect(() => {
  if (blockedSeconds <= 0) return;

  const timer = setInterval(() => {
    setBlockedSeconds((prev) => {
      if (prev <= 1) {
        clearInterval(timer);

        setFailedAttempts(0);

        setForm({
          username: '',
          password: ''
        });

        closeToast();

        window.location.reload();

        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [blockedSeconds]);

  function showToast(message, type = 'danger') {
    setToast({
      show: true,
      type,
      message
    });
  }

  function closeToast() {
    setToast((prev) => ({
      ...prev,
      show: false
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'username') {
      setFailedAttempts(0);
      setBlockedSeconds(0);
      closeToast();
    }
  }

  function getBlockedSecondsFromMessage(message) {
    const match = message.match(/(\d+)\s*segundos/i);
    return match ? Number(match[1]) : 10;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (blockedSeconds > 0) {
      showToast(
        `Cuenta bloqueada temporalmente. Intenta en ${blockedSeconds} segundo(s).`,
        'warning'
      );
      return;
    }

    setLoading(true);

    try {
      await login(form.username, form.password);

      setFailedAttempts(0);
      setBlockedSeconds(0);

      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      const backendMessage =
        err.response?.data?.error || 'Error al iniciar sesión';

      if (backendMessage.includes('bloqueada temporalmente')) {
        const seconds = getBlockedSecondsFromMessage(backendMessage);

        setBlockedSeconds(seconds);
        setFailedAttempts(3);

        showToast(
          `Cuenta bloqueada temporalmente. Intenta nuevamente en ${seconds} segundo(s).`,
          'warning'
        );

        return;
      }

      if (backendMessage.includes('Usuario o contraseña incorrectos')) {
        setFailedAttempts((prev) => {
          const next = Math.min(prev + 1, 3);
          const remaining = Math.max(3 - next, 0);

          if (next >= 3) {
            setBlockedSeconds(10);

            showToast(
              'Has alcanzado el máximo de 3 intentos. Intenta nuevamente en 10 segundos.',
              'warning'
            );
          } else {
            showToast(
              `Usuario o contraseña incorrectos. Te quedan ${remaining} intento(s).`,
              'danger'
            );
          }

          return next;
        });

        return;
      }

      showToast(backendMessage, 'danger');
    } finally {
      setLoading(false);
    }
  }

  const isBlocked = blockedSeconds > 0;

  return (
    <main className="login-page-modern">
      <InteractiveBackground />
      
      {toast.show && (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{
            zIndex: 10000,
            minWidth: '360px'
          }}
        >
          <div
            className={`alert alert-${toast.type} alert-dismissible shadow-lg`}
            role="alert"
          >
            <strong>
              {toast.type === 'warning' ? '⚠️ Atención' : '❌ Error'}
            </strong>

            <div>{toast.message}</div>

            <button
              type="button"
              className="btn-close"
              onClick={closeToast}
              aria-label="Cerrar"
            />
          </div>
        </div>
      )}

      <div className="login-container-modern">
        <div className="login-card-modern">
          <Link to="/" className="back-link-modern">
            <i className="bi bi-arrow-left me-2" />
            Volver al portal
          </Link>

          <div className="login-header-modern">
            <div className="login-brand-modern">
              <BrandLogo />
            </div>

            <div className="login-title-section">
              <div className="d-flex align-items-center gap-3 mb-2">
                <span className="badge-modern">
                  <i className="bi bi-shield-check-fill me-1" />
                  Panel Seguro
                </span>
                <span className="badge-modern badge-success">
                  <i className="bi bi-lock-fill me-1" />
                  RBAC Activo
                </span>
              </div>
              <h1 className="login-title-modern">Ingreso CMS</h1>
              <p className="login-subtitle-modern">
                Accede con tu usuario asignado al sistema
              </p>
            </div>
          </div>

          {failedAttempts > 0 && !isBlocked && (
            <div className="alert alert-info d-flex align-items-center gap-2">
              <i className="bi bi-info-circle-fill" />
              <span>
                <strong>Intentos fallidos:</strong> {failedAttempts} de 3
              </span>
            </div>
          )}

          {isBlocked && (
            <div className="alert alert-warning d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill" />
              <span>
                Cuenta bloqueada temporalmente. Intenta en{' '}
                <strong className="text-danger">{blockedSeconds}s</strong>
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form-modern">
            <div className="form-group-modern">
              <label className="form-label-modern">
                <i className="bi bi-person-fill me-2" />
                Usuario
              </label>
              <input
                type="text"
                name="username"
                className="form-input-modern"
                value={form.username}
                onChange={handleChange}
                placeholder="Ingresa tu usuario"
                disabled={isBlocked}
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">
                <i className="bi bi-key-fill me-2" />
                Contraseña
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-input-modern"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  disabled={isBlocked}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isBlocked}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-submit-modern"
              disabled={loading || isBlocked}
            >
              {isBlocked ? (
                <>
                  <i className="bi bi-hourglass-split me-2" />
                  Bloqueado {blockedSeconds}s
                </>
              ) : loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Ingresando...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2" />
                  Ingresar al Sistema
                </>
              )}
            </button>

            <div className="login-footer-modern">
              <Link to="/admin/forgot-password" className="forgot-link-modern">
                <i className="bi bi-question-circle me-1" />
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>

          <div className="login-info-modern">
            <div className="info-item">
              <i className="bi bi-shield-lock-fill text-success" />
              <span>Conexión segura SSL</span>
            </div>
            <div className="info-item">
              <i className="bi bi-clock-history text-primary" />
              <span>Sesión de 60 minutos</span>
            </div>
            <div className="info-item">
              <i className="bi bi-shield-check text-info" />
              <span>Protección anti fuerza bruta</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
