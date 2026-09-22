import { createContext, ReactNode, useState } from 'react';
import { Product } from '@/src/types/Product';
import { CartItem } from '@/src/types/CartItem';

export type OrderStatus = 'received' | 'preparing' | 'on_the_way' | 'delivered';

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  address: string;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  orders: Order[];
  placeOrder: (details: { address: string; paymentMethod: string }) => Order | null;
};

export const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.product.id === product.id);
      if (existingProduct) {
        return currentCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId: string) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = (details: { address: string; paymentMethod: string }) => {
    if (!cart.length) return null;

    const order: Order = {
      id: `RC-${Date.now().toString().slice(-6)}`,
      items: cart.map((item) => ({ ...item })),
      total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      address: details.address,
      paymentMethod: details.paymentMethod,
      status: 'received',
      createdAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => [order, ...currentOrders]);
    setCart([]);
    return order;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity, orders, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
}
