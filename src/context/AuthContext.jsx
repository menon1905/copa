import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is already logged in
        const checkUser = async () => {
            try {
                if (!supabase) {
                    console.warn('Supabase not configured');
                    setLoading(false);
                    return;
                }
                const { data: { user: authUser } } = await supabase.auth.getUser();
                setUser(authUser);
            } catch (err) {
                console.error('Error checking user:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        checkUser();

        // Listen for auth changes
        if (supabase) {
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                setUser(session?.user || null);
            });

            return () => subscription?.unsubscribe();
        }
    }, []);

    const login = async (email, password) => {
        setError(null);
        if (!supabase) {
            setError('Supabase not configured');
            throw new Error('Supabase not configured');
        }
        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (loginError) throw loginError;
            setUser(data.user);
            return data.user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const signup = async (email, password) => {
        setError(null);
        if (!supabase) {
            setError('Supabase not configured');
            throw new Error('Supabase not configured');
        }
        try {
            const { data, error: signupError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: email.split('@')[0]
                    }
                }
            });
            if (signupError) throw signupError;
            setUser(data.user);
            return data.user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const signOut = async () => {
        setError(null);
        if (!supabase) {
            throw new Error('Supabase not configured');
        }
        try {
            const { error: signOutError } = await supabase.auth.signOut();
            if (signOutError) throw signOutError;
            setUser(null);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const value = {
        user,
        loading,
        error,
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
