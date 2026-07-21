/* ---------------- Small components ---------------- */
import React from "react";

export function ThemeToggle({ theme, setTheme }) {
  return (
    <div
      className="theme-toggle-track"
      role="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className="theme-toggle-thumb">
        <i className={theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
      </div>
    </div>
  );
}

export function TagChip({ tag }) {
  const label = {hot:"Hot",spicy: "Spicy", popular: "Popular" , best:"Best Seller", new:"New",sweet:"Sweet"}[tag] || tag;
  return <span className={`tag-chip ${tag}`}>{label}</span>;
}

export function ItemCard({ item, qty, onAdd, onInc, onDec }) {
  return (
    <div className="col-6 col-sm-4 col-lg-3">
      <div className="item-card">
        <div className="item-img-wrap">
          <img src={item.img} alt={item.name} loading="lazy" />
          <span className="price-stamp font-mono">${item.price.toFixed(2)}</span>
        </div>
        <div className="item-body">
          {item.tags.length > 0 && (
            <div className="d-flex gap-1 flex-wrap">
              {item.tags.map((t) => <TagChip key={t} tag={t} />)}
            </div>
          )}
          <h3 className="item-name">{item.name}</h3>
          <p className="item-desc">{item.desc}</p>
          {qty > 0 ? (
            <div className="qty-control">
              <button onClick={() => onDec(item.id)} aria-label="Decrease quantity">
                <i className="fa-solid fa-minus"></i>
              </button>
              <span>{qty}</span>
              <button onClick={() => onInc(item.id)} aria-label="Increase quantity">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          ) : (
            <button className="add-btn" onClick={() => onAdd(item)}>
              <i className="fa-solid fa-plus"></i> Add to order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function CartDrawer({ open, onClose, cart, items, onInc, onDec }) {
  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ item: items.find((i) => i.id === Number(id)), qty }))
    .filter((l) => l.item && l.qty > 0);
  const total = lines.reduce((sum, l) => sum + l.item.price * l.qty, 0);

  return (
    <React.Fragment>
      <div className={`cart-overlay ${open ? "open" : ""}`} onClick={onClose}></div>
      <aside className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <h5 className="font-display mb-0">Your Order</h5>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="cart-drawer-body">
          {lines.length === 0 ? (
            <div className="empty-state">
              <i className="fa-solid fa-bag-shopping d-block"></i>
              <p className="mb-0">Your order is empty.<br/>Add a few things you're craving.</p>
            </div>
          ) : (
            lines.map(({ item, qty }) => (
              <div className="cart-line" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">{item.name}</span>
                    <span className="font-mono small">${(item.price * qty).toFixed(2)}</span>
                  </div>
                  <div className="qty-control mt-2">
                    <button onClick={() => onDec(item.id)}><i className="fa-solid fa-minus"></i></button>
                    <span>{qty}</span>
                    <button onClick={() => onInc(item.id)}><i className="fa-solid fa-plus"></i></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {lines.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Total</span>
              <span className="font-mono fw-bold fs-5">${total.toFixed(2)}</span>
            </div>
            <button className="btn w-100 rounded-pill py-2 fw-semibold"
              style={{background: "var(--cedar)", color: "#FFFFFF", border: "none"}}>
              Place Order
            </button>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}
