"use client";
import Link from "next/link";
import { useState } from "react";
import prompts from "@/lib/merchant-prompts.json";
export function MerchantPromptLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");
  const results = prompts.filter(p => (category === "All" || p.category === category) && `${p.title} ${p.tool} ${p.inputs} ${p.prompt}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <section className="p-6 md:p-12">
    <div className="flex flex-wrap gap-5 mb-6">
      <label className="flex flex-col gap-2 flex-1 basis-full sm:basis-0 min-w-0">Search prompts<input className="bg-black border border-[#555] p-3 w-full" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try product, theme, or permissions" /></label>
      <label className="flex flex-col gap-2">Task category<select className="bg-black border border-[#555] p-3" value={category} onChange={e=>setCategory(e.target.value)}>{["All",...new Set(prompts.map(p=>p.category))].map(c=><option key={c}>{c}</option>)}</select></label>
    </div>
    <p role="status" className="text-[#bbb] mb-5">{results.length} of {prompts.length} prompts</p>
    <p aria-live="polite" className="text-[#10b981] mb-5">{message}</p>
    {results.length===0 && <p>No matching prompts. Try a broader search or choose All categories.</p>}
    <div className="grid gap-6">{results.map(p=><article id={p.id} key={p.id} className="border border-[#333] p-5 md:p-8 min-w-0">
      <p className="text-sm text-[#10b981]">{p.category} · {p.tool}</p><h2 className="text-2xl mt-3 mb-4">{p.title}</h2>
      <p className="text-[#bbb] mb-4"><strong>Bring:</strong> {p.inputs}</p>
      <blockquote className="border-l-2 border-[#10b981] pl-4 text-lg leading-relaxed whitespace-pre-wrap">{p.prompt}</blockquote>
      <button type="button" className="border border-[#10b981] px-4 py-2 my-5 hover:bg-[#10b981]/10" aria-label={`Copy prompt: ${p.title}`} onClick={async()=>{try{await navigator.clipboard.writeText(p.prompt);setMessage(`Copied: ${p.title}`);}catch{setMessage("Copy was unavailable. Select and copy the visible prompt text.");}}}>Copy prompt</button>
      <p className="text-[#bbb]"><strong>Expected output:</strong> {p.output}</p><p className="text-[#bbb] mt-3"><strong>Review:</strong> {p.review}</p><p className="text-sm text-[#888] mt-4">{p.status}</p>{"guide" in p && p.guide && <Link href={p.guide} className="inline-block mt-4 text-[#10b981] underline">Read the guide and savings assumptions →</Link>}
    </article>)}</div>
  </section>;
}
