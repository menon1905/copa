import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, ArrowLeft, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import { getProductById, getProductsByCategory, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = getProductById(id);
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className="product-page container">
                <div className="product-not-found">
                    <h2>Produto não encontrado</h2>
                    <Link to="/" className="back-home-link">Voltar à loja</Link>
                </div>
            </div>
        );
    }

    const related = getProductsByCategory(product.category)
        .filter((p) => p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addItem(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleBuyNow = () => {
        addItem(product, quantity);
        navigate('/carrinho');
    };

    return (
        <div className="product-page">
            {/* Breadcrumb */}
            <div className="breadcrumb container">
                <Link to="/">Início</Link>
                <span>/</span>
                <Link to={`/categoria/${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link>
                <span>/</span>
                <span className="current">{product.name}</span>
            </div>

            <div className="container">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="product-detail-info">
                        <button className="back-link" onClick={() => navigate(-1)}>
                            <ArrowLeft size={18} /> Voltar
                        </button>

                        <h1>{product.name}</h1>
                        <p className="product-detail-desc">{product.description}</p>

                        <div className="product-detail-price-block">
                            <span className="product-detail-price">{formatPrice(product.price)}</span>
                            <span className="product-detail-installment">
                                ou 4x de <strong>{formatPrice(product.price / 4)}</strong> sem juros
                            </span>
                        </div>

                        <div className="product-detail-qty">
                            <span className="qty-label">Quantidade:</span>
                            <div className="qty-controls">
                                <button className="qty-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                                    <Minus size={18} />
                                </button>
                                <span className="qty-value">{quantity}</span>
                                <button className="qty-btn" onClick={() => setQuantity((q) => q + 1)}>
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="product-detail-total">
                            <span>Total:</span>
                            <span>{formatPrice(product.price * quantity)}</span>
                        </div>

                        <div className="product-detail-actions">
                            <button
                                className={`add-to-cart-btn ${added ? 'added' : ''}`}
                                onClick={handleAddToCart}
                                disabled={added}
                            >
                                <ShoppingBag size={20} />
                                {added ? 'ADICIONADO ✓' : 'ADICIONAR AO CARRINHO'}
                            </button>
                            <button className="buy-now-btn" onClick={handleBuyNow}>
                                COMPRAR AGORA
                            </button>
                        </div>

                        <div className="product-detail-trust">
                            <div><CreditCard size={16} /> 4x sem juros</div>
                            <div><Truck size={16} /> Frete grátis</div>
                            <div><ShieldCheck size={16} /> Compra segura</div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="related-section">
                        <h3>Produtos Relacionados</h3>
                        <div className="related-grid">
                            {related.map((p) => (
                                <Link to={`/produto/${p.id}`} key={p.id} className="related-card">
                                    <div className="related-card-img">
                                        <img src={p.image} alt={p.name} />
                                    </div>
                                    <div className="related-card-info">
                                        <h4>{p.name}</h4>
                                        <span>{formatPrice(p.price)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
