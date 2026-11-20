import React, { useId, useMemo, useState } from "react";
import { COUNTRIES } from "../data/countries";

/** Controlled, prefix-only country suggestions. Can be reused in User and B2B inputs. */
export default function CountryAutocomplete({ value = "", onChange, className = "", placeholder = "Country", required = false, ...props }) {
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const id = useId();
  const suggestions = useMemo(() => {
    const search = String(value || "").trim().toLocaleLowerCase();
    if (!search) return [];
    return COUNTRIES.filter(country => country.toLocaleLowerCase().startsWith(search)).slice(0, 9);
  }, [value]);
  const choose = (name) => {
    onChange?.({ target: { value: name, name: props.name, id: props.id } });
    setFocused(false);
    setActive(0);
  };
  return (
    <div className="relative w-full min-w-0">
      <input {...props} value={value} placeholder={placeholder} required={required}
        autoComplete="off" role="combobox" aria-autocomplete="list"
        aria-expanded={focused && suggestions.length > 0}
        aria-controls={`${id}-countries`}
        className={className || "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"}
        onChange={e => { setActive(0); onChange?.(e); }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        onKeyDown={e => {
          if (e.key === "Escape") setFocused(false);
          if (!focused || !suggestions.length) return;
          if (e.key === "ArrowDown") { e.preventDefault(); setActive(i => (i + 1) % suggestions.length); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive(i => (i - 1 + suggestions.length) % suggestions.length); }
          if (e.key === "Enter") { e.preventDefault(); choose(suggestions[active] || suggestions[0]); }
        }} />
      {focused && suggestions.length > 0 && (
        <ul id={`${id}-countries`} role="listbox" className="absolute z-[120] mt-1 max-h-56 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-xl">
          {suggestions.map((country, index) => (
            <li key={country} role="option" aria-selected={index === active}>
              <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => choose(country)}
                className={`block w-full px-3 py-2 text-left text-sm ${index === active ? "bg-teal-50 text-teal-800" : "hover:bg-slate-50"}`}>
                {country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
