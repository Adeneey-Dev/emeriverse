import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "../../providers/useCart";
import { formatNaira } from "../../lib/currency";
import { Button } from "../ui/Button";

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    openCheckout,
  } = useCart();

  useEffect(() => {
    if (!isCartOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="ml-auto flex h-full w-full max-w-md flex-col bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-surface-line px-6 py-5">
              <div>
                <h2 className="font-display text-xl font-medium text-fg">
                  Your Cart
                </h2>
                <p className="mt-0.5 text-xs text-fg-muted">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-alt hover:text-fg"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-alt text-gold">
                  <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <p className="mt-5 font-display text-lg text-fg">
                  Your cart is empty
                </p>
                <p className="mt-1.5 text-sm text-fg-muted">
                  Add a few flash card sets and they'll show up here.
                </p>
                <Button variant="primary" className="mt-6" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-surface-line overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map(({ book, quantity }) => (
                      <motion.li
                        key={book.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 py-5">
                          <div
                            className="h-24 w-16 shrink-0 rounded-[3px] shadow-md"
                            style={{
                              background: `linear-gradient(155deg, ${book.coverPalette[0]} 0%, ${book.coverPalette[1]} 130%)`,
                            }}
                            aria-hidden="true"
                          />
                          <div className="flex min-w-0 flex-1 flex-col">
                            <p className="line-clamp-2 font-display text-sm font-medium leading-snug text-fg">
                              {book.title}
                            </p>
                            <p className="mt-0.5 text-xs text-fg-muted">
                              {formatNaira(book.price)} each
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-3">
                              <div className="flex items-center rounded-sm border border-surface-line">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(book.id, quantity - 1)
                                  }
                                  aria-label={`Decrease quantity of ${book.title}`}
                                  className="flex h-8 w-8 items-center justify-center text-fg-muted transition-colors hover:text-fg"
                                >
                                  <Minus
                                    className="h-3.5 w-3.5"
                                    strokeWidth={2}
                                  />
                                </button>
                                <span
                                  className="w-8 text-center text-sm font-medium text-fg"
                                  aria-live="polite"
                                >
                                  {quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(book.id, quantity + 1)
                                  }
                                  aria-label={`Increase quantity of ${book.title}`}
                                  className="flex h-8 w-8 items-center justify-center text-fg-muted transition-colors hover:text-fg"
                                >
                                  <Plus
                                    className="h-3.5 w-3.5"
                                    strokeWidth={2}
                                  />
                                </button>
                              </div>
                              <span className="font-display text-base font-medium text-fg">
                                {formatNaira(book.price * quantity)}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(book.id)}
                            aria-label={`Remove ${book.title} from cart`}
                            className="self-start text-fg-faint transition-colors hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-surface-line bg-surface-alt/50 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-fg-muted">Subtotal</span>
                    <span className="font-display text-xl font-medium text-fg">
                      {formatNaira(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-fg-faint">
                    Delivery is calculated at checkout.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="mt-4"
                    onClick={openCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
