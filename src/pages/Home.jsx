import React from "react";

export default function Home({ items, loading, setPage }) {
  const popular = items.filter((i) => i.tags.includes("popular")).slice(0, 4);
  const goToMenu = (e) => { e.preventDefault(); setPage("menu"); };

  return (
    <React.Fragment>
      {/* Hero */}
      <section className="home-hero">
        <div className="container home-hero-inner">
          <div className="home-hero-text">
            <div className="eyebrow mb-2">Authentic Lebanese Dining — Every Day</div>
            <h1 className="font-display fw-semibold mb-3">The Flavor of Tradition</h1>
            <p className="mb-4">
              Experience the true taste of Lebanon in every bite.
            </p>
            <a href="#menu" className="cta-btn" onClick={goToMenu}>
              <i className="fa-solid fa-utensils"></i> View Full Menu
            </a>
          </div>
          <div className="home-hero-image">
            <img src="/Pictures/R.png" alt="Cedar of Lebanon" />
          </div>
        </div>
        
      </section>

      {/* About strip */}
      <section className="home-about">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="feature-block">
                <i className="fa-solid fa-utensils"></i>
                <h3 className="font-display">Authentic Lebanese Grill</h3>
                <p>Where fresh ingredients meet the smoky flavor of traditional lebanese grilling</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="feature-block">
                <i className="fa-solid fa-seedling"></i>
                <h3 className="font-display">Freshness First</h3>
                <p>Quality starts with fresh ingredients and ends with unforgettable Lebanese flavors</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="feature-block">
                <i className="fa-solid fa-users"></i>
                <h3 className="font-display">Gather Around</h3>
                <p>Authentic Lebanese dishes made to be shared with the people you love.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular picks preview */}
      <section className="home-popular">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-3 flex-wrap gap-2">
            <div>
              <div className="eyebrow mb-1">Lebanese Favorites</div>
              <h2 className="font-display mb-0">Popular Picks</h2>
            </div>
            <a href="#menu" className="see-all-link" onClick={goToMenu}>
              See full menu <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          {loading ? (
            <div className="empty-state">
              <i className="fa-solid fa-utensils fa-spin"></i>
              <p>Plating up the menu…</p>
            </div>
          ) : (
            <div className="row g-4">
              {popular.map((item) => (
                <div className="col-6 col-sm-4 col-md-3" key={item.id}>
                  <a href="#menu" className="preview-card" onClick={goToMenu}>
                    <div className="preview-img-wrap">
                      <img src={item.img} alt={item.name} loading="lazy" />
                      <span className="price-stamp font-mono">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="preview-body">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-desc">{item.desc}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}
