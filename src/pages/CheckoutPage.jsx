import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { internalDB } from '../lib/internal-db';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const { items, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', cpf: '',
        cep: '', address: '', number: '', complement: '', city: '', state: '',
        paymentMethod: 'credit',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            customer: formData,
            items: items,
            total: totalPrice,
        };

        const order = await internalDB.saveOrder(orderData);
        setOrderId(order.id);
        setSubmitted(true);
    };

    const handleFinish = () => {
        clearCart();
        navigate('/');
    };

    if (items.length === 0 && !submitted) {
        navigate('/carrinho');
        return null;
    }

    if (submitted) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <div className="checkout-success-page">
                        <div className="success-check">
                            <Check size={48} />
                        </div>
                        <h1>Pedido Confirmado!</h1>
                        <p>Obrigado pela sua compra. Você receberá os detalhes por e-mail em breve.</p>
                        <div className="success-order-box">
                            <span>Nº do Pedido</span>
                            <strong>#{orderId}</strong>
                        </div>
                        <button className="success-home-btn" onClick={handleFinish}>
                            VOLTAR À LOJA
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="breadcrumb container">
                <Link to="/">Início</Link>
                <span>/</span>
                <Link to="/carrinho">Carrinho</Link>
                <span>/</span>
                <span className="current">Checkout</span>
            </div>

            <div className="container">
                <h1 className="checkout-page-title">Finalizar Compra</h1>

                <form className="checkout-layout" onSubmit={handleSubmit}>
                    <div className="checkout-form-area">
                        {/* Personal Data */}
                        <div className="checkout-section-card">
                            <h3>Dados Pessoais</h3>
                            <div className="checkout-form-grid">
                                <div className="form-field full">
                                    <label>Nome Completo *</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Seu nome completo" />
                                </div>
                                <div className="form-field">
                                    <label>E-mail *</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="seu@email.com" />
                                </div>
                                <div className="form-field">
                                    <label>Telefone *</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="(00) 00000-0000" />
                                </div>
                                <div className="form-field">
                                    <label>CPF *</label>
                                    <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required placeholder="000.000.000-00" />
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="checkout-section-card">
                            <h3>Endereço de Entrega</h3>
                            <div className="checkout-form-grid">
                                <div className="form-field">
                                    <label>CEP *</label>
                                    <input type="text" name="cep" value={formData.cep} onChange={handleChange} required placeholder="00000-000" />
                                </div>
                                <div className="form-field double">
                                    <label>Endereço *</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Rua, Avenida..." />
                                </div>
                                <div className="form-field">
                                    <label>Número *</label>
                                    <input type="text" name="number" value={formData.number} onChange={handleChange} required placeholder="Nº" />
                                </div>
                                <div className="form-field">
                                    <label>Complemento</label>
                                    <input type="text" name="complement" value={formData.complement} onChange={handleChange} placeholder="Apto, Bloco..." />
                                </div>
                                <div className="form-field">
                                    <label>Cidade *</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Sua cidade" />
                                </div>
                                <div className="form-field">
                                    <label>Estado *</label>
                                    <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="UF" />
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="checkout-section-card">
                            <h3>Forma de Pagamento</h3>
                            <div className="payment-options">
                                <label className={`payment-option ${formData.paymentMethod === 'credit' ? 'active' : ''}`}>
                                    <input type="radio" name="paymentMethod" value="credit" checked={formData.paymentMethod === 'credit'} onChange={handleChange} />
                                    <CreditCard size={20} />
                                    <div>
                                        <strong>Cartão de Crédito</strong>
                                        <span>Até 4x sem juros</span>
                                    </div>
                                </label>
                                <label className={`payment-option ${formData.paymentMethod === 'pix' ? 'active' : ''}`}>
                                    <input type="radio" name="paymentMethod" value="pix" checked={formData.paymentMethod === 'pix'} onChange={handleChange} />
                                    <span className="pix-icon">◈</span>
                                    <div>
                                        <strong>PIX</strong>
                                        <span>Aprovação instantânea</span>
                                    </div>
                                </label>
                                <label className={`payment-option ${formData.paymentMethod === 'boleto' ? 'active' : ''}`}>
                                    <input type="radio" name="paymentMethod" value="boleto" checked={formData.paymentMethod === 'boleto'} onChange={handleChange} />
                                    <span className="boleto-icon">⊞</span>
                                    <div>
                                        <strong>Boleto Bancário</strong>
                                        <span>Vencimento em 3 dias</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="checkout-sidebar">
                        <div className="checkout-order-card">
                            <h3>Resumo do Pedido</h3>

                            <div className="checkout-order-items">
                                {items.map((item) => (
                                    <div key={item.id} className="checkout-order-item">
                                        <img src={item.image} alt={item.name} />
                                        <div>
                                            <span className="order-item-name">{item.name}</span>
                                            <span className="order-item-qty">Qtd: {item.quantity}</span>
                                        </div>
                                        <span className="order-item-price">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="checkout-order-totals">
                                <div className="order-total-row">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="order-total-row">
                                    <span>Frete</span>
                                    <span className="order-free">GRÁTIS</span>
                                </div>
                                <div className="order-total-row order-grand-total">
                                    <span>Total</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                            </div>

                            <button type="submit" className="checkout-confirm-btn">
                                CONFIRMAR PEDIDO
                            </button>

                            <div className="checkout-trust-row">
                                <div><ShieldCheck size={16} /> Compra segura</div>
                                <div><Truck size={16} /> Frete grátis</div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
