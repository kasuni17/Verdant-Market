import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export function AccountProfile() {
  const { user } = useAuth();
  const { push } = useToast();
  const [name, setName] = useState(user!.name);
  const [email, setEmail] = useState(user!.email);
  const [phone, setPhone] = useState(user!.phone ?? "");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    push("Profile updated");
  };

  return (
    <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-charcoal-900">Personal Information</h2>
      <form onSubmit={save} className="grid max-w-lg gap-3">
        <label className="text-sm font-medium text-charcoal-700">
          Full name
          <input value={name} onChange={(e) => setName(e.target.value)} className="input-field mt-1 w-full" />
        </label>
        <label className="text-sm font-medium text-charcoal-700">
          Email address
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field mt-1 w-full" />
        </label>
        <label className="text-sm font-medium text-charcoal-700">
          Phone number
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field mt-1 w-full" />
        </label>
        <button type="submit" className="mt-2 w-fit rounded-full bg-fern-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-fern-800">
          Save Changes
        </button>
      </form>
    </div>
  );
}
