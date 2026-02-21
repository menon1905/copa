import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory, formatPrice } from '../data/products';
import './CategoryPage.css';

const categoryTitles = {
    albuns: 'Álbuns',
    figurinhas: 'Figurinhas',
    combos: 'Combos',
    especiais: 'Especiais',
};

const CategoryPage = () => {
    const { slug } = useParams();
    const products = getProductsByCategory(slug);
    const title = categoryTitles[slug] || slug;

    return (
        <div className="category-page">
            {/* Breadcrumb */}
            <div className="breadcrumb container">
                <Link to="/">Início</Link>
                <span>/</span>
                <span className="current">{title}</span>
            </div>

            <div className="container">
                <div className="category-page-header">
                    <h1>{title}</h1>
                    <p className="results-count">{products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}</p>
                </div>

                {products.length === 0 ? (
                    <div className="empty-category">
                        <p>Nenhum produto encontrado nesta categoria.</p>
                        <Link to="/" className="back-home-btn">Voltar à loja</Link>
                    </div>
                ) : (
                    <div className="category-grid">
                        {products.map((product) => (
                            <Link to={`/produto/${product.id}`} key={product.id} className="category-product-card">
                                <div className="cat-product-image">
                                    <img src={product.image} alt={product.name} />
                                    <div className="cat-product-overlay">
                                        <span>VER DETALHES</span>
                                    </div>
                                </div>
                                <div className="cat-product-info">
                                    <h4>{product.name}</h4>
                                    <p className="cat-product-desc">{product.description}</p>
                                    <div className="cat-product-bottom">
                                        <span className="cat-product-price">{formatPrice(product.price)}</span>
                                        <span className="cat-product-installment">
                                            ou 4x de {formatPrice(product.price / 4)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
