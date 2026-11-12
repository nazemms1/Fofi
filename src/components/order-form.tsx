"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { AnimatedNumber } from "@/components/animated-number";
import type { Product } from "@/data/products";
import { GOVERNORATES, OFFERS, SITE, type OfferQty } from "@/data/site";
import { buildOrderMessage, whatsappUrl } from "@/lib/whatsapp";

type FieldName = "governorate" | "address" | "name" | "phone";
type Errors = Partial<Record<FieldName, string>>;

function validate(values: {
  governorate: string;
  address: string;
  name: string;
  phone: string;
}): Errors {
  const errors: Errors = {};

  if (!values.governorate) {
    errors.governorate = "Please select a delivery area";
  }
  if (values.address.trim().length < 6) {
    errors.address =
      "Please write your full address: area, street, nearest landmark";
  }
  if (values.name.trim().length < 3) {
    errors.name = "Please enter your full name";
  }
  const digits = values.phone.replace(/[\s\-()]/g, "");
  if (!/^\+?\d{9,15}$/.test(digits)) {
    errors.phone = "Enter a valid phone number, e.g. +963 988 263 745";
  }
  return errors;
}

const FIELD_ORDER: FieldName[] = ["governorate", "address", "name", "phone"];

export function OrderForm({ product }: { product: Product }) {
  const [qty, setQty] = useState<OfferQty>(1);
  const [governorate, setGovernorate] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  const offer = OFFERS.find((o) => o.qty === qty) ?? OFFERS[0];

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate({ governorate, address, name, phone });
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }

    const imageUrl = `${window.location.origin}${product.image}`;
    const message = buildOrderMessage({
      product,
      qty,
      governorate,
      address: address.trim(),
      customerName: name.trim(),
      customerPhone: phone.trim(),
      notes,
      imageUrl,
    });

    const link = whatsappUrl(message);
    setWhatsappLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  function fieldProps(name: FieldName) {
    const error = errors[name];
    return {
      id: `field-${name}`,
      "aria-invalid": error ? (true as const) : undefined,
      "aria-describedby": error ? `error-${name}` : undefined,
    };
  }

  return (
    <>
      <form
        id="order-form"
        onSubmit={onSubmit}
        noValidate
        className="mt-8 space-y-8"
      >
        {/* 1: quantity & offer */}
        <fieldset className="space-y-4">
          <legend className="flex items-center gap-3 text-lg font-black">
            <StepBadge>1</StepBadge>
            Choose quantity and offer
          </legend>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {OFFERS.map((o) => {
              const selected = o.qty === qty;
              return (
                <label
                  key={o.qty}
                  className="group relative block cursor-pointer"
                >
                  <input
                    type="radio"
                    name="qty"
                    value={o.qty}
                    checked={selected}
                    onChange={() => setQty(o.qty)}
                    className="peer sr-only"
                  />
                  <span
                    className={`isolate relative flex h-full flex-col gap-1 rounded-2xl border-[1.5px] p-3 transition-colors duration-300 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sage-deep sm:p-4 ${
                      selected
                        ? "border-ink text-bg"
                        : "border-line bg-surface hover:-translate-y-0.5 hover:border-sage-deep"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="qty-highlight"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-2xl bg-ink shadow-lg shadow-ink/20"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="text-xs font-bold opacity-80 sm:text-sm">
                      {o.label}
                    </span>
                    <span className="font-display text-2xl font-black leading-none sm:text-3xl">
                      {SITE.currency}
                      {o.total}
                    </span>
                    <span
                      className={`mt-1 text-[0.7rem] font-bold leading-tight sm:text-xs ${
                        selected ? "text-yellow" : "text-sage-deep"
                      }`}
                    >
                      {o.note}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* 2: delivery location */}
        <fieldset className="space-y-4">
          <legend className="flex items-center gap-3 text-lg font-black">
            <StepBadge>2</StepBadge>
            Delivery area
          </legend>

          <div>
            <label
              htmlFor="field-governorate"
              className="mb-2 block text-sm font-bold"
            >
              Governorate
            </label>
            <div className="relative">
              <select
                {...fieldProps("governorate")}
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="field appearance-none pe-12"
              >
                <option value="">Select your governorate</option>
                {GOVERNORATES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-ink"
              />
            </div>
            <FieldError id="error-governorate" message={errors.governorate} />
          </div>

          <div>
            <label
              htmlFor="field-address"
              className="mb-2 block text-sm font-bold"
            >
              Full address
            </label>
            <textarea
              {...fieldProps("address")}
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Area, street, nearest landmark"
              autoComplete="street-address"
              className="field resize-none"
            />
            <FieldError id="error-address" message={errors.address} />
          </div>
        </fieldset>

        {/* 3: customer info */}
        <fieldset className="space-y-4">
          <legend className="flex items-center gap-3 text-lg font-black">
            <StepBadge>3</StepBadge>
            Your details
          </legend>

          <div>
            <label
              htmlFor="field-name"
              className="mb-2 block text-sm font-bold"
            >
              Full name
            </label>
            <input
              {...fieldProps("name")}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              autoComplete="name"
              className="field"
            />
            <FieldError id="error-name" message={errors.name} />
          </div>

          <div>
            <label
              htmlFor="field-phone"
              className="mb-2 block text-sm font-bold"
            >
              Phone number{" "}
              <span className="font-normal text-muted">(WhatsApp)</span>
            </label>
            <input
              {...fieldProps("phone")}
              type="tel"
              inputMode="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+963 9XX XXX XXX"
              autoComplete="tel"
              className="field text-start"
            />
            <FieldError id="error-phone" message={errors.phone} />
          </div>

          <div>
            <label
              htmlFor="field-notes"
              className="mb-2 block text-sm font-bold"
            >
              Notes <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="field-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. please call before delivery"
              className="field resize-none"
            />
          </div>
        </fieldset>

        {/* summary + submit (desktop & tablet) */}
        <div className="rounded-[2rem] bg-ink p-6 text-bg md:p-8">
          <p className="text-sm font-bold tracking-wide text-yellow">
            Order summary
          </p>
          <dl className="mt-5 space-y-3 text-[0.98rem]">
            <SummaryRow label="Product" value={product.name} />
            <SummaryRow label="Colour" value={product.color} />
            <SummaryRow label="Quantity" value={offer.label} />
            <SummaryRow
              label="Delivery"
              value={governorate || "Not selected yet"}
            />
          </dl>

          <div className="mt-6 flex items-end justify-between border-t border-bg/15 pt-6">
            <span className="text-sm font-bold text-bg/70">Total</span>
            <span className="font-display text-5xl font-black leading-none">
              {SITE.currency}
              <AnimatedNumber value={offer.total} />
            </span>
          </div>

          <button
            type="submit"
            className="btn btn-whatsapp mt-6 w-full py-4 text-lg"
          >
            <MessageCircle className="size-5" />
            Send order on WhatsApp
          </button>
          <p className="mt-4 text-center text-xs leading-6 text-bg/60">
            WhatsApp opens with a ready message containing your order details
            and product photo. Tap send in WhatsApp to complete the order.
          </p>

          {whatsappLink && (
            <div role="status" className="mt-6 rounded-2xl bg-bg/10 p-4">
              <p className="flex items-center gap-2 font-bold text-yellow">
                <CheckCircle2 className="size-5" />
                Your order is ready
              </p>
              <p className="mt-2 text-sm leading-7 text-bg/80">
                If the chat did not open automatically, tap the button below.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-bold text-bg underline underline-offset-4 hover:text-yellow"
              >
                Open the chat on WhatsApp
                <ExternalLink className="size-4" />
              </a>
            </div>
          )}
        </div>
      </form>

      {/* mobile sticky order bar */}
      <motion.div
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 24 }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-4 py-3 shadow-[0_-10px_30px_-18px_rgb(20_23_26/0.5)] backdrop-blur-md md:hidden"
      >
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-muted">
              Total · {offer.label}
            </p>
            <p className="font-display text-2xl font-black leading-none">
              {SITE.currency}
              <AnimatedNumber value={offer.total} />
            </p>
          </div>
          <button
            type="submit"
            form="order-form"
            className="btn btn-whatsapp py-3.5"
          >
            <MessageCircle className="size-5" />
            Send on WhatsApp
          </button>
        </div>
      </motion.div>
    </>
  );
}

function StepBadge({ children }: { children: ReactNode }) {
  return (
    <span className="font-display grid size-8 shrink-0 place-items-center rounded-full bg-yellow text-base font-black text-ink">
      {children}
    </span>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-bg/65">{label}</dt>
      <dd className="text-end font-bold">{value}</dd>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-bold text-[#c0392b]">
      {message}
    </p>
  );
}
