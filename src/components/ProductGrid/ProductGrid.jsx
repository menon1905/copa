import React from 'react';
import './ProductGrid.css';

const products = [
    { id: 1, name: 'Pacotinho de Figurinha Copa 2026', price: 'R$ 4,00', image: 'https://images.unsplash.com/photo-1610364155104-5f1146747120?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Álbum da Copa 2026 - Capa Dura', price: 'R$ 44,90', image: 'https://images.unsplash.com/photo-1544650030-3c9baf622277?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Kit 50 Pacotinhos Lacrados', price: 'R$ 190,00', image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Figurinha Extra Legend - Neymar Jr', price: 'R$ 250,00', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400' },
];

const ProductGrid = () => {
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
                            <button className="add-btn">ADICIONAR</button>
                        </div>
                        <div className="product-info">
                            <h4>{product.name}</h4>
                            <p className="price">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
