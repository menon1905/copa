import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    if (!product) return null;

    const handleAdd = () => {
        addItem(product, quantity);
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            onClose();
        }, 1200);
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-body">
                    <div className="modal-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="modal-info">
                        <h2 className="modal-product-name">{product.name}</h2>
                        <p className="modal-description">{product.description}</p>

                        <div className="modal-price-row">
                            <span className="modal-price">{formatPrice(product.price)}</span>
                            <span className="modal-unit">/ unidade</span>
                        </div>

                        <div className="modal-quantity">
                            <span className="qty-label">Quantidade:</span>
                            <div className="qty-controls">
                                <button
                                    className="qty-btn"
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="qty-value">{quantity}</span>
                                <button
                                    className="qty-btn"
                                    onClick={() => setQuantity((q) => q + 1)}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="modal-total">
                            <span>Total:</span>
                            <span className="modal-total-value">
                                {formatPrice(product.price * quantity)}
                            </span>
                        </div>

                        <button
                            className={`modal-add-btn ${added ? 'added' : ''}`}
                            onClick={handleAdd}
                            disabled={added}
                        >
                            <ShoppingBag size={20} />
                            {added ? 'ADICIONADO ✓' : 'ADICIONAR AO CARRINHO'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
