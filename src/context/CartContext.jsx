import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const addItem = useCallback((product, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    }, []);

    const updateQuantity = useCallback((id, quantity) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((item) => item.id !== id));
        } else {
            setItems((prev) =>
                prev.map((item) => (item.id === id ? { ...item, quantity } : item))
            );
        }
    }, []);

    const removeItem = useCallback((id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
                totalItems,
                totalPrice,
                isCheckoutOpen,
                setIsCheckoutOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
