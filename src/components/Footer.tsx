import { business, locations } from "../data/locations";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/images/brand/logo-480.webp"
            alt="VIP Salons"
            width="120"
            height="56"
            loading="lazy"
          />
          <p className="footer__tagline">{business.tagline}</p>
          <p className="footer__payment">{business.payment}</p>
        </div>

        <nav className="footer__nav" aria-label="Salon locations">
          <h3 className="footer__heading">Locations</h3>
          <ul className="footer__list">
            {locations.map((location) => (
              <li key={location.id}>
                <a className="footer__link" href="#locations">
                  {location.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contact">
          <h3 className="footer__heading">Contact</h3>
          <a
            className="footer__link footer__phone"
            href={business.phoneUri}
            data-event="telephone_clicked"
            data-context="footer"
          >
            {business.phone}
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p className="footer__copyright">
            © {year} {business.name}. {business.tagline}.
          </p>
        </div>
      </div>
    </footer>
  );
}
