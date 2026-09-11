import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name, email);
    navigate("/account");
  };

  return (
    <div className="container-shell flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-md rounded-2xl border border-charcoal-100 bg-white p-8 shadow-card">
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Create your account</h1>
        <p className="mt-1 text-sm text-charcoal-500">Join Verdant Market for faster checkout and personalized offers.</p>

        <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="input-field" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="input-field" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-field" />
          <button type="submit" className="mt-2 rounded-full bg-fern-700 py-3 text-sm font-semibold text-white hover:bg-fern-800">
            Create Account
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-charcoal-400">Demo authentication, no verification required.</p>
        <p className="mt-5 text-center text-sm text-charcoal-500">
          Already have an account? <Link to="/login" className="font-semibold text-fern-700 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
