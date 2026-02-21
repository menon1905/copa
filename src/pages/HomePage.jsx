import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import { products, formatPrice } from '../data/products';
import './HomePage.css';

const featured = [
    products.find((p) => p.id === 'album-dura'),
    products.find((p) => p.id === 'fig-50'),
    products.find((p) => p.id === 'combo-dura-25'),
    products.find((p) => p.id === 'neymar-especial'),
];

const HomePage = () => {
    return (
        <div className="home-page">
            <Hero />
            <Categories />

            {/* Featured Products */}
            <section className="featured-section container">
                <div className="featured-header">
                    <h2>Destaques da Semana</h2>
                    <Link to="/categoria/albuns" className="see-all-link">Ver todos →</Link>
                </div>

                <div className="featured-grid">
                    {featured.map((product) => (
                        <Link to={`/produto/${product.id}`} key={product.id} className="featured-card">
                            <div className="featured-card-image">
                                <img src={product.image} alt={product.name} />
                                <div className="featured-badge">DESTAQUE</div>
                            </div>
                            <div className="featured-card-info">
                                <h4>{product.name}</h4>
                                <p className="featured-price">{formatPrice(product.price)}</p>
                                <span className="featured-cta">Ver detalhes →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
