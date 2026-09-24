"use client";

import { Search, ShoppingCart, User, Menu, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Top announcement bar */}
      <div className="topBar">
        🚚 Verified surplus deals • Secure payments • Sellers across India
      </div>

      {/* Main header */}
      <header className="header">
        <div className="headerInner">

          <button className="mobileMenu">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="logo">
            <span className="logoMark">S</span>
            <span>Surplus<span className="logoAccent">Hub</span></span>
          </div>

          {/* Search */}
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

          {/* Header actions */}
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

        {/* Navigation */}
        <nav className="nav">
          <div className="navInner">

            <button className="categoryButton">
              <Menu size={19} />
              All Categories
              <ChevronDown size={16} />
            </button>

            <a href="#">Today's Deals</a>
            <a href="#">New Arrivals</a>
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

      {/* Hero */}
      <section className="hero">
        <div className="heroContent">
          <span className="heroBadge">THE SURPLUS MARKETPLACE</span>

          <h1>
            Great products.
            <br />
            <span>Smarter prices.</span>
          </h1>

          <p>
            Discover genuine surplus, overstock and unsold inventory
            from verified sellers across India.
          </p>

          <div className="heroButtons">
            <button className="primaryButton">
              Explore Deals →
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
              <small>Up to 70% off</small>
            </div>
          </div>

          <div className="heroCircle">
            <span>S</span>
          </div>

          <div className="floatingCard cardTwo">
            <span>✓</span>
            <div>
              <strong>Verified Sellers</strong>
              <small>Trusted inventory</small>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="trustStrip">

        <div>
          <strong>✓ Verified Sellers</strong>
          <span>Business-verified suppliers</span>
        </div>

        <div>
          <strong>₹ Smart Prices</strong>
          <span>Surplus means better value</span>
        </div>

        <div>
          <strong>↻ Secure Orders</strong>
          <span>Protected checkout experience</span>
        </div>

        <div>
          <strong>🚚 Pan-India</strong>
          <span>Inventory from across India</span>
        </div>

      </section>

    </main>
  );
        }
