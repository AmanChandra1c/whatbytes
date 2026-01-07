import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product) => {
        const existingItem = get().items.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            items: get().items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
          toast.success(`${product.title} quantity updated!`);
        } else {
          set({
            items: [...get().items, { ...product, quantity: 1 }]
          });
          toast.success(`${product.title} added to cart!`);
        }
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({
            items: get().items.filter(item => item.id !== id)
          });
        } else {
          set({
            items: get().items.map(item =>
              item.id === id ? { ...item, quantity } : item
            )
          });
        }
      },
      
      removeItem: (id) => {
        const item = get().items.find(item => item.id === id);
        set({
          items: get().items.filter(item => item.id !== id)
        });
        if (item) {
          toast.error(`${item.title} removed from cart!`);
        }
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
