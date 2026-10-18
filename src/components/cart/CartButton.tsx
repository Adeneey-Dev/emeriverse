import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../providers/useCart";
import { cn } from "../../lib/cn";

interface CartButtonProps {
  size?: "sm" | "md";
  className?: string;
}

export function CartButton({ size = "md", className }: CartButtonProps) {
  const { itemCount, openCart } = useCart();
  const dimensions = size === "sm" ? "h-10 w-10" : "h-9 w-9";

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={
        itemCount > 0
          ? `Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`
          : "Open cart"
      }
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 backdrop-blur-sm transition-colors duration-200",
        "hover:border-gold/60 hover:bg-gold/10 hover:text-gold-pale",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
        dimensions,
        className,
      )}
    >
      <ShoppingCart className="h-[17px] w-[17px]" strokeWidth={1.75} />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold leading-none text-ink"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
