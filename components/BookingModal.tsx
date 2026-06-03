"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Pricing ─────────────────────────────────────────────── */
const PRICE_PER_SEAT = 35; // SGD commitment fee / guest
const STORE_CREDIT = 20; // SGD credited back / guest
const MAX_DAYS = 2; // "You can select up to 2 days."
const MAX_GUESTS = 10;

/* ─── Sessions / availability data ───────────────────────── */
type SessionSlot = { id: string; time: string; seats: number };
type Day = {
  id: string;
  short: string; // "Fri, 1 May"
  long: string; // "Friday, 1 May 2026"
  fullyBooked?: boolean;
  sessions: SessionSlot[];
};

const DAYS: Day[] = [
  {
    id: "fri-1",
    short: "Fri, 1 May",
    long: "Friday, 1 May 2026",
    sessions: [
      { id: "fri-1-a", time: "02:00 PM – 04:00 PM", seats: 12 },
      { id: "fri-1-b", time: "05:30 PM – 07:30 PM", seats: 0 },
      { id: "fri-1-c", time: "08:00 PM – 10:00 PM", seats: 1 },
    ],
  },
  {
    id: "sat-2",
    short: "Sat, 2 May",
    long: "Saturday, 2 May 2026",
    fullyBooked: true,
    sessions: [],
  },
  {
    id: "sun-3",
    short: "Sun, 3 May",
    long: "Sunday, 3 May 2026",
    sessions: [
      { id: "sun-3-a", time: "10:00 AM – 12:00 PM", seats: 12 },
      { id: "sun-3-b", time: "05:30 PM – 07:30 PM", seats: 0 },
      { id: "sun-3-c", time: "08:00 PM – 10:00 PM", seats: 6 },
    ],
  },
  {
    id: "fri-8",
    short: "Fri, 8 May",
    long: "Friday, 8 May 2026",
    sessions: [
      { id: "fri-8-a", time: "02:00 PM – 04:00 PM", seats: 8 },
      { id: "fri-8-b", time: "07:00 PM – 09:00 PM", seats: 14 },
    ],
  },
];

const seatsLeftForDay = (d: Day) => d.sessions.reduce((n, s) => n + s.seats, 0);
const openSessions = (d: Day) => d.sessions.filter((s) => s.seats > 0).length;
const findDay = (id: string) => DAYS.find((d) => d.id === id);
const findSession = (id?: string) =>
  DAYS.flatMap((d) => d.sessions).find((s) => s.id === id);

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/* ─── Small inline icons ─────────────────────────────────── */
const I = {
  close: (p: { className?: string }) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
    </svg>
  ),
  minus: (p: { className?: string }) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><line x1="3" y1="7" x2="11" y2="7" /></svg>
  ),
  plus: (p: { className?: string }) => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><line x1="7" y1="3" x2="7" y2="11" /><line x1="3" y1="7" x2="11" y2="7" /></svg>
  ),
  chevron: (p: { className?: string }) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="4 6 8 10 12 6" /></svg>
  ),
  clock: (p: { className?: string }) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="8" cy="8" r="6" /><polyline points="8 4.5 8 8 10.5 9.5" /></svg>
  ),
  users: (p: { className?: string }) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="6" cy="5" r="2.4" /><path d="M2 13c0-2.2 1.8-3.6 4-3.6s4 1.4 4 3.6" /><path d="M11 3.2a2.4 2.4 0 0 1 0 4.6M11.5 9.6c1.6.3 2.8 1.5 2.8 3.4" /></svg>
  ),
  calendar: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="8" y1="2.5" x2="8" y2="6" /><line x1="16" y1="2.5" x2="16" y2="6" /></svg>
  ),
  glass: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 3h10l-1 6a4 4 0 0 1-8 0L7 3Z" /><line x1="12" y1="13" x2="12" y2="20" /><line x1="8.5" y1="20" x2="15.5" y2="20" /></svg>
  ),
};

/* ─── Guest counter ──────────────────────────────────────── */
function Counter({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const btn =
    "flex size-9 items-center justify-center rounded-full bg-[#fbe7ea] text-accent transition-colors hover:bg-[#f6d4da] disabled:opacity-40 disabled:cursor-not-allowed";
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[#d8cdd0] px-2 py-1.5">
      <button type="button" aria-label="Decrease guests" disabled={value <= 1} onClick={() => onChange(Math.max(1, value - 1))} className={btn}>
        <I.minus className="size-3.5" />
      </button>
      <span className="w-6 text-center text-base font-semibold tabular-nums text-[#241619]">{value}</span>
      <button type="button" aria-label="Increase guests" disabled={value >= MAX_GUESTS} onClick={() => onChange(Math.min(MAX_GUESTS, value + 1))} className={btn}>
        <I.plus className="size-3.5" />
      </button>
    </div>
  );
}

/* ─── Session dropdown (custom, for seat labels + disabled) ── */
function SessionDropdown({
  day,
  value,
  guests,
  onSelect,
}: {
  day: Day;
  value?: string;
  guests: number;
  onSelect: (sessionId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = day.sessions.find((s) => s.id === value);
  const tooFew = selected && selected.seats > 0 && selected.seats < guests;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        data-open={open}
        onClick={() => setOpen((o) => !o)}
        className="field flex w-full items-center justify-between rounded-xl bg-white px-4 py-3.5 text-left text-[15px] outline-none"
      >
        <span className={selected ? "text-[#241619]" : "text-[#b3a9aa]"}>
          {selected ? selected.time : "Choose a session"}
        </span>
        <I.chevron className={`size-4 text-[#9a8e90] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-[#d8cdd0] bg-white shadow-[0_18px_40px_-12px_rgba(60,20,28,0.35)]">
          {day.sessions.map((s) => {
            const full = s.seats === 0;
            return (
              <button
                key={s.id}
                type="button"
                disabled={full}
                onClick={() => { onSelect(s.id); setOpen(false); }}
                className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-colors ${
                  full
                    ? "cursor-not-allowed bg-[#f6f3f4] text-[#b3adae]"
                    : "text-[#241619] hover:bg-[#fbeef1]"
                } ${s.id === value ? "bg-[#fbeef1]" : ""}`}
              >
                <span>{s.time}</span>
                <span className={full ? "text-[#b3adae]" : "text-accent"}>
                  {full ? "Fully booked" : `${s.seats} Seat${s.seats > 1 ? "s" : ""} left`}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {tooFew && (
        <p className="mt-2 rounded-lg bg-[#fdf6e3] px-3 py-2 text-xs leading-snug text-[#9a7a16]">
          Only {selected!.seats} seat{selected!.seats > 1 ? "s" : ""} available. Please reduce guest count or choose another session.
        </p>
      )}
    </div>
  );
}

/* ─── Price breakdown card ───────────────────────────────── */
function PriceBreakdown({ guests }: { guests: number }) {
  const subtotal = guests * PRICE_PER_SEAT;
  const credit = guests * STORE_CREDIT;
  return (
    <div className="rounded-2xl border border-[#ecc7ce] bg-[#fbeef1]">
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center justify-between text-[15px]">
          <span className="text-[#241619]">Total Guests</span>
          <span className="font-medium text-[#241619]">{guests} {guests > 1 ? "People" : "Person"}</span>
        </div>
        <div className="flex items-center justify-between text-[15px]">
          <span className="text-[#241619]">Subtotal ({guests} x ${PRICE_PER_SEAT})</span>
          <span className="text-accent">${subtotal}</span>
        </div>
      </div>
      <div className="border-t border-[#ecc7ce] p-5 pt-3.5">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-accent">Grand Total</span>
          <span className="font-semibold text-accent">${subtotal}</span>
        </div>
        <p className="mt-1 text-sm text-accent/90">${credit} will be credited back as store credit</p>
      </div>
    </div>
  );
}

/* ─── Field label + input ────────────────────────────────── */
const inputCls =
  "field w-full rounded-xl bg-white px-4 py-3.5 text-[15px] text-[#241619] placeholder-[#b3a9aa] outline-none";

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <label className="mb-2 block text-[15px] font-bold text-[#241619]">
      {children}
      {hint && <span className="ml-1.5 text-xs font-normal text-[#9a8e90]">{hint}</span>}
    </label>
  );
}

/* ─── Main component ─────────────────────────────────────── */
type View = "form" | "review" | "success";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("form");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // order = selection order
  const [sessionByDay, setSessionByDay] = useState<Record<string, string>>({});

  const reset = () => {
    setView("form");
    setName(""); setEmail(""); setPhone("");
    setGuests(2); setSelectedDays([]); setSessionByDay({});
  };

  /* hash-based open/close (#booking) */
  useEffect(() => {
    const onHash = () => {
      const open = window.location.hash === "#booking";
      setIsOpen(open);
      if (open) reset();
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* lock scroll + Escape to close */
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const close = () => {
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
    setIsOpen(false);
  };

  const toggleDay = (day: Day) => {
    if (day.fullyBooked) return;
    setSelectedDays((prev) => {
      if (prev.includes(day.id)) {
        setSessionByDay((m) => { const n = { ...m }; delete n[day.id]; return n; });
        return prev.filter((id) => id !== day.id);
      }
      if (prev.length >= MAX_DAYS) return prev; // cap at 2
      return [...prev, day.id];
    });
  };

  const chooseSession = (dayId: string, sessionId: string) =>
    setSessionByDay((m) => ({ ...m, [dayId]: sessionId }));

  /* validation */
  const contactValid = name.trim() !== "" && isEmail(email) && phone.trim() !== "";
  const daysValid =
    selectedDays.length >= 1 &&
    selectedDays.every((id) => {
      const sid = sessionByDay[id];
      const s = findSession(sid);
      return s && s.seats >= guests;
    });
  const canContinue = contactValid && daysValid;

  if (!isOpen) return null;

  /* ─── Success dialog (compact, centered) ─── */
  if (view === "success") {
    return (
      <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
        <div className="booking-panel relative w-full rounded-t-[28px] bg-white p-7 text-center sm:w-[92vw] sm:max-w-[420px] sm:rounded-3xl" style={{ animationFillMode: "both" }}>
          <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-gradient-to-b from-[#f6d7dc] to-[#fbeef1] text-accent">
            <I.glass className="size-9" />
          </div>
          <h2 className="text-xl font-bold text-[#241619]">Cheers! Your reservation is submitted</h2>
          <p className="mx-auto mt-2.5 max-w-[34ch] text-sm leading-relaxed text-[#7c6f71]">
            Thank you for reserving your wine tasting experience. We&apos;ve received your reservation, and our team will contact you shortly to confirm your attendance.
          </p>
          <button type="button" onClick={close} className="mt-6 w-full rounded-full bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-bold">
            Close
          </button>
        </div>
      </div>
    );
  }

  /* ─── Form + Review share the drawer/modal panel ─── */
  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end sm:items-center sm:justify-center">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

      <div
        className="booking-panel relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:max-h-[90dvh] sm:w-[92vw] sm:max-w-[600px] sm:rounded-3xl"
        style={{ animationFillMode: "both" }}
      >
        {/* mobile drag handle */}
        <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-black/10 sm:hidden" />

        {/* header */}
        <div className="flex shrink-0 items-start justify-between gap-4 px-6 pb-5 pt-5 sm:px-8">
          <div>
            <h2 className="text-[22px] font-bold leading-tight text-[#241619] sm:text-[26px]">
              {view === "form" ? "Reserve Your Wine Tasting Experience" : "Review Your Reservation"}
            </h2>
            <p className="mt-1 text-sm text-[#7c6f71]">
              {view === "form"
                ? "Please fill in your details below to reserve your seat"
                : "Please confirm your details before we send your request."}
            </p>
          </div>
          <button type="button" onClick={close} aria-label="Close" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fbe7ea] text-accent transition-colors hover:bg-[#f6d4da]">
            <I.close className="size-3.5" />
          </button>
        </div>

        <div className="h-px shrink-0 bg-[#e6dde0]" />

        {/* body (scrollable) */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {view === "form" ? (
            <div className="flex flex-col gap-6">
              {/* contact */}
              <div>
                <Label>Full Name</Label>
                <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
              </div>
              <div>
                <Label>Email</Label>
                <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              <div>
                <Label hint="(WhatsApp)">Phone Number</Label>
                <input type="tel" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +65 9XXX XXXX" />
              </div>

              {/* guests */}
              <div>
                <Label hint="(Including you)">Total Guests</Label>
                <Counter value={guests} onChange={setGuests} />
                <p className="mt-2 text-sm text-[#9a8e90]">Each guest requires a seat. Availability below reflects remaining seats.</p>
              </div>

              <div className="h-px bg-gradient-to-r from-accent/40 to-[#e6dde0]" />

              {/* select day */}
              <div>
                <h3 className="text-lg font-bold text-[#241619]">Select Day</h3>
                <p className="mb-3 mt-0.5 text-sm text-[#9a8e90]">You can select up to {MAX_DAYS} days.</p>
                <div className="no-scrollbar -mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-2 pt-2 sm:-mx-8 sm:px-8">
                  {DAYS.map((d) => {
                    const order = selectedDays.indexOf(d.id);
                    const selected = order !== -1;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        disabled={d.fullyBooked}
                        onClick={() => toggleDay(d)}
                        className={`relative w-[210px] shrink-0 snap-start rounded-2xl border-2 px-4 py-4 text-left transition-colors ${
                          d.fullyBooked
                            ? "cursor-not-allowed border-[#e3dbdd] bg-[#f4f1f2]"
                            : selected
                            ? "border-accent bg-white shadow-[0_4px_14px_-6px_rgba(200,110,122,0.5)]"
                            : "border-[#d8cdd0] bg-white hover:border-[#c4b6ba]"
                        }`}
                      >
                        {selected && (
                          <span className="absolute -left-2 -top-2 grid size-6 place-items-center rounded-full bg-accent text-xs font-semibold text-white">
                            {order + 1}
                          </span>
                        )}
                        <p className={`text-[17px] font-bold ${d.fullyBooked ? "text-[#b3adae]" : "text-[#241619]"}`}>{d.short}</p>
                        {d.fullyBooked ? (
                          <p className="mt-1.5 text-sm text-[#b3adae]">Full Booked</p>
                        ) : (
                          <div className="mt-2 flex items-center gap-2 whitespace-nowrap text-[13px] text-accent">
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><I.clock className="size-3.5 shrink-0" />{openSessions(d)} Session{openSessions(d) > 1 ? "s" : ""}</span>
                            <span className="text-[#e0d4d6]">|</span>
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><I.users className="size-3.5 shrink-0" />{seatsLeftForDay(d)} Seats</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* select session */}
              <div>
                <h3 className="mb-3 text-lg font-bold text-[#241619]">Select Session</h3>
                {selectedDays.length === 0 ? (
                  <div className="grid place-items-center gap-2 rounded-2xl border border-dashed border-[#cfc3c7] py-10 text-center">
                    <I.calendar className="size-7 text-accent/60" />
                    <p className="text-sm text-[#9a8e90]">Please select a day to see available sessions</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {selectedDays.map((id, idx) => {
                      const day = findDay(id)!;
                      return (
                        <div key={id} className="rounded-2xl border border-[#d8cdd0] p-4">
                          <div className="mb-3 flex items-center gap-2.5">
                            <span className="grid size-6 place-items-center rounded-full bg-accent text-xs font-semibold text-white">{idx + 1}</span>
                            <p className="font-bold text-[#241619]">{day.long}</p>
                          </div>
                          <SessionDropdown day={day} value={sessionByDay[id]} guests={guests} onSelect={(sid) => chooseSession(id, sid)} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="h-px bg-[#e6dde0]" />

              {/* price */}
              <div>
                <h3 className="mb-3 text-lg font-bold text-[#241619]">Price Breakdown</h3>
                <PriceBreakdown guests={guests} />
              </div>
            </div>
          ) : (
            /* ─── Review ─── */
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="mb-3 text-lg font-bold text-[#241619]">Your details</h3>
                <div className="overflow-hidden rounded-2xl border border-[#d8cdd0]">
                  {[
                    ["Name", name],
                    ["Email", email],
                    ["Phone Number", phone],
                    ["Total Guest", `${guests} ${guests > 1 ? "People" : "Person"}`],
                  ].map(([k, v], i) => (
                    <div key={k} className={`flex items-center justify-between px-4 py-3.5 ${i > 0 ? "border-t border-[#e6dde0]" : ""}`}>
                      <span className="text-sm text-[#9a8e90]">{k}</span>
                      <span className="text-sm font-semibold text-[#241619]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-bold text-[#241619]">Your Sessions</h3>
                <div className="overflow-hidden rounded-2xl border border-[#d8cdd0]">
                  {selectedDays.map((id, i) => {
                    const day = findDay(id)!;
                    const s = findSession(sessionByDay[id]);
                    return (
                      <div key={id} className={`flex items-center justify-between gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-[#e6dde0]" : ""}`}>
                        <span className="text-sm font-semibold text-accent">{day.long}</span>
                        <span className="text-sm text-[#7c6f71]">{s?.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-bold text-[#241619]">Price Breakdown</h3>
                <PriceBreakdown guests={guests} />
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="shrink-0 border-t border-[#e6dde0] px-6 pb-6 pt-4 sm:px-8">
          {view === "form" ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setView("review")}
              className="w-full rounded-full bg-accent py-4 text-[15px] font-semibold text-white transition-all hover:bg-brand-bold disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue to Review
            </button>
          ) : (
            <>
              <button type="button" onClick={() => setView("success")} className="w-full rounded-full bg-accent py-4 text-[15px] font-semibold text-white transition-colors hover:bg-brand-bold">
                Confirm Reservation
              </button>
              <p className="mt-3 text-center text-xs leading-relaxed text-[#9a8e90]">
                After submitting, Wine Adore Customer Relationship will contact you via WhatsApp to confirm your reservation and share payment details.
              </p>
              <button type="button" onClick={() => setView("form")} className="mt-2 w-full py-1 text-sm text-[#9a8e90] transition-colors hover:text-[#241619]">
                ← Back to edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
