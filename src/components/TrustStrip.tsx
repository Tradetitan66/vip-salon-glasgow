const points = ["Multi Award-Winning", "Six Locations", "Klarna Available"];

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Why choose VIP Salons">
      <div className="container trust__inner">
        {points.map((point) => (
          <p className="trust__item" key={point}>
            {point}
          </p>
        ))}
      </div>
    </section>
  );
}
