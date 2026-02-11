import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const cardIcon = {
  books: (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 19.5h12.75M4.5 4.5h12.75m-12.75 15V4.5a2.25 2.25 0 0 1 2.25-2.25h8.25a2.25 2.25 0 0 1 2.25 2.25v15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 19.5Z"
      />
    </svg>
  ),
  users: (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.127a9.5 9.5 0 0 1 6.5 2.373M2.5 21.5a9.5 9.5 0 0 1 12.5-2.373M15 11.5A4 4 0 1 0 7 11.5a4 4 0 0 0 8 0Z"
      />
    </svg>
  ),
  activity: (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 12h4l2.5 6 4-12 2.5 6h3"
      />
    </svg>
  ),
  availability: (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6l3 3m5-3a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
      />
    </svg>
  ),
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard load error:", err));
  }, []);

  const cards = useMemo(() => {
    if (!stats) return [];
    return [
      {
        title: "Total Books",
        value: stats.totalBooks,
        accent: "from-blue-500 to-indigo-500",
        icon: cardIcon.books,
      },
      {
        title: "Total Students",
        value: stats.totalStudents,
        accent: "from-emerald-500 to-teal-500",
        icon: cardIcon.users,
      },
      {
        title: "Active Issued Books",
        value: stats.activeIssuedBooks,
        accent: "from-amber-500 to-orange-500",
        icon: cardIcon.activity,
      },
      {
        title: "Available Copies",
        value: stats.availableCopies,
        accent: "from-sky-500 to-cyan-500",
        icon: cardIcon.availability,
      },
    ];
  }, [stats]);

  const loadingSkeleton = (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="h-28 animate-pulse rounded-2xl bg-white shadow-sm"
        >
          <div className="h-full w-full rounded-2xl bg-linear-to-br from-slate-100 to-slate-50" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-6 sm:p-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-600 via-blue-600 to-sky-500 p-6 sm:p-8 text-white shadow-xl">
          <div className="absolute inset-0 opacity-20 mix-blend-soft-light">
            <div className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-sky-200 blur-3xl" />
          </div>

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                Overview
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
              Get quick insight into library health, inventory, members, and book activity at a glance.
              </p>
            </div>

            {/* <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                  Availability
                </p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-3xl font-semibold">
                    {stats ? `${availabilityPct}%` : "--"}
                  </span>
                  <span className="text-xs text-white/80">on-shelf</span>
                </div>
              </div>
              <div className="hidden sm:block rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur">
                Updated just now
              </div>
            </div> */}
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Key Metrics
                </h2>
                <p className="text-sm text-slate-500">
                  Snapshot of library performance today.
                </p>
              </div>
            </div>

            {stats ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                  <div
                    key={card.title}
                    className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-white to-slate-50 p-px shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div
                      className={`absolute inset-0 -z-10 bg-linear-to-br ${card.accent} opacity-0 blur-2xl transition group-hover:opacity-60`}
                    />
                    <div
                      className={`flex h-full flex-col justify-between gap-4 rounded-2xl bg-white/95 p-4 sm:p-5`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                            {card.title}
                          </p>
                          <p className="mt-2 text-3xl font-semibold text-slate-900">
                            {card.value}
                          </p>
                        </div>
                        <div
                          className={`rounded-xl bg-linear-to-br ${card.accent} p-3 text-white shadow-inner shadow-slate-200`}
                        >
                          {card.icon}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        Updated in real time
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              loadingSkeleton
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
