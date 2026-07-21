/* ---------------- App shell (view state + shared state) ---------------- */
import React, { useState, useEffect } from "react";
import { fetchMenu } from "./data.js";
import { CartDrawer } from "./components.jsx";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home"); // "home" | "menu" — replaces react-router

  useEffect(() => {
    fetchMenu().then((data) => { setItems(data); setLoading(false); });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (item) => setCart((c) => ({ ...c, [item.id]: 1 }));
  const inc = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec = (id) => setCart((c) => {
    const next = { ...c };
    const q = (next[id] || 0) - 1;
    if (q <= 0) delete next[id]; else next[id] = q;
    return next;
  });

  return (
    <React.Fragment>
      <Header
        theme={theme}
        setTheme={setTheme}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        page={page}
        setPage={setPage}
      />

      {page === "home" && (
        <Home items={items} loading={loading} setPage={setPage} />
      )}

      {page === "menu" && (
        <Menu
          items={items}
          loading={loading}
          cart={cart}
          addToCart={addToCart}
          inc={inc}
          dec={dec}
        />
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        items={items}
        onInc={inc}
        onDec={dec}
      />
    </React.Fragment>
  );
}
