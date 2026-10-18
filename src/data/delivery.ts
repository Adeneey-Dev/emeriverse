import type { DeliveryOption } from "../types";

export const deliveryOptions: DeliveryOption[] = [
  {
    id: "standard",
    label: "Standard Delivery",
    description: "3-5 business days, nationwide",
    price: 1500,
  },
  {
    id: "express",
    label: "Express Delivery",
    description: "1-2 business days, major cities",
    price: 3500,
  },
  {
    id: "pickup",
    label: "Self Pickup",
    description: "Collect from our partner location in Lagos",
    price: 0,
  },
];
