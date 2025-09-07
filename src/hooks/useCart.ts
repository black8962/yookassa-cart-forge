import { useState, useCallback } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: { id: string; name: string; price: number; image_url: string }, quantity: number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image_url: product.image_url,
      }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    itemCount,
  };
}