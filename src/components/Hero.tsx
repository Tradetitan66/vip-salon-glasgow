import { business } from "../data/locations";

type HeroProps = {
  onChooseLocation: () => void;
};

export default function Hero({ onChooseLocation }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <picture>
        <source
          srcSet="/images/hair/hero-1536.avif 1536w, /images/hair/hero-800.avif 800w"
          type="image/avif"
          sizes="100vw"
        />
        <source
          srcSet="/images/hair/hero-1536.webp 1536w, /images/hair/hero-800.webp 800w"
          type="image/webp"
          sizes="100vw"
        />
        <img
          className="hero__image"
          src="/images/hair/hero-1536.jpg"
          srcSet="/images/hair/hero-1536.jpg 1536w, /images/hair/hero-800.jpg 800w"
          sizes="100vw"
          alt="Long glossy brunette hairstyle created at VIP Salons"
          width="1536"
          height="2048"
          fetchPriority="high"
        />
      </picture>

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">Multi Award-Winning Salons</p>
        <h1 className="hero__title" id="hero-title">
          Your hair. Your moment. Your VIP experience.
        </h1>
        <p className="hero__lede">
          Discover expert hair, beauty and Head SPA experiences across our VIP Salon
          locations in Scotland and Marbella.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" type="button" onClick={onChooseLocation}>
            Choose your location
          </button>
          <a className="btn btn--outline" href={business.phoneUri}>
            Call {business.phone}
          </a>
        </div>
        <p className="hero__meta">{business.payment}</p>
      </div>
    </section>
  );
}
