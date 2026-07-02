import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f7f5f2] px-6">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Error 404
        </p>

        <h1 className="mt-4 text-6xl font-bold text-neutral-900 md:text-7xl">
          Page Not Found
        </h1>

        <p className="mt-6 text-neutral-500 leading-7">
          Sorry, the page you're looking for doesn't exist, has been moved, or
          the URL is incorrect.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="rounded-full bg-primary px-8 py-3 font-medium text-white transition hover:opacity-90"
          >
            Back to Home
          </Link>

          <Link
            to="/collections"
            className="rounded-full border border-neutral-300 px-8 py-3 font-medium transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>

     
      </div>
    </section>
  );
};

export default NotFoundPage;
