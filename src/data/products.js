export const products = [
    // === ÁLBUNS ===
    {
        id: 'album-mole',
        name: 'Álbum Copa 2026 - Capa Mole',
        price: 29.90,
        image: '/products/album-capa-mole.png',
        category: 'albuns',
        description: 'Álbum oficial da Copa do Mundo 2026 com capa mole. Colecione todas as figurinhas!',
    },
    {
        id: 'album-dura',
        name: 'Álbum Copa 2026 - Capa Dura',
        price: 44.90,
        image: '/products/album-capa-dura.webp',
        category: 'albuns',
        description: 'Álbum oficial da Copa do Mundo 2026 com capa dura premium. Edição especial de colecionador!',
    },

    // === FIGURINHAS ===
    {
        id: 'fig-25',
        name: '25 Pacotinhos de Figurinhas',
        price: 100.00,
        image: '/products/figurinhas.jpg',
        category: 'figurinhas',
        description: '25 pacotinhos lacrados de figurinhas oficiais Copa 2026.',
    },
    {
        id: 'fig-50',
        name: '50 Pacotinhos de Figurinhas',
        price: 190.00,
        image: '/products/figurinhas.jpg',
        category: 'figurinhas',
        description: '50 pacotinhos lacrados de figurinhas oficiais Copa 2026.',
    },
    {
        id: 'fig-100',
        name: '100 Pacotinhos de Figurinhas',
        price: 360.00,
        image: '/products/figurinhas.jpg',
        category: 'figurinhas',
        description: '100 pacotinhos lacrados de figurinhas oficiais Copa 2026. Melhor custo-benefício!',
    },

    // === COMBOS ===
    {
        id: 'combo-mole-10',
        name: 'Álbum Capa Mole + 10 Pacotinhos',
        price: 69.90,
        image: '/products/combo.jpg',
        category: 'combos',
        description: 'Combo com álbum capa mole + 10 pacotinhos de figurinhas.',
    },
    {
        id: 'combo-mole-25',
        name: 'Álbum Capa Mole + 25 Pacotinhos',
        price: 119.90,
        image: '/products/combo.jpg',
        category: 'combos',
        description: 'Combo com álbum capa mole + 25 pacotinhos de figurinhas.',
    },
    {
        id: 'combo-mole-50',
        name: 'Álbum Capa Mole + 50 Pacotinhos',
        price: 209.90,
        image: '/products/combo.jpg',
        category: 'combos',
        description: 'Combo com álbum capa mole + 50 pacotinhos de figurinhas.',
    },
    {
        id: 'combo-dura-10',
        name: 'Álbum Capa Dura + 10 Pacotinhos',
        price: 84.90,
        image: '/products/combo.jpg',
        category: 'combos',
        description: 'Combo com álbum capa dura + 10 pacotinhos de figurinhas.',
    },
    {
        id: 'combo-dura-25',
        name: 'Álbum Capa Dura + 25 Pacotinhos',
        price: 134.90,
        image: '/products/combo.jpg',
        category: 'combos',
        description: 'Combo com álbum capa dura + 25 pacotinhos de figurinhas.',
    },
    {
        id: 'combo-dura-50',
        name: 'Álbum Capa Dura + 50 Pacotinhos',
        price: 224.90,
        image: '/products/combo.jpg',
        category: 'combos',
        description: 'Combo com álbum capa dura + 50 pacotinhos de figurinhas.',
    },

    // === ESPECIAIS ===
    {
        id: 'neymar-especial',
        name: 'Figurinha Especial - Neymar Jr',
        price: 250.00,
        image: '/products/neymar.jpg',
        category: 'especiais',
        description: 'Figurinha extra legend exclusiva do Neymar Jr. Edição limitada Copa 2026!',
    },
];

export const getProductsByCategory = (category) =>
    products.filter((p) => p.category === category);

export const getProductById = (id) =>
    products.find((p) => p.id === id);

export const formatPrice = (price) =>
    `R$ ${price.toFixed(2).replace('.', ',')}`;
