import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center px-6 text-center">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.14em] text-accent">
          404
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
          This page got dealt out.
        </h1>
        <p className="mt-4 text-ink-soft">
          The link’s broken or the page moved. Let’s get you back.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          ← Back home
        </Link>
      </div>
    </main>
  );
}
