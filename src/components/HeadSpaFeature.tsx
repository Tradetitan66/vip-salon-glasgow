import { business } from "../data/locations";

export default function HeadSpaFeature() {
  return (
    <section className="spa section" aria-labelledby="spa-heading">
      <div className="container spa__inner">
        <figure className="spa__media">
          <img
            src="/images/spa/head-spa-room-800.webp"
            alt="Private Head SPA treatment room"
            loading="lazy"
            width="1600"
            height="1200"
          />
        </figure>

        <div className="spa__content">
          <p className="section__eyebrow">Sword Street Head SPA</p>
          <h2 className="section__heading" id="spa-heading">
            Discover Sword Street Head SPA
          </h2>
          <p className="spa__copy">
            A dedicated space designed for a relaxing, elevated salon experience.
          </p>
          <a
            className="btn btn--dark"
            href={business.phoneUri}
            data-event="telephone_clicked"
            data-location="sword-street-head-spa"
            data-context="head_spa_enquiry"
          >
            Enquire about Head SPA
          </a>
        </div>
      </div>
    </section>
  );
}
