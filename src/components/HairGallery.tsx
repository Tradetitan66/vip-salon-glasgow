const galleryItems = [
  {
    src: "/images/hair/gallery-blonde-800.webp",
    alt: "Long blonde waves styled at VIP Salons",
    width: 1536,
    height: 2048,
  },
  {
    src: "/images/hair/gallery-brunette-800.webp",
    alt: "Long glossy brunette hairstyle created at VIP Salons",
    width: 1152,
    height: 2048,
  },
  {
    src: "/images/hair/gallery-waves-800.webp",
    alt: "Hair styled at VIP Salons",
    width: 1179,
    height: 1321,
  },
  {
    src: "/images/hair/hero-800.webp",
    alt: "Hair styled at VIP Salons",
    width: 1536,
    height: 2048,
  },
];

export default function HairGallery() {
  return (
    <section className="gallery section" id="gallery" aria-labelledby="gallery-heading">
      <div className="container">
        <p className="section__eyebrow">Our work</p>
        <h2 className="section__heading" id="gallery-heading">
          Made to turn heads
        </h2>
        <p className="section__lede">
          A glimpse of the hair results our stylists create every day.
        </p>

        <div className="gallery__grid">
          {galleryItems.map((item) => (
            <figure className="gallery__figure" key={item.src}>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                width={item.width}
                height={item.height}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
