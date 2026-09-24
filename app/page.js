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
} from "lucide-react";

const API_URL = "https://surplushub-api.onrender.com";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

            <button className="headerAction">
              <ShoppingCart size={24} />
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
            <button className="primaryButton">
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

                    <button className="addCartButton">
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

    </main>
  );
       }
