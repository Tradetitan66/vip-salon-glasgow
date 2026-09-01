import { business } from "../data/locations";

type HeaderProps = {
  onBookNow: () => void;
};

export default function Header({ onBookNow }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href="#top" aria-label="VIP Salons home">
          <img
            className="header__logo"
            src="/images/brand/logo-480.webp"
            alt="VIP Salons"
            width="108"
            height="50"
          />
        </a>

        <nav className="header__nav" aria-label="Primary">
          <a className="header__nav-link" href="#locations">
            Locations
          </a>
          <a className="header__nav-link" href="#gallery">
            Gallery
          </a>
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={business.phoneUri}>
            {business.phone}
          </a>
          <button
            className="btn btn--primary header__book"
            type="button"
            onClick={onBookNow}
          >
            Book now
          </button>
        </div>
      </div>
    </header>
  );
}
