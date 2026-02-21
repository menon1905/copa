import React from 'react';
import { useCart } from '../../context/CartContext';
import './ProductGrid.css';

const products = [
    { id: 1, name: 'Pacotinho de Figurinha Copa 2026', price: 4.00, image: 'https://images.unsplash.com/photo-1610364155104-5f1146747120?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Álbum da Copa 2026 - Capa Dura', price: 44.90, image: 'https://images.unsplash.com/photo-1544650030-3c9baf622277?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Kit 50 Pacotinhos Lacrados', price: 190.00, image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Figurinha Extra Legend - Neymar Jr', price: 250.00, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400' },
];

const ProductGrid = () => {
    const { addItem } = useCart();

    const handleAddToCart = (product) => {
        addItem(product, 1);
    };

    return (
        <section className="products container">
            <div className="section-header">
                <h2>Destaques da Semana</h2>
                <a href="#">Ver todos</a>
            </div>

            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            <button className="add-btn" onClick={() => handleAddToCart(product)}>ADICIONAR</button>
                        </div>
                        <div className="product-info">
                            <h4>{product.name}</h4>
                            <p className="price">R$ {product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
