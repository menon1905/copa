import React from 'react';
import { getProductsByCategory, formatPrice } from '../../data/products';
import './ProductSection.css';

const ProductSection = ({ id, title, category, onProductClick }) => {
    const products = getProductsByCategory(category);

    return (
        <section className="product-section" id={id}>
            <div className="container">
                <div className="section-title-bar">
                    <h2>{title}</h2>
                    <div className="title-line"></div>
                </div>

                <div className="product-section-grid">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="store-card"
                            onClick={() => onProductClick(product)}
                        >
                            <div className="store-card-image">
                                <img src={product.image} alt={product.name} />
                                <div className="store-card-overlay">
                                    <span>VER DETALHES</span>
                                </div>
                            </div>
                            <div className="store-card-info">
                                <h4>{product.name}</h4>
                                <p className="store-card-price">{formatPrice(product.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
