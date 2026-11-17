"use client";

import Link from "next/link";
import { type ComponentProps, type ReactNode, useEffect, useRef } from "react";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* --------------------------------- Button --------------------------------- */

type Variant = "primary" | "secondary" | "ghost" | "matcha" | "danger";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "bg-sakura-deep text-white hover:brightness-110 shadow-soft dark:text-[#2a1a20]",
  secondary: "bg-surface text-ink border border-line hover:bg-surface-2",
  ghost: "text-ink-soft hover:bg-surface-2 hover:text-ink",
  matcha: "bg-matcha text-[#24331a] hover:brightness-105 shadow-soft",
  danger: "bg-danger text-white hover:brightness-110 dark:text-[#2a1a1a]",
};
const sizeClass: Record<Size, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-13 px-6 text-base gap-2",
};

function buttonClass(variant: Variant, size: Size, className?: string) {
  return cx(
    "inline-flex items-center justify-center rounded-2xl font-semibold transition active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none",
    variantClass[variant],
    sizeClass[size],
    className,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button type="button" className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

/* ---------------------------------- Card ---------------------------------- */

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("rounded-3xl bg-surface border border-line/70 shadow-soft", className)} {...props} />;
}

export function CardTitle({ icon, children, action }: { icon?: ReactNode; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 mb-3">
      <h2 className="flex items-center gap-2 font-semibold text-ink min-w-0">
        {icon && <span className="text-sakura-deep">{icon}</span>}
        {children}
      </h2>
      {action}
    </div>
  );
}

/* ---------------------------------- Badge --------------------------------- */

type Tone = "sakura" | "matcha" | "beige" | "neutral" | "danger";
const toneClass: Record<Tone, string> = {
  sakura: "bg-sakura-soft text-sakura-deep",
  matcha: "bg-matcha-soft text-matcha-deep",
  beige: "bg-surface-2 text-ink",
  neutral: "bg-surface-2 text-ink-soft",
  danger: "bg-danger-soft text-danger",
};

export function Badge({ tone = "neutral", className, ...props }: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cx("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", toneClass[tone], className)}
      {...props}
    />
  );
}

/* ------------------------------- ProgressBar ------------------------------ */

export function ProgressBar({
  value,
  max = 100,
  tone = "sakura",
  label,
  className,
  size = "md",
}: {
  value: number;
  max?: number;
  tone?: "sakura" | "matcha";
  label?: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div
      className={cx("w-full rounded-full bg-surface-2 overflow-hidden", size === "sm" ? "h-2" : "h-3", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.round(value)}
      aria-label={label}
    >
      <div
        className={cx("h-full rounded-full transition-[width] duration-500", tone === "sakura" ? "bg-sakura" : "bg-matcha")}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ProgressRing({
  value,
  max = 100,
  size = 96,
  stroke = 10,
  children,
  label,
}: {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  children?: ReactNode;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={pct >= 1 ? "var(--matcha)" : "var(--sakura)"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset 600ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

/* ----------------------------- States & layout ---------------------------- */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("animate-pulse rounded-2xl bg-surface-2", className)} />;
}

export function PageSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="กำลังโหลด">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-40" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, children }: { icon?: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-10 px-4">
      {icon && <div className="text-4xl mb-1">{icon}</div>}
      <p className="font-semibold text-ink">{title}</p>
      {children && <div className="text-sm text-ink-soft max-w-sm">{children}</div>}
    </div>
  );
}

export function PageHeader({ title, subtitle, icon, action }: { title: string; subtitle?: ReactNode; icon?: ReactNode; action?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-ink">
          {icon && <span aria-hidden>{icon}</span>}
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}

/** Japanese text with sensible font and optional size. */
export function JP({ children, className, ...props }: ComponentProps<"span">) {
  return (
    <span lang="ja" className={cx("jp", className)} {...props}>
      {children}
    </span>
  );
}

/* --------------------------------- Dialog --------------------------------- */

export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = "ยกเลิก",
  tone = "danger",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  children?: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      className="m-auto w-[min(92vw,420px)] rounded-3xl bg-surface text-ink p-0 shadow-soft backdrop:bg-black/40"
    >
      <div className="p-6">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <div className="text-ink-soft text-sm">{children}</div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={tone === "danger" ? "danger" : "primary"} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
