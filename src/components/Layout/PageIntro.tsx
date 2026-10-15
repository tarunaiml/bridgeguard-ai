import { ReactNode } from "react";

export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {action}
    </div>
  );
}
