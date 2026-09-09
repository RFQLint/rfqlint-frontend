import { Nav } from "@/components/Nav";
import { CheckForm } from "@/components/CheckForm";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Is this quote server SEP-38 conformant?
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Enter an anchor&apos;s home domain to check its stellar.toml and
          SEP-38 <code className="text-sm">/info</code>,{" "}
          <code className="text-sm">/prices</code>, and{" "}
          <code className="text-sm">/price</code> endpoints against the
          spec. A passing check is published as an on-chain attestation,
          so anyone can verify the result later without trusting this site.
        </p>

        <div className="mt-10">
          <CheckForm />
        </div>
      </main>
    </>
  );
}
