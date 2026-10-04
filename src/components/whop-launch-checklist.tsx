"use client";

import { useState } from "react";
import Link from "next/link";
import { whopLaunchChecklistGroups as groups } from "@/lib/whop-launch-checklist";

export function WhopLaunchChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  return <>
    <div className="border-b border-[#333] p-6 md:px-12 flex flex-wrap gap-5 items-center justify-between">
      <p role="status" className="text-[#10b981]">{checked.size} of {total} checks complete</p>
      <p className="w-full text-sm text-[#aaa]">Use the checks as you review your setup. They reset when you refresh this page. Nothing is submitted.</p>
    </div>
    <div className="grid md:grid-cols-2">{groups.map(group => <section key={group.name} className="p-6 md:p-10 border-b border-r border-[#333] break-inside-avoid">
      <h2 className="text-2xl mb-5">{group.name}</h2>
      <ul className="space-y-5 text-[#bbb] leading-relaxed">{group.items.map(item => <li key={item}>
        <label className="flex gap-3 cursor-pointer"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#10b981]" checked={checked.has(item)} onChange={event => setChecked(prior => {
          const next = new Set(prior);
          if (event.target.checked) next.add(item); else next.delete(item);
          return next;
        })} /><span>{item}</span></label>
      </li>)}</ul>
      <Link className="inline-block mt-6 text-[#10b981] underline" href={group.href}>{group.label} →</Link>
    </section>)}</div>
  </>;
}
