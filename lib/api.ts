const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3003";

export interface CheckResult {
  id: string;
  description: string;
  status: "pass" | "fail" | "warn";
  message?: string;
  specRef: string;
}

export interface ConformanceReport {
  homeDomain: string;
  anchorQuoteServer?: string;
  results: CheckResult[];
}

export interface RegistryEntry {
  domain: string;
  passed: boolean;
  resultHash: string;
  checkedAt: string;
  txHash: string;
  report: ConformanceReport;
}

export interface RegistryListItem {
  domain: string;
  passed: boolean;
  checkedAt: string;
  txHash: string;
}

export class ApiError extends Error {}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error ?? `Request failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function runCheck(domain: string): Promise<RegistryEntry> {
  return fetch(`${API_URL}/api/checks`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ domain }),
  }).then((res) => handle<RegistryEntry>(res));
}

export function listRegistry(): Promise<RegistryListItem[]> {
  return fetch(`${API_URL}/api/registry`).then((res) => handle<RegistryListItem[]>(res));
}

export function getStoredCheck(domain: string): Promise<RegistryEntry> {
  return fetch(`${API_URL}/api/checks/${encodeURIComponent(domain)}`).then((res) =>
    handle<RegistryEntry>(res),
  );
}
