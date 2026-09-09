import type { ConformanceReport } from "@/lib/api";

const STATUS_STYLE: Record<string, string> = {
  pass: "text-pass",
  fail: "text-fail",
  warn: "text-muted",
};

const STATUS_ICON: Record<string, string> = {
  pass: "✔",
  fail: "✘",
  warn: "⚠",
};

export function ReportView({ report }: { report: ConformanceReport }) {
  const passed = report.results.length > 0 && report.results.every((r) => r.status !== "fail");

  return (
    <div className="glass-strong p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold break-all">{report.homeDomain}</h2>
        <span
          className={`pill px-3 py-1 text-xs font-medium ${
            passed ? "bg-pass/15 text-pass" : "bg-fail/15 text-fail"
          }`}
        >
          {passed ? "Conformant" : "Not conformant"}
        </span>
      </div>
      {report.anchorQuoteServer && (
        <p className="mt-1 text-sm text-muted break-all">{report.anchorQuoteServer}</p>
      )}

      <ul className="mt-5 space-y-2">
        {report.results.map((r) => (
          <li key={r.id} className="flex items-start gap-3 text-sm">
            <span className={`mt-0.5 ${STATUS_STYLE[r.status]}`} aria-hidden="true">
              {STATUS_ICON[r.status]}
            </span>
            <div>
              <p>{r.description}</p>
              {r.message && <p className="text-muted">{r.message}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
