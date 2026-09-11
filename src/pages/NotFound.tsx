import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="container-shell flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="font-display text-6xl font-semibold text-fern-700">404</p>
      <h1 className="text-xl font-semibold text-charcoal-900">Page not found</h1>
      <p className="max-w-sm text-sm text-charcoal-500">The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/" className="rounded-full bg-fern-700 px-6 py-3 text-sm font-semibold text-white hover:bg-fern-800">
        Back to Home
      </Link>
    </div>
  );
}
