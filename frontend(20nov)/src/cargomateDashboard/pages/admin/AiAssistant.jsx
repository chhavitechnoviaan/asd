import { useEffect, useRef, useState } from "react";
import {
  FiSend,
  FiPlus,
  FiMessageSquare,
  FiBarChart2,
  FiDatabase,
} from "react-icons/fi";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import robotAvatar from "../../assets/Images/webp/robot.webp";
import API from "../../api/axios";
import { getSession } from "../../../lib/auth";
import FormattedAIReply from "../../components/FormattedAIReply";

const HISTORY_KEY = "cargomate-admin-chat-sessions";
function loadSessions() {
  try {
    const v = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
function safeData(response) {
  return response?.data?.data ?? response?.data ?? {};
}
function getValue(data, keys) {
  for (const key of keys) {
    const v = key.split(".").reduce((o, k) => o?.[k], data);
    if (v !== undefined && v !== null)
      return typeof v === "number" ? v.toLocaleString("en-IN") : String(v);
  }
  return "—";
}
const cards = [
  [
    "Total Import Shipments",
    ["totalImportShipments", "summary.totalImportShipments"],
  ],
  [
    "Total Export Shipments",
    ["totalExportShipments", "summary.totalExportShipments"],
  ],
  [
    "Total Import Value (INR)",
    ["totalImportValue", "summary.totalImportValue"],
  ],
  [
    "Total Export Value (INR)",
    ["totalExportValue", "summary.totalExportValue"],
  ],
  ["Total Importers", ["totalImporters", "summary.totalImporters"]],
  ["Total Exporters", ["totalExporters", "summary.totalExporters"]],
];
const GRAPH_COLORS = [
  "#0A8981",
  "#14B8A6",
  "#38BDF8",
  "#8B5CF6",
  "#FDBA74",
  "#A7F3D0",
  "#64748B",
];
const amountFormat = (value) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(value) || 0,
  );
function normalizedRows(source, mode) {
  const list = Array.isArray(source)
    ? source
    : Array.isArray(source?.data)
      ? source.data
      : [];
  const monthMap = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };
  const orderKey = (label) => {
    const parts = String(label).toLowerCase().split("-");
    const month = monthMap[parts[1]?.slice(0, 3)] || Number(parts[1]) || 0;
    return Number(parts[0]) * 100 + month;
  };
  const normalized = list
    .map((item, index) => ({
      label: String(
        mode === "trend"
          ? item._id ||
              [item.year, item.month].filter(Boolean).join("-") ||
              item.period ||
              index + 1
          : item.country || item._id || item.name || "Unknown",
      ),
      value: Number(item.totalValue ?? item.value ?? item.amount ?? 0),
      share: Number(item.percentage || 0),
    }))
    .filter((row) => Number.isFinite(row.value) && row.value >= 0);
  return mode === "trend"
    ? normalized.sort((a, b) => orderKey(a.label) - orderKey(b.label))
    : normalized;
}
// Import data uses YYYY-MM; export data uses YYYY-monthname. Align both by canonical YYYY-MM.
function canonicalPeriod(value) {
  const raw = String(value ?? "").trim().toLowerCase();
  const match = raw.match(/^(\d{4})[-\s/]([a-z]+|\d{1,2})$/);
  if (!match) return raw;
  const names = ["january","february","march","april","may","june","july","august","september","october","november","december"];
  const month = /^\d+$/.test(match[2]) ? Number(match[2]) : names.findIndex(x => x.startsWith(match[2].slice(0,3))) + 1;
  return month >= 1 && month <= 12 ? `${match[1]}-${String(month).padStart(2,"0")}` : raw;
}
// Combine values by period; keep the two series independent, and never fabricate missing points.
function CombinedTradeTrend({ imports, exports: exportsSource }) {
  const [visible, setVisible] = useState({ imports: true, exports: true });
  const importsRows = normalizedRows(imports, "trend");
  const exportsRows = normalizedRows(exportsSource, "trend");
  const rows = new Map();
  importsRows.forEach((row) => {
    const key = canonicalPeriod(row.label);
    rows.set(key, { ...(rows.get(key) || { period: key }), importValue: row.value });
  });
  exportsRows.forEach((row) => {
    const key = canonicalPeriod(row.label);
    rows.set(key, { ...(rows.get(key) || { period: key }), exportValue: row.value });
  });
  const data = Array.from(rows.values())
    .sort((a, b) => a.period.localeCompare(b.period))
    .slice(-12);
  return (
    <section className="cm-trade-combined rounded-2xl border border-[#D9EDEA] bg-white shadow-sm p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="text-base font-bold text-[#075F5A]">
            Import & Export Value Trend (INR)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Combined monthly comparison from uploaded trade records
          </p>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">
          {data.length} periods
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3" aria-label="Graph series visibility">
        {[{key:"exports",label:"Exports (INR)",color:"#2563EB",count:exportsRows.length},{key:"imports",label:"Imports (INR)",color:"#0A8981",count:importsRows.length}].map(item=>(
          <button key={item.key} type="button" aria-pressed={visible[item.key]} onClick={()=>setVisible(current=>({...current,[item.key]:!current[item.key]}))}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${visible[item.key] ? "bg-white" : "bg-slate-100 opacity-50"}`}
            style={{borderColor:item.color,color:item.color}}>
            <span className="mr-1">{visible[item.key] ? "●" : "○"}</span>{item.label} ({item.count})
          </button>
        ))}
      </div>
      {!data.length ? (
        <div className="grid h-64 place-items-center rounded-xl bg-slate-50 text-sm text-slate-500">
          No matching import/export trend records
        </div>
      ) : (
        <div className="h-72 sm:h-80 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 12, right: 12, left: 0, bottom: 12 }}
            >
              <defs>
                <linearGradient id="cmImportFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0A8981" stopOpacity={0.25} />
                  <stop offset="1" stopColor="#0A8981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="cmExportFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#2563EB" stopOpacity={0.16} />
                  <stop offset="1" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 5" stroke="#E7F0F1" />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                minTickGap={18}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={65}
                tickFormatter={(v) =>
                  v >= 10000000
                    ? `${(v / 10000000).toFixed(1)}Cr`
                    : v >= 100000
                      ? `${(v / 100000).toFixed(1)}L`
                      : v
                }
              />
              <Tooltip
                formatter={(value, name) => [`₹${amountFormat(value)}`, name]}
              />
              
              {visible.imports && <Area
                type="monotone"
                dataKey="importValue"
                name="Imports (INR)"
                stroke="#0A8981"
                strokeWidth={3}
                fill="url(#cmImportFill)"
                connectNulls={false}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />}
              {visible.exports && <Area
                type="monotone"
                dataKey="exportValue"
                name="Exports (INR)"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#cmExportFill)"
                connectNulls={false}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
function ChartPanel({ title, source, type }) {
  const isTrend = type === "trend";
  const rows = normalizedRows(source, isTrend ? "trend" : "country");
  const data = isTrend
    ? rows.slice(-12)
    : [...rows].sort((a, b) => b.value - a.value).slice(0, 7);
  return (
    <section className="min-w-0 rounded-2xl border border-[#D9EDEA] bg-white/95 shadow-sm p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-bold text-[#075F5A]">
          <FiBarChart2 className="text-[#0A8981]" />
          {title}
        </h3>
        <span className="text-[11px] text-slate-500">
          {data.length} data points
        </span>
      </div>
      {data.length === 0 ? (
        <div className="grid h-56 place-items-center rounded-xl bg-slate-50 text-sm text-slate-500">
          No matching trade records available
        </div>
      ) : (
        <div className="h-60 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            {isTrend ? (
              <AreaChart
                data={data}
                margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={
                      title.startsWith("Import")
                        ? "importGradient"
                        : "exportGradient"
                    }
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#0A8981" stopOpacity={0.35} />
                    <stop
                      offset="100%"
                      stopColor="#14B8A6"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 4" stroke="#E8F1F0" />
                <XAxis
                  dataKey="label"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={14}
                />
                <YAxis
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={45}
                  tickFormatter={(v) =>
                    v >= 10000000
                      ? `${(v / 10000000).toFixed(1)}Cr`
                      : v >= 100000
                        ? `${(v / 100000).toFixed(1)}L`
                        : v
                  }
                />
                <Tooltip
                  formatter={(value) => [
                    `₹${amountFormat(value)}`,
                    "Value (INR)",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0A8981"
                  strokeWidth={3}
                  fill={`url(#${title.startsWith("Import") ? "importGradient" : "exportGradient"})`}
                  dot={{ r: 3, fill: "#0A8981" }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            ) : type === "donut" ? (
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  cx="45%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={88}
                  paddingAngle={3}
                >
                  {data.map((_, i) => (
                    <Cell
                      key={i}
                      fill={GRAPH_COLORS[i % GRAPH_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${amountFormat(value)}`} />
              </PieChart>
            ) : (
              <BarChart
                data={data}
                layout="vertical"
                margin={{ left: 18, right: 18, top: 4, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 4"
                  horizontal={false}
                  stroke="#E8F1F0"
                />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={95}
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => [
                    `₹${amountFormat(value)}`,
                    "Value (INR)",
                  ]}
                />
                <Bar
                  dataKey="value"
                  fill="#0A8981"
                  radius={[0, 8, 8, 0]}
                  barSize={16}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
      {type === "donut" && data.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {data.map((row, i) => (
            <div
              key={row.label}
              className="flex items-center gap-1 text-[11px] text-slate-600"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: GRAPH_COLORS[i % GRAPH_COLORS.length] }}
              />
              {row.label}: ₹{amountFormat(row.value)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
export default function AiAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState(loadSessions);
  const [sessionId, setSessionId] = useState(null);
  const sessionIdRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);
  const [error, setError] = useState("");
  const [imports, setImports] = useState(null),
    [exports, setExports] = useState(null);
  const [trends, setTrends] = useState({});
  const chatRef = useRef(null),
    abortRef = useRef(null);
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions.slice(0, 50)));
  }, [sessions]);
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);
  useEffect(() => {
    let alive = true;
    (async () => {
      const endpoints = [
        ["imports", "/b2b/import/dashboard"],
        ["exports", "/b2b/export/dashboard"],
        ["importTrend", "/b2b/import/import-trend"],
        ["exportTrend", "/b2b/export/export-trend"],
        ["importCountries", "/b2b/import/country-distribution"],
        ["exportCountries", "/b2b/export/country-distribution"],
      ];
      const results = await Promise.allSettled(
        endpoints.map(async ([key, url]) => [
          key,
          safeData(await API.get(url)),
        ]),
      );
      if (!alive) return;
      const output = {};
      for (const item of results)
        if (item.status === "fulfilled") output[item.value[0]] = item.value[1];
      setImports(output.imports || null);
      setExports(output.exports || null);
      setTrends(output);
    })();
    return () => {
      alive = false;
      abortRef.current?.abort();
    };
  }, []);
  async function openSession(id) {
    setError("");
    sessionIdRef.current = id;
    setSessionId(id);
    setBusy(true);
    try {
      const { data } = await API.get("/ai-chat/history", {
        params: { session_id: id, limit: 200 },
      });
      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.messages)
          ? data.messages
          : Array.isArray(data?.data)
            ? data.data
            : [];
      setMessages(
        items.map((m, i) => ({
          id: `${id}-${i}`,
          role: m.role === "assistant" ? "assistant" : "user",
          text: m.content || m.text || "",
        })),
      );
    } catch (e) {
      setError(e.response?.data?.message || "Could not load chat history");
    } finally {
      setBusy(false);
    }
  }
  function newChat() {
    abortRef.current?.abort();
    sessionIdRef.current = null;
    setSessionId(null);
    setMessages([]);
    setError("");
    setBusy(false);
  }
  async function sendMessage(message) {
    const text = String(message || "").trim();
    if (!text || busy) return;
    setBusy(true);
    setError("");
    setInput("");
    const id = `msg-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id, role: "user", text },
      { id: id + "-reply", role: "assistant", text: "" },
    ]);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      let activeSessionId = sessionIdRef.current || sessionId;
      if (!activeSessionId) {
        const created = await API.post("/ai-chat/session");
        activeSessionId = created.data?.session_id;
        if (!activeSessionId)
          throw new Error("AI chat session could not be created");
        sessionIdRef.current = activeSessionId;
        setSessionId(activeSessionId);
        setSessions((prev) =>
          [
            { id: activeSessionId, title: text.slice(0, 64) },
            ...prev.filter((x) => x.id !== activeSessionId),
          ].slice(0, 50),
        );
      }
      const token = getSession()?.token;
      const response = await fetch(
        `${(import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/$/, "")}/ai-chat/stream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ message: text, session_id: activeSessionId }),
          signal: controller.signal,
        },
      );
      if (!response.ok) {
        let d = {};
        try {
          d = await response.json();
        } catch {}
        throw Error(d.message || `AI service error: ${response.status}`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "",
        full = "",
        currentSession = activeSessionId;
      function handleEvent(raw) {
        const lines = raw.split(/\r?\n/).filter((l) => l.startsWith("data:"));
        if (!lines.length) return;
        let event;
        try {
          event = JSON.parse(lines.map((l) => l.slice(5).trim()).join("\n"));
        } catch {
          return;
        }
        if (event.type === "session" && event.session_id) {
          currentSession = event.session_id;
          sessionIdRef.current = currentSession;
          setSessionId(currentSession);
          setSessions((prev) =>
            [
              { id: currentSession, title: text.slice(0, 64) },
              ...prev.filter((x) => x.id !== currentSession),
            ].slice(0, 50),
          );
        }
        if (event.type === "token") full += event.text || "";
        if (event.type === "done") full = event.answer || full;
        setMessages((prev) =>
          prev.map((m) => (m.id === id + "-reply" ? { ...m, text: full } : m)),
        );
      }
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split(/\r?\n\r?\n/);
        buffer = parts.pop() || "";
        parts.forEach(handleEvent);
      }
      if (buffer.trim()) handleEvent(buffer);
      if (!full)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id + "-reply"
              ? { ...m, text: "No response text returned" }
              : m,
          ),
        );
    } catch (e) {
      if (e.name !== "AbortError") {
        setError(e.message);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id + "-reply"
              ? { ...m, text: "Unable to complete your request." }
              : m,
          ),
        );
      }
    } finally {
      setBusy(false);
    }
  }
  const metricCards = cards.map(([label, keys], i) => ({
    label,
    value: getValue(i % 2 === 0 ? imports : exports, keys),
  }));
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f8fb] p-1 md:p-1 space-y-5">
      {/* <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            CargoMate Admin AI Assistant
          </h1>
          <p className="text-sm text-slate-500">
            Unrestricted admin chat and trade intelligence
          </p>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
          Admin access · No quota
        </span>
      </div> */}
      <div className="flex justify-end">
        <button type="button" onClick={()=>setChatVisible(v=>!v)} className="rounded-xl border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-[#0A8981] hover:bg-teal-50">
          {chatVisible ? "Hide AI Assistant · Expand Analytics" : "Show AI Assistant"}
        </button>
      </div>
      <div className={`grid grid-cols-1 ${chatVisible ? "xl:grid-cols-[360px_minmax(0,1fr)]" : ""} gap-5 items-start`}>
        {chatVisible && <section className="flex flex-col h-[min(780px,calc(100vh-175px))] min-h-[540px] xl:sticky xl:top-4 bg-white rounded-3xl border border-teal-100 shadow-[0_16px_60px_-30px_rgba(20,184,166,.35)] overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <img
                src={robotAvatar}
                alt="CargoMate AI assistant"
                className="h-9 w-9 rounded-full object-contain bg-teal-50 p-1"
              />
              <div>
                <div className="font-semibold text-slate-900">
                  CargoMate AI Assistant
                </div>
                <p className="text-[11px] text-slate-500">
                  Ask about shipments, buyers & trade data
                </p>
              </div>
            </div>
            <button
              onClick={newChat}
              title="New chat"
              className="flex items-center gap-1 text-teal-700 text-xs"
            >
              <FiPlus /> New
            </button>
          </div>
          <div className="px-4 py-3 flex gap-2 overflow-x-auto border-b border-slate-100">
            {sessions.slice(0, 10).map((s) => (
              <button
                key={s.id}
                title={s.title}
                onClick={() => openSession(s.id)}
                className={`shrink-0 rounded-lg px-2 py-1.5 text-xs ${sessionId === s.id ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-600"}`}
              >
                <FiMessageSquare className="inline" /> {s.title.slice(0, 19)}
              </button>
            ))}
          </div>
          <div
            ref={chatRef}
            className="flex-1 min-h-0 overflow-y-auto px-5 md:px-10 py-6 space-y-5"
          >
            {messages.length === 0 && (
              <div className="flex items-start gap-2 mt-3">
                <img
                  src={robotAvatar}
                  alt="AI"
                  className="w-10 h-10 object-contain shrink-0"
                />
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-[#D8E7FA] bg-[#EFF6FF] px-4 py-3 text-sm text-[#123659] leading-relaxed">
                  👋 Hello! I’m your AI Trade Assistant. I can help you with
                  EXIM, Logistics, Compliance, Documentation, Freight Rates, and
                  more. How can I assist you today?
                </div>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <img
                    src={robotAvatar}
                    alt="AI"
                    className="w-9 h-9 object-contain shrink-0"
                  />
                )}
                <div
                  className={`max-w-[min(85%,760px)] rounded-2xl p-4 text-sm leading-relaxed ${m.role === "user" ? "bg-teal-600 text-white" : "bg-slate-50 border border-slate-100 text-slate-800"}`}
                >
                  {m.role === "assistant" ? (
                    <FormattedAIReply text={m.text || "Generating response…"} onSuggestion={(suggestion)=>sendMessage(suggestion)} />
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>
          <div className="border-t border-slate-100 bg-white/90 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                disabled={busy}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 min-w-0 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Ask anything about trade…"
              />
              <button
                disabled={busy || !input.trim()}
                className="rounded-lg bg-teal-600 px-3 text-white disabled:opacity-40"
                aria-label="Send"
              >
                <FiSend />
              </button>
            </form>
          </div>
        </section>}
        <div className="space-y-4 min-w-0">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {metricCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs text-slate-500">{card.label}</p>
                <p className="mt-2 text-lg font-bold text-teal-700">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
          <CombinedTradeTrend
            imports={trends.importTrend}
            exports={trends.exportTrend}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartPanel
              title="Imports by Country of Origin"
              source={trends.importCountries}
              type="donut"
            />
            <ChartPanel
              title="Exports by Country of Destination"
              source={trends.exportCountries}
              type="bar"
            />
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-xs text-teal-900">
            <FiDatabase className="shrink-0 mt-0.5" />
            <span>
              Data source: uploaded Master Data import/export batches, via
              /b2b/import and /b2b/export dashboard, trend and
              country-distribution APIs. Values are reported in INR as stored;
              unavailable data is not estimated.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
