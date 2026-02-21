import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './CartPage.css';

const CartPage = () => {
    const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="cart-page container">
                <div className="cart-empty">
                    <ShoppingBag size={64} strokeWidth={1} />
                    <h2>Seu carrinho está vazio</h2>
                    <p>Explore nossos produtos e encontre o que procura!</p>
                    <Link to="/" className="continue-shopping-btn">CONTINUAR COMPRANDO</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="breadcrumb container">
                <Link to="/">Início</Link>
                <span>/</span>
                <span className="current">Carrinho</span>
            </div>

            <div className="container">
                <h1 className="cart-title">Meu Carrinho <span>({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span></h1>

                <div className="cart-layout">
                    <div className="cart-items-list">
                        {items.map((item) => (
                            <div key={item.id} className="cart-item-row">
                                <Link to={`/produto/${item.id}`} className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </Link>
                                <div className="cart-item-details">
                                    <Link to={`/produto/${item.id}`}>
                                        <h4>{item.name}</h4>
                                    </Link>
                                    <p className="cart-item-unit-price">{formatPrice(item.price)} / unidade</p>
                                    <div className="cart-item-qty">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-item-end">
                                    <span className="cart-item-subtotal">{formatPrice(item.price * item.quantity)}</span>
                                    <button className="cart-remove-btn" onClick={() => removeItem(item.id)}>
                                        <Trash2 size={18} /> Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-sidebar">
                        <div className="cart-summary-card">
                            <h3>Resumo do Pedido</h3>
                            <div className="cart-summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="cart-summary-row">
                                <span>Frete</span>
                                <span className="cart-free-shipping">GRÁTIS</span>
                            </div>
                            <div className="cart-summary-row cart-summary-total">
                                <span>Total</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="cart-installment-info">
                                ou 4x de <strong>{formatPrice(totalPrice / 4)}</strong> sem juros
                            </div>
                            <button className="cart-checkout-btn" onClick={() => navigate('/checkout')}>
                                FINALIZAR COMPRA
                            </button>
                            <Link to="/" className="cart-continue-link">
                                <ArrowLeft size={16} /> Continuar comprando
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
