import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CartContext } from "./cart-context";
import { books } from "../data/books";
import type { Book, CartItem } from "../types";

const STORAGE_KEY = "cart";

interface StoredLine {
  bookId: string;
  quantity: number;
}

function readStoredLines(): StoredLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        typeof line.bookId === "string" && typeof line.quantity === "number",
    );
  } catch {
    return [];
  }
}

function linesToItems(lines: StoredLine[]): CartItem[] {
  return lines
    .map((line) => {
      const book = books.find((b) => b.id === line.bookId);
      return book ? { book, quantity: line.quantity } : null;
    })
    .filter((item): item is CartItem => item !== null);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    linesToItems(readStoredLines()),
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      const lines: StoredLine[] = items.map((item) => ({
        bookId: item.book.id,
        quantity: item.quantity,
      }));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // localStorage can throw in private browsing - cart still works for this page view.
    }
  }, [items]);

  const addItem = (book: Book) => {
    setItems((current) => {
      const existing = current.find((item) => item.book.id === book.id);
      if (existing) {
        return current.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (bookId: string) => {
    setItems((current) => current.filter((item) => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(bookId);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.book.price * item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isCheckoutOpen,
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
