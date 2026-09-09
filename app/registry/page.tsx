"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { listRegistry, ApiError, type RegistryListItem } from "@/lib/api";

export default function RegistryPage() {
  const [entries, setEntries] = useState<RegistryListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listRegistry()
      .then(setEntries)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Could not reach the registry."));
  }, []);

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Verified quote servers</h1>
        <p className="mt-3 max-w-xl text-muted">
          Every anchor checked here, with pass/fail and the on-chain
          attestation transaction where one exists.
        </p>

        <div className="mt-10 space-y-3">
          {error && <div className="glass border-fail/40 p-4 text-sm text-fail">{error}</div>}

          {!error && entries === null && <p className="text-muted">Loading…</p>}

          {entries?.length === 0 && <p className="text-muted">No domains checked yet.</p>}

          {entries?.map((entry) => (
            <div
              key={entry.domain}
              className="glass sweep flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{entry.domain}</p>
                <p className="text-xs text-muted">{new Date(entry.checkedAt).toLocaleString()}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`pill px-3 py-1 text-xs font-medium ${
                    entry.passed ? "bg-pass/15 text-pass" : "bg-fail/15 text-fail"
                  }`}
                >
                  {entry.passed ? "Conformant" : "Not conformant"}
                </span>
                {entry.txHash && (
                  <a
                    className="text-xs underline text-muted hover:text-ink"
                    href={`https://stellar.expert/explorer/testnet/tx/${entry.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    tx
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
