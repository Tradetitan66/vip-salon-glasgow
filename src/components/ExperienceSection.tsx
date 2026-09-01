export default function ExperienceSection() {
  return (
    <section className="experience section" aria-labelledby="experience-heading">
      <div className="container">
        <p className="section__eyebrow">The salon experience</p>
        <h2 className="section__heading" id="experience-heading">
          The VIP experience
        </h2>
        <p className="section__lede">
          Contemporary salons, expert teams and personalised service — created to make
          every appointment feel special.
        </p>

        <div className="experience__grid">
          <figure className="experience__figure">
            <img
              src="/images/salons/styling-station-800.webp"
              alt="Inside VIP Salons"
              loading="lazy"
              width="1536"
              height="2048"
            />
          </figure>
          <figure className="experience__figure">
            <img
              src="/images/salons/reception-800.webp"
              alt="Inside VIP Salons"
              loading="lazy"
              width="1536"
              height="2048"
            />
          </figure>
          <figure className="experience__figure">
            <img
              src="/images/salons/interior-1-800.webp"
              alt="Inside VIP Salons"
              loading="lazy"
              width="1500"
              height="2000"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
