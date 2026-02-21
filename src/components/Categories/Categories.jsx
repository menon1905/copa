import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Package, User, Gift, Sparkles } from 'lucide-react';
import './Categories.css';

const categories = [
    { name: 'Álbuns', Icon: BookOpen, to: '/categoria/albuns' },
    { name: 'Pacotinhos', Icon: Package, to: '/categoria/figurinhas' },
    { name: 'Figurinhas Solo', Icon: User, to: '/categoria/figurinhas' },
    { name: 'Kits', Icon: Gift, to: '/categoria/combos' },
    { name: 'Especiais', Icon: Sparkles, to: '/categoria/especiais' },
];

const Categories = () => {
    return (
        <section className="categories container">
            <div className="category-list">
                {categories.map((cat, i) => (
                    <Link key={i} to={cat.to} className="category-card">
                        <div className="card-icon-wrapper">
                            <cat.Icon size={28} strokeWidth={1.8} />
                        </div>
                        <span className="card-name">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
