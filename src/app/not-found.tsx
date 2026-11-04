import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[100svh] items-center justify-center px-6 text-center">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.14em] text-accent">404</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-semibold tracking-[-0.045em]">
          This page got <span className="serif-accent">dealt out.</span>
        </h1>
        <p className="mt-4 text-ink-soft">The link’s broken or the page moved. Let’s get you back to the table.</p>
        <Link href="/" className="btn btn-primary mt-8">
          ← Back home
        </Link>
      </div>
    </main>
  );
}
