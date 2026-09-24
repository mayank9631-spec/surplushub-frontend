"use client";

import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Truck,
  Package,
  Heart,
  X,
  Minus,
  Plus,
} from "lucide-react";

const API_URL = "https://surplushub-api.onrender.com";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        console.log(
          "Loading products from:",
          `${API_URL}/api/products`
        );

        const response = await fetch(
          `${API_URL}/api/products`
        );

        console.log(
          "API response status:",
          response.status
        );

        if (!response.ok) {
          throw new Error(
            `API returned ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Products received:", data);

        if (!Array.isArray(data)) {
          throw new Error(
            "API did not return a product list"
          );
        }

        setProducts(data);
      } catch (error) {
        console.error(
          "Unable to load products:",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(
        "surplushub-cart"
      );

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error(
        "Unable to load saved cart:",
        error
      );
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "surplushub-cart",
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Unable to save cart:",
        error
      );
    }
  }, [cart]);

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                ),
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  }

  function increaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(
            item.quantity + 1,
            item.stock
          ),
        };
      })
    );
  }

  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  return (
    <main>
      {/* TOP BAR */}
      <div className="topBar">
        🚚 Verified surplus deals • Secure payments • Sellers across India
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="headerInner">

          <button className="mobileMenu">
            <Menu size={24} />
          </button>

          <div className="logo">
            <span className="logoMark">S</span>
            <span>
              Surplus<span className="logoAccent">Hub</span>
            </span>
          </div>

          <div className="searchBox">
            <Search size={21} />

            <input
              type="text"
              placeholder="Search surplus, overstock, products..."
            />

            <button className="searchButton">
              Search
            </button>
          </div>

          <div className="headerActions">

            <button className="headerAction">
              <User size={22} />
              <span>
                <small>Hello, Sign in</small>
                <strong>Account</strong>
              </span>
            </button>

            <button
              className="headerAction"
              onClick={() => setCartOpen(true)}
            >
              <div style={{ position: "relative" }}>
                <ShoppingCart size={24} />

                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      background: "#e53935",
                      color: "#fff",
                      borderRadius: "50%",
                      minWidth: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>

              <span>
                <small>Your</small>
                <strong>Cart</strong>
              </span>
            </button>

          </div>
        </div>

        <nav className="nav">
          <div className="navInner">

            <button className="categoryButton">
              <Menu size={19} />
              All Categories
              <ChevronDown size={16} />
            </button>

            <a href="#deals">Today's Deals</a>
            <a href="#new">New Arrivals</a>
            <a href="#">Fashion</a>
            <a href="#">Electronics</a>
            <a href="#">Home & Living</a>
            <a href="#">Wholesale</a>

            <a className="sellLink" href="#">
              Sell on SurplusHub →
            </a>

          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="heroContent">

          <span className="heroBadge">
            THE SURPLUS MARKETPLACE
          </span>

          <h1>
            Great products.
            <br />
            <span>Smarter prices.</span>
          </h1>

          <p>
            Discover genuine surplus, overstock and unsold inventory
            from sellers across India.
          </p>

          <div className="heroButtons">
            <button
              className="primaryButton"
              onClick={() =>
                document
                  .getElementById("deals")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Deals <ArrowRight size={17} />
            </button>

            <button className="secondaryButton">
              Sell Your Surplus
            </button>
          </div>

        </div>

        <div className="heroVisual">

          <div className="floatingCard cardOne">
            <span>🔥</span>
            <div>
              <strong>Today's Deal</strong>
              <small>Great surplus prices</small>
            </div>
          </div>

          <div className="heroCircle">
            <span>S</span>
          </div>

          <div className="floatingCard cardTwo">
            <span>✓</span>
            <div>
              <strong>Trusted Sellers</strong>
              <small>Quality inventory</small>
            </div>
          </div>

        </div>
      </section>

      {/* TRUST */}
      <section className="trustStrip">

        <div>
          <ShieldCheck size={22} />
          <strong>Verified Sellers</strong>
          <span>Business-verified suppliers</span>
        </div>

        <div>
          <Package size={22} />
          <strong>Smart Prices</strong>
          <span>Surplus means better value</span>
        </div>

        <div>
          <ShieldCheck size={22} />
          <strong>Secure Orders</strong>
          <span>Protected checkout experience</span>
        </div>

        <div>
          <Truck size={22} />
          <strong>Pan-India</strong>
          <span>Inventory from across India</span>
        </div>

      </section>

      {/* PRODUCT SECTION */}
      <section className="productSection" id="deals">

        <div className="sectionHeader">
          <div>
            <span className="sectionEyebrow">
              FRESH INVENTORY
            </span>

            <h2>Today's Surplus Deals</h2>

            <p>
              Real products currently available on SurplusHub.
            </p>
          </div>

          <button className="viewAllButton">
            View all <ArrowRight size={17} />
          </button>
        </div>

        {loading ? (
          <div className="loadingBox">
            Loading live inventory...
          </div>
        ) : products.length === 0 ? (
          <div className="emptyBox">
            No products available yet.
          </div>
        ) : (
          <div className="productGrid">

            {products.map((product) => {

              const discount =
                product.mrp &&
                product.mrp > product.price
                  ? Math.round(
                      ((product.mrp - product.price) /
                        product.mrp) *
                        100
                    )
                  : 0;

              return (
                <article
                  className="productCard"
                  key={product.id}
                >

                  <div className="productImage">

                    <button className="wishlistButton">
                      <Heart size={18} />
                    </button>

                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                      />
                    ) : (
                      <div className="productPlaceholder">
                        <Package size={52} />
                        <span>
                          {product.category}
                        </span>
                      </div>
                    )}

                    {discount > 0 && (
                      <span className="discountBadge">
                        {discount}% OFF
                      </span>
                    )}

                  </div>

                  <div className="productInfo">

                    <span className="productCategory">
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>

                    <div className="priceRow">
                      <strong>
                        ₹{product.price}
                      </strong>

                      {product.mrp && (
                        <del>
                          ₹{product.mrp}
                        </del>
                      )}
                    </div>

                    <div className="stockRow">
                      <span>
                        {product.stock} units available
                      </span>

                      <span>
                        {product.condition}
                      </span>
                    </div>

                    <button
                      className="addCartButton"
                      onClick={() =>
                        addToCart(product)
                      }
                    >
                      Add to Cart
                    </button>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </section>

      {/* CATEGORY SECTION */}
      <section
        className="categorySection"
        id="new"
      >

        <div className="sectionHeader">
          <div>
            <span className="sectionEyebrow">
              EXPLORE
            </span>

            <h2>Shop by Category</h2>
          </div>
        </div>

        <div className="categoryGrid">

          <div className="categoryTile">
            <span>👕</span>
            <strong>Fashion</strong>
            <small>Apparel & accessories</small>
          </div>

          <div className="categoryTile">
            <span>📱</span>
            <strong>Electronics</strong>
            <small>Devices & accessories</small>
          </div>

          <div className="categoryTile">
            <span>🏠</span>
            <strong>Home & Living</strong>
            <small>Home products</small>
          </div>

          <div className="categoryTile">
            <span>🏭</span>
            <strong>Industrial</strong>
            <small>Business inventory</small>
          </div>

          <div className="categoryTile">
            <span>📦</span>
            <strong>Wholesale</strong>
            <small>Bulk opportunities</small>
          </div>

        </div>

      </section>

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 9999,
          }}
          onClick={() => setCartOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "min(420px, 100%)",
              background: "#fff",
              padding: "24px",
              overflowY: "auto",
              boxShadow: "-5px 0 20px rgba(0,0,0,0.15)",
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2 style={{ margin: 0 }}>
                Your Cart
              </h2>

              <button
                onClick={() =>
                  setCartOpen(false)
                }
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 10px",
                }}
              >
                <ShoppingCart
                  size={50}
                  style={{
                    marginBottom: "15px",
                  }}
                />

                <h3>Your cart is empty</h3>

                <p>
                  Add a surplus product to get started.
                </p>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      borderBottom:
                        "1px solid #eee",
                      paddingBottom: "18px",
                      marginBottom: "18px",
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        gap: "15px",
                      }}
                    >
                      <div>
                        <strong>
                          {item.name}
                        </strong>

                        <div
                          style={{
                            marginTop: "6px",
                          }}
                        >
                          ₹{item.price}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <X size={18} />
                      </button>

                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginTop: "12px",
                      }}
                    >

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                        style={{
                          width: "32px",
                          height: "32px",
                          cursor: "pointer",
                        }}
                      >
                        <Minus size={15} />
                      </button>

                      <strong>
                        {item.quantity}
                      </strong>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                        disabled={
                          item.quantity >=
                          item.stock
                        }
                        style={{
                          width: "32px",
                          height: "32px",
                          cursor:
                            item.quantity >=
                            item.stock
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        <Plus size={15} />
                      </button>

                    </div>

                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    fontSize: "20px",
                    fontWeight: "700",
                    marginTop: "25px",
                  }}
                >
                  <span>Total</span>

                  <span>
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  className="primaryButton"
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    justifyContent:
                      "center",
                  }}
                  onClick={() =>
                    alert(
                      "Checkout will be connected next."
                    )
                  }
                >
                  Proceed to Checkout
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </main>
  );
        }
