import latinoamericaLogo from '../assets/cms/logo-latinoamerica-icon.png';

export default function BrandLogo({
  className = '',
  showText = true,
  text = 'Latinoamérica Comparte'
}) {
  const classNames = ['brand-logo', className].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      <span className="brand-logo-mark" aria-hidden="true">
        <img src={latinoamericaLogo} alt="" />
      </span>

      {showText && <span className="brand-logo-text">{text}</span>}
    </span>
  );
}
