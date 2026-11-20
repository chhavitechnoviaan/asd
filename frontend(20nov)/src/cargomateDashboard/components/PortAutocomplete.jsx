import React, { useState } from "react";
import ports from "../data/iataPorts.json";

// PDF source: all ports.pdf (IATA location/city and airport codes).
// Free text is intentionally allowed because the PDF is not a complete seaport list.
export default function PortAutocomplete({ value = "", onChange, className = "", placeholder = "Search location or IATA code", ...props }) {
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(false);
  const query = String(value ?? "").trim().toLowerCase();
  const matches = query && !selected ? ports.filter(p =>
    p.name.toLowerCase().startsWith(query) || p.cityCode.toLowerCase().startsWith(query) || p.airportCode.toLowerCase().startsWith(query)
  ) : [];
  return <div className="relative w-full">
    <input {...props} value={value ?? ""} className={className} placeholder={placeholder}
      autoComplete="off" onFocus={() => setFocused(true)}
      onBlur={() => setTimeout(() => setFocused(false), 150)}
      onChange={e => { setSelected(false); onChange?.(e); }} />
    {focused && matches.length > 0 && <div role="listbox" className="absolute z-[100] left-0 right-0 top-full mt-1 max-h-56 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-xl">
      {matches.map((p,i) => <button key={`${p.name}-${p.cityCode}-${p.airportCode}-${i}`} type="button" role="option" aria-selected="false"
        className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm text-slate-800 hover:bg-blue-50 focus:bg-blue-50"
        onMouseDown={e => e.preventDefault()} onClick={() => { setSelected(true); setFocused(false); onChange?.({target:{value:p.name}}); }}>
        <span className="font-medium">{p.name}</span> <span className="text-xs text-slate-500">({p.cityCode}{p.airportCode !== p.cityCode ? ` / ${p.airportCode}` : ""})</span>
      </button>)}
    </div>}
  </div>;
}
