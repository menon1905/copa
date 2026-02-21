import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch saved cards for the current user
  const fetchCards = async (userId) => {
    if (!userId) {
      setCards([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('payment_cards')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Mask card numbers for security (show last 4 digits)
      const maskedCards = data.map(card => ({
        ...card,
        masked_number: `**** **** **** ${card.card_number.slice(-4)}`
      }));

      setCards(maskedCards);
    } catch (err) {
      console.error('Error fetching cards:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save a new card
  const saveCard = async (userId, cardData) => {
    if (!userId) {
      setError('User not logged in');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: insertError } = await supabase
        .from('payment_cards')
        .insert([
          {
            user_id: userId,
            card_number: cardData.cardNumber,
            card_holder: cardData.cardHolder,
            expiry_month: parseInt(cardData.expiryMonth),
            expiry_year: parseInt(cardData.expiryYear),
            cvv: cardData.cvv,
            is_default: cardData.isDefault || false
          }
        ])
        .select();

      if (insertError) throw insertError;

      // Refresh cards
      await fetchCards(userId);
      return data[0];
    } catch (err) {
      console.error('Error saving card:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a card
  const deleteCard = async (cardId, userId) => {
    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('payment_cards')
        .delete()
        .eq('id', cardId)
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // Refresh cards
      await fetchCards(userId);
    } catch (err) {
      console.error('Error deleting card:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Set card as default
  const setDefaultCard = async (cardId, userId) => {
    setLoading(true);
    setError(null);

    try {
      // Set all cards to not default
      await supabase
        .from('payment_cards')
        .update({ is_default: false })
        .eq('user_id', userId);

      // Set the selected card as default
      const { error: updateError } = await supabase
        .from('payment_cards')
        .update({ is_default: true })
        .eq('id', cardId)
        .eq('user_id', userId);

      if (updateError) throw updateError;

      // Refresh cards
      await fetchCards(userId);
    } catch (err) {
      console.error('Error setting default card:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        cards,
        loading,
        error,
        fetchCards,
        saveCard,
        deleteCard,
        setDefaultCard
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within PaymentProvider');
  }
  return context;
};
