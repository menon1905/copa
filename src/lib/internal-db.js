/**
 * BANCO DE DADOS INTERNO (Simulado)
 * Este arquivo substitui a necessidade de um servidor externo.
 * Os dados são salvos no LocalStorage do seu navegador.
 */

const STORAGE_KEY = 'DASPORTS_DB';

// Inicializa o banco se não existir
const initDB = () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            users: [],
            currentUser: null,
            orders: []
        }));
    }
};

export const internalDB = {
    // === AUTH ===
    signup: async (email, password) => {
        initDB();
        const db = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (db.users.find(u => u.email === email)) {
            throw new Error('Este e-mail já está cadastrado.');
        }

        const newUser = { id: Date.now(), email, password };
        db.users.push(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
        return { user: newUser };
    },

    login: async (email, password) => {
        initDB();
        const db = JSON.parse(localStorage.getItem(STORAGE_KEY));
        const user = db.users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('E-mail ou senha incorretos.');
        }

        db.currentUser = user;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
        return { user };
    },

    logout: async () => {
        initDB();
        const db = JSON.parse(localStorage.getItem(STORAGE_KEY));
        db.currentUser = null;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    },

    getUser: () => {
        initDB();
        const db = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return db.currentUser;
    },

    saveOrder: async (orderData) => {
        initDB();
        const db = JSON.parse(localStorage.getItem(STORAGE_KEY));
        const newOrder = {
            id: `ORD-${Date.now()}`,
            date: new Date().toISOString(),
            ...orderData
        };
        db.orders.push(newOrder);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
        return newOrder;
    }
};
