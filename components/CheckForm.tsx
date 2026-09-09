"use client";

import { useState, type FormEvent } from "react";
import { runCheck, ApiError, type RegistryEntry } from "@/lib/api";
import { ReportView } from "@/components/ReportView";

export function CheckForm() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entry, setEntry] = useState<RegistryEntry | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setEntry(null);
    try {
      const result = await runCheck(domain.trim());
      setEntry(result);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong reaching the checker.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="glass sweep flex items-center gap-2 p-2">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="anchor domain, e.g. testanchor.stellar.org"
          className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="pill glass-strong sweep px-6 py-3 text-sm font-medium transition-opacity disabled:opacity-50"
        >
          {loading ? "Checking…" : "Check"}
        </button>
      </form>

      {error && (
        <div className="glass border-fail/40 p-4 text-sm text-fail">{error}</div>
      )}

      {entry && (
        <div className="space-y-3">
          <ReportView report={entry.report} />
          {entry.txHash && (
            <p className="px-2 text-xs text-muted">
              Attestation published on-chain:{" "}
              <a
                className="underline hover:text-ink"
                href={`https://stellar.expert/explorer/testnet/tx/${entry.txHash}`}
                target="_blank"
                rel="noreferrer"
              >
                view transaction
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
