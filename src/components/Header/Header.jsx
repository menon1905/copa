import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="main-header">
      {/* Top Banner */}
      <div className="top-banner">
        <span className="banner-arrow">&lt;</span>
        <span>PARTICIPE DO MEGA SORTEIO 🎮</span>
        <span className="banner-arrow">&gt;</span>
      </div>

      {/* Navigation Layer */}
      <div className="nav-container container">
        <div className="header-left">
          <button className="icon-btn mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <button className="icon-btn search-btn">
            <Search size={24} />
          </button>
        </div>

        <div className="header-center">
          <div className="logo-container">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src="/logo.png" alt="DASPORTS Logo" className="logo-img" />
            </Link>
          </div>
        </div>

        <div className="header-right">
          {user ? (
            <div className="user-profile-nav">
              <span className="user-email-header">{user.email.split('@')[0]}</span>
              <button className="icon-btn" onClick={() => signOut()}>
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="icon-btn">
              <User size={24} />
            </Link>
          )}
          <Link to="/carrinho" className="icon-btn cart-btn" onClick={() => setIsMenuOpen(false)}>
            <ShoppingBag size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>

      <nav className={`desktop-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
        <ul className="nav-links">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Início</Link></li>
          <li><Link to="/categoria/albuns" onClick={() => setIsMenuOpen(false)}>Álbuns</Link></li>
          <li><Link to="/categoria/figurinhas" onClick={() => setIsMenuOpen(false)}>Figurinhas</Link></li>
          <li><Link to="/categoria/combos" onClick={() => setIsMenuOpen(false)}>Combos <ChevronDown size={14} /></Link></li>
          <li><Link to="/categoria/especiais" onClick={() => setIsMenuOpen(false)}>Especiais</Link></li>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>Rastrear pedido</a></li>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>Sobre nós</a></li>
        </ul>
      </nav>

      {/* Marquee Banner */}
      <div className="marquee-banner">
        <div className="marquee-content">
          {[...Array(10)].map((_, i) => (
            <span key={i}>PARCELE EM ATÉ 4X SEM JUROS • </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
