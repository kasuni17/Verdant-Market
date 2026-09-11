import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { StaticPage } from "../components/StaticPage";
import { useToast } from "../context/ToastContext";

export function Contact() {
  const [sent, setSent] = useState(false);
  const { push } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    push("Message sent", "Our team will get back to you shortly.");
  };

  return (
    <StaticPage eyebrow="We're here to help" title="Contact Us">
      <div className="mb-2 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-fern-700" /> +1 (800) 555-0173</div>
        <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-fern-700" /> support@verdantmarket.example</div>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-fern-700" /> Support available daily</div>
      </div>
      {sent ? (
        <p className="rounded-xl bg-fern-50 p-4 text-fern-800">Thanks for reaching out, we'll respond within one business day.</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input required placeholder="Full name" className="input-field" />
          <input required type="email" placeholder="Email address" className="input-field" />
          <textarea required rows={4} placeholder="How can we help?" className="input-field resize-none" />
          <button type="submit" className="w-fit rounded-full bg-fern-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-fern-800">
            Send Message
          </button>
        </form>
      )}
    </StaticPage>
  );
}
