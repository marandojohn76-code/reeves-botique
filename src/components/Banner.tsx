import { useState, useEffect } from "react";

const slides = [
  {
    bg: "linear-gradient(135deg, #f97316, #fb923c)",
    title: "Seasonal Fashion Deals",
    sub: "Fresh arrivals and limited-time offers across fashion & beauty.",
    cta: "Shop the Sale",
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=80",
  },
  {
    bg: "linear-gradient(135deg, #fb923c, #fbbf24)",
    title: "Trendsetting Essentials",
    sub: "Curated outfits, accessories and shoes for every style.",
    cta: "Browse Now",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&q=80",
  },
  {
    bg: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    title: "Daily Flash Sales",
    sub: "Shop top categories before the discount ends tonight.",
    cta: "View Deals",
    img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=900&q=80",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((value) => (value + 1) % slides.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="banner" style={{ background: slide.bg }}>
      <div className="banner-text">
        <span className="badge">Top Deal</span>
        <h2>{slide.title}</h2>
        <p>{slide.sub}</p>
        <button className="banner-cta">{slide.cta}</button>
      </div>
      <div className="banner-media">
        <img src={slide.img} alt={slide.title} className="banner-img" />
      </div>
      <div className="banner-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
