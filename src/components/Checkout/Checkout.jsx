import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import './Checkout.css';

const Checkout = ({ onClose }) => {
    const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
    const [step, setStep] = useState('cart'); // cart | form | success
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', cep: '', address: '', number: '', complement: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep('success');
    };

    const handleFinish = () => {
        clearCart();
        onClose();
    };

    if (items.length === 0 && step !== 'success') {
        return (
            <div className="checkout-backdrop" onClick={onClose}>
                <div className="checkout-panel" onClick={(e) => e.stopPropagation()}>
                    <button className="checkout-close" onClick={onClose}><X size={24} /></button>
                    <div className="checkout-empty">
                        <span className="empty-icon">🛒</span>
                        <h3>Seu carrinho está vazio</h3>
                        <p>Adicione produtos para continuar</p>
                        <button className="back-shop-btn" onClick={onClose}>VOLTAR ÀS COMPRAS</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-backdrop" onClick={onClose}>
            <div className="checkout-panel" onClick={(e) => e.stopPropagation()}>
                <button className="checkout-close" onClick={onClose}><X size={24} /></button>

                {step === 'cart' && (
                    <>
                        <div className="checkout-header">
                            <h2>Meu Carrinho</h2>
                            <span className="item-count">{items.length} {items.length === 1 ? 'item' : 'itens'}</span>
                        </div>

                        <div className="checkout-items">
                            {items.map((item) => (
                                <div key={item.id} className="checkout-item">
                                    <div className="checkout-item-img">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="checkout-item-details">
                                        <h4>{item.name}</h4>
                                        <p className="checkout-item-price">{formatPrice(item.price)}</p>
                                        <div className="checkout-qty">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <Minus size={14} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="checkout-item-right">
                                        <span className="checkout-item-subtotal">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                        <button className="remove-item-btn" onClick={() => removeItem(item.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="checkout-summary">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Frete</span>
                                <span className="free-shipping">GRÁTIS</span>
                            </div>
                            <div className="summary-row total-row">
                                <span>Total</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <button className="checkout-continue-btn" onClick={() => setStep('form')}>
                                FINALIZAR COMPRA
                            </button>
                        </div>
                    </>
                )}

                {step === 'form' && (
                    <>
                        <div className="checkout-header">
                            <button className="back-btn" onClick={() => setStep('cart')}>
                                <ArrowLeft size={20} />
                            </button>
                            <h2>Seus Dados</h2>
                        </div>

                        <form className="checkout-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nome Completo</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Seu nome completo" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>E-mail</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="seu@email.com" />
                                </div>
                                <div className="form-group">
                                    <label>Telefone</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="(00) 00000-0000" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>CEP</label>
                                    <input type="text" name="cep" value={formData.cep} onChange={handleChange} required placeholder="00000-000" />
                                </div>
                                <div className="form-group flex-2">
                                    <label>Endereço</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Rua, Avenida..." />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Número</label>
                                    <input type="text" name="number" value={formData.number} onChange={handleChange} required placeholder="Nº" />
                                </div>
                                <div className="form-group flex-2">
                                    <label>Complemento</label>
                                    <input type="text" name="complement" value={formData.complement} onChange={handleChange} placeholder="Apto, Bloco..." />
                                </div>
                            </div>

                            <div className="checkout-summary">
                                <div className="summary-row total-row">
                                    <span>Total a pagar</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                            </div>

                            <div className="trust-badges">
                                <div className="trust-item"><CreditCard size={18} /> <span>4x sem juros</span></div>
                                <div className="trust-item"><Truck size={18} /> <span>Frete grátis</span></div>
                                <div className="trust-item"><ShieldCheck size={18} /> <span>Compra segura</span></div>
                            </div>

                            <button type="submit" className="checkout-continue-btn">
                                CONFIRMAR PEDIDO
                            </button>
                        </form>
                    </>
                )}

                {step === 'success' && (
                    <div className="checkout-success">
                        <div className="success-icon">✅</div>
                        <h2>Pedido Confirmado!</h2>
                        <p>Obrigado pela sua compra. Você receberá os detalhes por e-mail.</p>
                        <div className="success-order">
                            <span>Pedido #</span>
                            <span className="order-number">{Math.floor(Math.random() * 900000 + 100000)}</span>
                        </div>
                        <button className="back-shop-btn" onClick={handleFinish}>
                            VOLTAR À LOJA
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
