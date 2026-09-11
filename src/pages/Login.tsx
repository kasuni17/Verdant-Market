import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "admin">("customer");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    navigate(role === "admin" ? "/admin" : "/account");
  };

  return (
    <div className="container-shell flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-md rounded-2xl border border-charcoal-100 bg-white p-8 shadow-card">
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Welcome back</h1>
        <p className="mt-1 text-sm text-charcoal-500">Sign in to continue to Verdant Market.</p>

        <div className="mt-6 flex rounded-full border border-charcoal-200 p-1">
          {(["customer", "admin"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 rounded-full py-2 text-sm font-semibold capitalize ${role === r ? "bg-fern-700 text-white" : "text-charcoal-600"}`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={role === "admin" ? "admin@example.com" : "you@example.com"}
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
          />
          <button type="submit" className="mt-2 rounded-full bg-fern-700 py-3 text-sm font-semibold text-white hover:bg-fern-800">
            Sign In
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-charcoal-400">
          Demo authentication, enter any email/password to continue as {role}.
        </p>
        <p className="mt-5 text-center text-sm text-charcoal-500">
          Don't have an account? <Link to="/signup" className="font-semibold text-fern-700 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
