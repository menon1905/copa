import React, { createContext, useContext, useEffect, useState } from 'react';
import { internalDB } from '../lib/internal-db';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verifica se há um usuário logado no banco interno ao carregar a página
        const current = internalDB.getUser();
        setUser(current);
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { user } = await internalDB.login(email, password);
        setUser(user);
        return user;
    };

    const signup = async (email, password) => {
        const { user } = await internalDB.signup(email, password);
        setUser(user);
        return user;
    };

    const signOut = async () => {
        await internalDB.logout();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        signup,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
