import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Package,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import { useCart } from "../../providers/useCart";
import { deliveryOptions } from "../../data/delivery";
import { formatNaira } from "../../lib/currency";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";

type PaymentMethod = "online" | "delivery";
type Status = "idle" | "processing" | "success";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldProps {
  id: keyof FormState;
  label: string;
  value: string;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Field({
  id,
  label,
  value,
  error,
  type = "text",
  placeholder,
  autoComplete,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={`checkout-${id}`}
        className="mb-1.5 block text-xs font-semibold text-fg"
      >
        {label}
      </label>
      <input
        id={`checkout-${id}`}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `checkout-${id}-error` : undefined}
        className={cn(
          "w-full rounded-sm border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-gold",
          error ? "border-red-500" : "border-surface-line",
        )}
      />
      {error && (
        <p id={`checkout-${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Full-screen checkout "page". Frontend-only: there is no server and
 * no real payment gateway behind the Pay button yet. When you're ready
 * for real payments, `handleSubmit` below is the single place to call
 * a gateway such as Paystack or Flutterwave (both support NGN).
 */
export function CheckoutOverlay() {
  const {
    items,
    itemCount,
    subtotal,
    isCheckoutOpen,
    closeCheckout,
    clearCart,
    openCart,
  } = useCart();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [deliveryId, setDeliveryId] = useState<string>(deliveryOptions[0].id);
  const [payment, setPayment] = useState<PaymentMethod>("online");
  const [status, setStatus] = useState<Status>("idle");
  const [receipt, setReceipt] = useState<{
    ref: string;
    total: number;
    email: string;
  } | null>(null);

  const delivery = useMemo(
    () =>
      deliveryOptions.find((o) => o.id === deliveryId) ?? deliveryOptions[0],
    [deliveryId],
  );
  const deliveryFee = items.length > 0 ? delivery.price : 0;
  const total = subtotal + deliveryFee;
  const needsAddress = delivery.id !== "pickup";

  const handleClose = () => {
    closeCheckout();
    if (status === "success") {
      setStatus("idle");
      setReceipt(null);
      setForm(EMPTY_FORM);
    }
  };

  useEffect(() => {
    if (!isCheckoutOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "processing") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckoutOpen, status]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!form.email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(form.email))
      next.email = "That email address doesn't look quite right.";
    if (form.phone.replace(/\D/g, "").length < 10)
      next.phone = "Please enter a valid phone number.";
    if (needsAddress) {
      if (!form.address.trim())
        next.address = "Please enter your delivery address.";
      if (!form.city.trim()) next.city = "Please enter your city.";
      if (!form.state.trim()) next.state = "Please enter your state.";
    }
    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0 || status === "processing") return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("processing");

    // FRONTEND-ONLY SIMULATION: replace this timeout with a real call to
    // your backend / payment gateway (e.g. Paystack, Flutterwave).
    window.setTimeout(() => {
      const ref = `EMV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      setReceipt({ ref, total, email: form.email });
      setStatus("success");
      clearCart();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-surface"
          role="dialog"
          aria-modal="true"
          aria-label="Checkout"
        >
          <header className="sticky top-0 z-10 border-b border-surface-line bg-surface/90 backdrop-blur-md">
            <div className="container-page flex h-16 items-center justify-between">
              <button
                type="button"
                onClick={handleClose}
                disabled={status === "processing"}
                className="flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                Back to shop
              </button>
              <span className="font-display text-lg font-medium text-fg">
                Checkout
              </span>
              <span className="hidden items-center gap-1.5 text-xs text-fg-muted sm:flex">
                <Lock className="h-3.5 w-3.5" strokeWidth={2} />
                Secure checkout
              </span>
              <span className="sm:hidden" />
            </div>
          </header>

          <div className="container-page py-10 lg:py-14">
            {status === "success" && receipt ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto flex max-w-lg flex-col items-center py-12 text-center"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <CheckCircle2 className="h-10 w-10" strokeWidth={1.5} />
                </span>
                <h1 className="mt-6 font-display text-3xl font-medium text-fg">
                  Thank you for your order!
                </h1>
                <p className="mt-3 text-fg-muted">
                  Your order{" "}
                  <span className="font-semibold text-fg">{receipt.ref}</span>{" "}
                  has been received. A confirmation will be sent to{" "}
                  <span className="font-semibold text-fg">{receipt.email}</span>
                  .
                </p>
                <p className="mt-2 text-sm text-fg-faint">
                  Order total: {formatNaira(receipt.total)}
                </p>
                <p className="mt-6 rounded-sm border border-surface-line bg-surface-alt px-4 py-3 text-xs text-fg-muted">
                  Demo mode: no real payment was taken and no order was placed.
                  Real payments will be connected soon.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-8"
                  onClick={handleClose}
                >
                  Continue Shopping
                </Button>
              </motion.div>
            ) : items.length === 0 ? (
              <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-alt text-gold">
                  <Package className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h1 className="mt-5 font-display text-2xl font-medium text-fg">
                  Nothing to check out yet
                </h1>
                <p className="mt-2 text-sm text-fg-muted">
                  Add a few books to your cart first, then come back here.
                </p>
                <Button
                  variant="primary"
                  className="mt-6"
                  onClick={handleClose}
                >
                  Browse Books
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14"
              >
                <div className="space-y-10">
                  <section aria-labelledby="contact-heading">
                    <h2
                      id="contact-heading"
                      className="font-display text-xl font-medium text-fg"
                    >
                      Contact details
                    </h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <Field
                          id="fullName"
                          label="Full name"
                          value={form.fullName}
                          error={errors.fullName}
                          autoComplete="name"
                          onChange={handleChange}
                        />
                      </div>
                      <Field
                        id="email"
                        label="Email address"
                        type="email"
                        value={form.email}
                        error={errors.email}
                        autoComplete="email"
                        onChange={handleChange}
                      />
                      <Field
                        id="phone"
                        label="Phone number"
                        type="tel"
                        value={form.phone}
                        error={errors.phone}
                        placeholder="0801 234 5678"
                        autoComplete="tel"
                        onChange={handleChange}
                      />
                    </div>
                  </section>

                  <section aria-labelledby="delivery-heading">
                    <h2
                      id="delivery-heading"
                      className="font-display text-xl font-medium text-fg"
                    >
                      Delivery method
                    </h2>
                    <div
                      className="mt-5 space-y-3"
                      role="radiogroup"
                      aria-labelledby="delivery-heading"
                    >
                      {deliveryOptions.map((option) => {
                        const selected = option.id === deliveryId;
                        return (
                          <label
                            key={option.id}
                            className={cn(
                              "flex cursor-pointer items-center gap-4 rounded-sm border p-4 transition-colors",
                              selected
                                ? "border-gold bg-gold/5"
                                : "border-surface-line hover:border-fg-faint",
                            )}
                          >
                            <input
                              type="radio"
                              name="delivery"
                              value={option.id}
                              checked={selected}
                              onChange={() => setDeliveryId(option.id)}
                              className="h-4 w-4 accent-[var(--color-gold)]"
                            />
                            <Truck
                              className={cn(
                                "h-5 w-5 shrink-0",
                                selected ? "text-gold" : "text-fg-faint",
                              )}
                              strokeWidth={1.75}
                            />
                            <span className="flex-1">
                              <span className="block text-sm font-semibold text-fg">
                                {option.label}
                              </span>
                              <span className="block text-xs text-fg-muted">
                                {option.description}
                              </span>
                            </span>
                            <span className="text-sm font-semibold text-fg">
                              {option.price === 0
                                ? "Free"
                                : formatNaira(option.price)}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    <AnimatePresence initial={false}>
                      {needsAddress && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                              <Field
                                id="address"
                                label="Delivery address"
                                value={form.address}
                                error={errors.address}
                                autoComplete="street-address"
                                onChange={handleChange}
                              />
                            </div>
                            <Field
                              id="city"
                              label="City"
                              value={form.city}
                              error={errors.city}
                              autoComplete="address-level2"
                              onChange={handleChange}
                            />
                            <Field
                              id="state"
                              label="State"
                              value={form.state}
                              error={errors.state}
                              autoComplete="address-level1"
                              onChange={handleChange}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>

                  <section aria-labelledby="payment-heading">
                    <h2
                      id="payment-heading"
                      className="font-display text-xl font-medium text-fg"
                    >
                      Payment method
                    </h2>
                    <div
                      className="mt-5 space-y-3"
                      role="radiogroup"
                      aria-labelledby="payment-heading"
                    >
                      {(
                        [
                          {
                            id: "online",
                            label: "Pay online",
                            description: "Card, bank transfer or USSD",
                            icon: CreditCard,
                          },
                          {
                            id: "delivery",
                            label: "Pay on delivery",
                            description: "Pay when your order arrives",
                            icon: Wallet,
                          },
                        ] as const
                      ).map((method) => {
                        const selected = method.id === payment;
                        const Icon = method.icon;
                        return (
                          <label
                            key={method.id}
                            className={cn(
                              "flex cursor-pointer items-center gap-4 rounded-sm border p-4 transition-colors",
                              selected
                                ? "border-gold bg-gold/5"
                                : "border-surface-line hover:border-fg-faint",
                            )}
                          >
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={selected}
                              onChange={() => setPayment(method.id)}
                              className="h-4 w-4 accent-[var(--color-gold)]"
                            />
                            <Icon
                              className={cn(
                                "h-5 w-5 shrink-0",
                                selected ? "text-gold" : "text-fg-faint",
                              )}
                              strokeWidth={1.75}
                            />
                            <span className="flex-1">
                              <span className="block text-sm font-semibold text-fg">
                                {method.label}
                              </span>
                              <span className="block text-xs text-fg-muted">
                                {method.description}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <p className="mt-3 flex items-start gap-2 text-xs text-fg-muted">
                      <ShieldCheck
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                        strokeWidth={2}
                      />
                      We never ask for card details on this page. Online
                      payments will be handled by a secure payment partner.
                    </p>
                  </section>
                </div>

                <aside
                  className="lg:sticky lg:top-24 lg:self-start"
                  aria-labelledby="summary-heading"
                >
                  <div className="rounded-sm border border-surface-line bg-surface-alt/50 p-6">
                    <h2
                      id="summary-heading"
                      className="font-display text-xl font-medium text-fg"
                    >
                      Order summary
                    </h2>
                    <ul className="mt-5 divide-y divide-surface-line">
                      {items.map(({ book, quantity }) => (
                        <li
                          key={book.id}
                          className="flex gap-3 py-3.5 first:pt-0"
                        >
                          <div
                            className="h-14 w-10 shrink-0 rounded-[2px]"
                            style={{
                              background: `linear-gradient(155deg, ${book.coverPalette[0]} 0%, ${book.coverPalette[1]} 130%)`,
                            }}
                            aria-hidden="true"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 text-sm font-medium leading-snug text-fg">
                              {book.title}
                            </p>
                            <p className="mt-0.5 text-xs text-fg-muted">
                              Qty {quantity}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-fg">
                            {formatNaira(book.price * quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-5 space-y-2.5 border-t border-surface-line pt-5 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-fg-muted">
                          Subtotal ({itemCount}{" "}
                          {itemCount === 1 ? "item" : "items"})
                        </dt>
                        <dd className="font-medium text-fg">
                          {formatNaira(subtotal)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-fg-muted">Delivery</dt>
                        <dd className="font-medium text-fg">
                          {deliveryFee === 0
                            ? "Free"
                            : formatNaira(deliveryFee)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between border-t border-surface-line pt-3">
                        <dt className="font-display text-base text-fg">
                          Total
                        </dt>
                        <dd className="font-display text-2xl font-medium text-fg">
                          {formatNaira(total)}
                        </dd>
                      </div>
                    </dl>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      className="mt-6"
                      disabled={status === "processing"}
                      icon={
                        status === "processing" ? (
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            strokeWidth={2}
                          />
                        ) : (
                          <Lock className="h-4 w-4" strokeWidth={2} />
                        )
                      }
                      iconPosition="left"
                    >
                      {status === "processing"
                        ? "Processing..."
                        : payment === "online"
                          ? `Pay ${formatNaira(total)}`
                          : "Place Order"}
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        closeCheckout();
                        openCart();
                      }}
                      className="mt-3 w-full text-center text-xs text-fg-muted transition-colors hover:text-fg"
                    >
                      Edit cart
                    </button>
                  </div>
                </aside>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
