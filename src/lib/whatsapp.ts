import { OFFERS, SITE, type OfferQty } from "@/data/site";
import type { Product } from "@/data/products";

export type OrderDetails = {
  product: Product;
  qty: OfferQty;
  governorate: string;
  address: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  /** Absolute URL of the product photo, so WhatsApp can show a preview. */
  imageUrl: string;
};

export function formatUsd(amount: number) {
  return `${amount}${SITE.currency}`;
}

export function buildOrderMessage(order: OrderDetails) {
  const offer = OFFERS.find((o) => o.qty === order.qty) ?? OFFERS[0];
  const lines = [
    `Hello Fofi 👋`,
    `I would like to order the following:`,
    ``,
    `🧥 Product: ${order.product.name}`,
    `🎨 Colour: ${order.product.color}`,
    `🔢 Quantity: ${offer.label}`,
    `💵 Total: ${formatUsd(offer.total)}`,
    `🖼️ Product photo: ${order.imageUrl}`,
    ``,
    `📍 Delivery area: ${order.governorate}`,
    `🏠 Address: ${order.address}`,
    ``,
    `👤 Name: ${order.customerName}`,
    `📞 Phone: ${order.customerPhone}`,
  ];

  if (order.notes.trim()) {
    lines.push(`📝 Notes: ${order.notes.trim()}`);
  }

  return lines.join("\n");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function whatsappGreetingUrl(text = "Hi Fofi, I have a question.") {
  return whatsappUrl(text);
}
