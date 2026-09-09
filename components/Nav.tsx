import Link from "next/link";

export function Nav() {
  return (
    <header className="mx-auto w-full max-w-3xl px-6 pt-8">
      <nav className="glass sweep flex items-center justify-between px-6 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          sep38-conformance
        </Link>
        <div className="flex items-center gap-5 text-sm text-muted">
          <Link href="/" className="hover:text-ink transition-colors">
            Check
          </Link>
          <Link href="/registry" className="hover:text-ink transition-colors">
            Registry
          </Link>
          <a
            href="https://github.com/RFQLint"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink transition-colors"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
