import { WhatsAppIcon } from "@/components/icons";
import { whatsappGreetingUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappGreetingUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="wa-pulse fixed bottom-24 end-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-xl shadow-ink/25 transition-transform hover:scale-105 md:bottom-7 md:end-7 md:size-16"
    >
      <WhatsAppIcon className="size-7 md:size-8" />
    </a>
  );
}
