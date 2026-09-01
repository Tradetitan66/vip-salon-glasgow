import { business } from "../data/locations";

export default function ContactSection() {
  return (
    <section className="contact section" aria-labelledby="contact-heading">
      <div className="container contact__inner">
        <h2 className="section__heading" id="contact-heading">
          Need help choosing?
        </h2>
        <p className="contact__copy">
          Call the VIP Salons team and we’ll help you find the right location.
        </p>
        <a
          className="btn btn--primary"
          href={business.phoneUri}
          data-event="telephone_clicked"
          data-context="contact"
        >
          Call {business.phone}
        </a>
      </div>
    </section>
  );
}
