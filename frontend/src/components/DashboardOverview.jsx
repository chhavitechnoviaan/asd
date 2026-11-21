// import { Truck, Clock, PackageCheck, PiggyBank } from "lucide-react";

// const stats = [
//   { label: "Total shipments", value: "1,245", change: "12.5%", icon: Truck },
//   { label: "In Transit", value: "212", change: "5.3%", icon: Clock },
//   { label: "Delivered", value: "933", change: "16.0%", icon: PackageCheck },
//   { label: "Avg. savings", value: "18.6%", change: "20.0%", icon: PiggyBank },
// ];

// const tradeLanes = [
//   { route: "Ind→USA", percent: 32 },
//   { route: "Ind→UAE", percent: 24 },
//   { route: "Ind→China", percent: 14 },
//   { route: "Ind→France", percent: 12 },
//   { route: "Others", percent: 10 },
// ];

// const shipments = [
//   { id: "AS00001", route: "Ind→USA", status: "In Transit", eta: "10 May 2025" },
//   { id: "AS00002", route: "Ind→UAE", status: "In Transit", eta: "10 May 2025" },
//   { id: "AS00003", route: "Ind→China", status: "Delivered", eta: "10 May 2025" },
//   { id: "AS00004", route: "Ind→France", status: "In Transit", eta: "10 May 2025" },
// ];

// const chartPoints = [30, 90, 60, 140, 100, 190, 150, 230, 190, 260, 220, 300];

// export default function DashboardOverview() {
//   const chartMax = Math.max(...chartPoints);
//   const chartWidth = 300;
//   const chartHeight = 120;
//   const step = chartWidth / (chartPoints.length - 1);
//   const path = chartPoints
//     .map((point, i) => {
//       const x = i * step;
//       const y = chartHeight - (point / chartMax) * chartHeight;
//       return `${i === 0 ? "M" : "L"}${x},${y}`;
//     })
//     .join(" ");

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
//         <h2 className="text-base sm:text-lg font-bold text-gray-900">
//           Dashboard Overview
//         </h2>

//         <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
//           {stats.map(({ label, value, change, icon: Icon }) => (
//             <div
//               key={label}
//               className="bg-gray-50 rounded-xl p-3 flex items-start justify-between"
//             >
//               <div>
//                 <p className="text-xs text-gray-500">{label}</p>
//                 <p className="mt-1 text-lg font-bold text-gray-900">
//                   {value}
//                 </p>
//                 <p className="text-xs text-green-600">{change}</p>
//               </div>
//               <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
//                 <Icon className="w-4 h-4 text-white" />
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="border border-gray-200 rounded-xl p-4">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-bold text-gray-900">
//                 Shipment Performance
//               </p>
//               <Truck className="w-4 h-4 text-blue-600" />
//             </div>
//             <svg
//               viewBox={`0 0 ${chartWidth} ${chartHeight}`}
//               className="mt-3 w-full h-28"
//               preserveAspectRatio="none"
//             >
//               <path
//                 d={path}
//                 fill="none"
//                 stroke="#2563eb"
//                 strokeWidth="2"
//               />
//             </svg>
//             <div className="mt-1 flex justify-between text-[10px] text-gray-400">
//               <span>Jan</span>
//               <span>Feb</span>
//               <span>Mar</span>
//               <span>Apr</span>
//               <span>Jun</span>
//             </div>
//           </div>

//           <div className="border border-gray-200 rounded-xl p-4">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-bold text-gray-900">
//                 Top Trade Lanes
//               </p>
//               <Clock className="w-4 h-4 text-blue-600" />
//             </div>
//             <div className="mt-3 space-y-2.5">
//               {tradeLanes.map(({ route, percent }) => (
//                 <div key={route} className="flex items-center gap-2">
//                   <span className="text-xs text-gray-600 w-20 shrink-0">
//                     {route}
//                   </span>
//                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-blue-600 rounded-full"
//                       style={{ width: `${percent}%` }}
//                     />
//                   </div>
//                   <span className="text-xs text-gray-500 w-8 text-right">
//                     {percent}%
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="border border-gray-200 rounded-xl p-4">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-bold text-gray-900">
//                 Recent Shipments
//               </p>
//               <PackageCheck className="w-4 h-4 text-blue-600" />
//             </div>
//             <table className="mt-3 w-full text-xs">
//               <thead>
//                 <tr className="text-gray-400 text-left">
//                   <th className="font-medium pb-2">Shipment Id</th>
//                   <th className="font-medium pb-2">Route</th>
//                   <th className="font-medium pb-2">Status</th>
//                   <th className="font-medium pb-2">ETA</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {shipments.map((s) => (
//                   <tr key={s.id} className="border-t border-gray-100">
//                     <td className="py-2 text-gray-500">{s.id}</td>
//                     <td className="py-2 text-gray-500">{s.route}</td>
//                     <td className="py-2 text-gray-500">{s.status}</td>
//                     <td className="py-2 text-gray-500">{s.eta}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="border border-gray-200 rounded-xl p-4 flex flex-col">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-bold text-gray-900">Cost Savings</p>
//               <PiggyBank className="w-4 h-4 text-blue-600" />
//             </div>
//             <div className="mt-3 flex-1 flex items-center gap-4">
//               <div
//                 className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
//                 style={{
//                   background:
//                     "conic-gradient(#2563eb 0% 18.6%, #bfdbfe 18.6% 100%)",
//                 }}
//               >
//                 <div className="w-14 h-14 rounded-full bg-white flex flex-col items-center justify-center">
//                   <span className="text-sm font-bold text-gray-900">
//                     18.6%
//                   </span>
//                   <span className="text-[9px] text-gray-400">
//                     Avg. Savings
//                   </span>
//                 </div>
//               </div>
//               <div className="space-y-2 text-xs">
//                 <div className="flex items-center gap-2">
//                   <span className="w-2 h-2 rounded-full bg-blue-600" />
//                   <span className="text-gray-500">Actual Cost</span>
//                   <span className="font-semibold text-gray-900">
//                     $32,00,000
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="w-2 h-2 rounded-full bg-blue-200" />
//                   <span className="text-gray-500">Saved</span>
//                   <span className="font-semibold text-gray-900">
//                     $10,000
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import {
  Truck,
  Clock,
  PackageCheck,
  PiggyBank,
  TrendingUp,
  ArrowUpRight,
  Activity,
  BarChart3,
  Globe2,
} from "lucide-react";

const stats = [
  {
    label: "Total Shipments",
    value: "1,245",
    change: "12.5%",
    icon: Truck,
  },
  {
    label: "In Transit",
    value: "212",
    change: "5.3%",
    icon: Clock,
  },
  {
    label: "Delivered",
    value: "933",
    change: "16.0%",
    icon: PackageCheck,
  },
  {
    label: "Avg. Savings",
    value: "18.6%",
    change: "20.0%",
    icon: PiggyBank,
  },
];

const tradeLanes = [
  { route: "IND → USA", percent: 32 },
  { route: "IND → UAE", percent: 24 },
  { route: "IND → China", percent: 14 },
  { route: "IND → France", percent: 12 },
  { route: "Others", percent: 10 },
];

const shipments = [
  {
    id: "AS00001",
    route: "IND → USA",
    status: "In Transit",
    eta: "10 May 2025",
  },
  {
    id: "AS00002",
    route: "IND → UAE",
    status: "In Transit",
    eta: "10 May 2025",
  },
  {
    id: "AS00003",
    route: "IND → China",
    status: "Delivered",
    eta: "10 May 2025",
  },
  {
    id: "AS00004",
    route: "IND → France",
    status: "In Transit",
    eta: "10 May 2025",
  },
];

const chartPoints = [
  30, 90, 60, 140, 100, 190,
  150, 230, 190, 260, 220, 300,
];

export default function DashboardOverview() {
  const chartMax = Math.max(...chartPoints);
  const chartWidth = 600;
  const chartHeight = 180;
  const padding = 12;

  const step =
    (chartWidth - padding * 2) /
    (chartPoints.length - 1);

  const coordinates = chartPoints.map((point, i) => ({
    x: padding + i * step,
    y:
      chartHeight -
      padding -
      (point / chartMax) * (chartHeight - padding * 2),
  }));

  const path = coordinates
    .map(
      ({ x, y }, i) =>
        `${i === 0 ? "M" : "L"} ${x} ${y}`
    )
    .join(" ");

  const areaPath = `${path} L ${
    chartWidth - padding
  } ${chartHeight} L ${padding} ${chartHeight} Z`;

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F0FAFD] via-[#F7FCFE] to-white py-16 sm:py-20">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-teal-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-8xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-9 text-center">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-semibold tracking-wide text-teal-700">
            <Activity className="h-3.5 w-3.5" />
            REAL-TIME LOGISTICS INTELLIGENCE
          </div> */}

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-4xl">
            Dashboard{" "}
            <span className="bg-gradient-to-r from-[#2563EC] to-[#1596D2] bg-clip-text text-transparent">
              Overview
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Monitor shipments, discover trade insights,
            and optimize logistics performance in one
            intelligent dashboard.
          </p>
        </div>

        {/* Main Dashboard Container */}
        <div className="overflow-hidden rounded-3xl border border-[#DCEEF3] bg-white/95 p-4 shadow-[0_20px_70px_rgba(12,74,110,0.09)] sm:p-7">
          {/* Dashboard Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[#2563EC]" />
                <h3 className="text-lg font-bold text-[#102A43]">
                  Logistics Analytics
                </h3>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Your global shipping performance at a glance
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2563EC]" />
              <span className="text-xs font-semibold text-[#2563EC]">
                Overview
              </span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {stats.map(
              ({ label, value, change, icon: Icon }) => (
                <div
                  key={label}
                  className="group relative overflow-hidden rounded-2xl border border-[#DCEEF3] bg-gradient-to-br from-white to-[#F0FAFC] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EC] hover:shadow-[0_12px_30px_rgba(6,182,212,0.12)] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-100 bg-gradient-to-br from-[#DDF9F5] to-[#E5F5FF] text-[#2563EC]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-[#2563EC]" />
                  </div>

                  <p className="mt-4 text-xs font-medium text-slate-500">
                    {label}
                  </p>

                  <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#102A43] sm:text-3xl">
                    {value}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-[#2563EC]">
                    <TrendingUp className="h-3 w-3" />
                    +{change}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Charts */}
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Shipment Performance */}
            <div className="rounded-2xl border border-[#E2EDF2] bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#14314C]">
                    Shipment Performance
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    Shipment activity trend
                  </p>
                </div>

                <div className="rounded-lg bg-cyan-50 p-2 text-[#2563EC]">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>

              <div className="relative mt-6">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="h-40 w-full overflow-visible"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Shipment performance trend"
                >
                  <defs>
                    <linearGradient
                      id="shipmentAreaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#06B6D4"
                        stopOpacity="0.25"
                      />
                      <stop
                        offset="100%"
                        stopColor="#06B6D4"
                        stopOpacity="0"
                      />
                    </linearGradient>

                    <linearGradient
                      id="shipmentLineGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop
                        offset="0%"
                        stopColor="#14B8A6"
                      />
                      <stop
                        offset="100%"
                        stopColor="#0EA5E9"
                      />
                    </linearGradient>
                  </defs>

                  {[45, 90, 135].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2={chartWidth}
                      y1={y}
                      y2={y}
                      stroke="#E5EDF3"
                      strokeDasharray="5 5"
                    />
                  ))}

                  <path
                    d={areaPath}
                    fill="url(#shipmentAreaGradient)"
                  />

                  <path
                    d={path}
                    fill="none"
                    stroke="url(#shipmentLineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />

                  {coordinates.map(({ x, y }, i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3.5"
                      fill="#FFFFFF"
                      stroke="#06B6D4"
                      strokeWidth="2"
                    />
                  ))}
                </svg>

                <div className="mt-3 flex justify-between text-[11px] font-medium text-slate-400">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>

            {/* Trade Lanes */}
            <div className="rounded-2xl border border-[#E2EDF2] bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#14314C]">
                    Top Trade Lanes
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    Popular global shipping routes
                  </p>
                </div>

                <div className="rounded-lg bg-teal-50 p-2 text-[#2563EC]">
                  <Globe2 className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-7 space-y-5">
                {tradeLanes.map(({ route, percent }) => (
                  <div key={route}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">
                        {route}
                      </span>

                      <span className="text-xs font-bold text-[#2563EC]">
                        {percent}%
                      </span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-[#EAF4F7]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#2563EC] to-[#2563EC] transition-all duration-700"
                        style={{
                          width: `${percent}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Panels */}
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Recent Shipments */}
            <div className="min-w-0 rounded-2xl border border-[#E2EDF2] bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#14314C]">
                    Recent Shipments
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    Latest shipment activity
                  </p>
                </div>

                <div className="rounded-lg bg-cyan-50 p-2 text-[#2563EC]">
                  <PackageCheck className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E2EDF2] bg-[#F4FAFC] text-slate-500">
                      <th className="rounded-l-lg px-3 py-3 font-semibold">
                        Shipment ID
                      </th>
                      <th className="px-3 py-3 font-semibold">
                        Route
                      </th>
                      <th className="px-3 py-3 font-semibold">
                        Status
                      </th>
                      <th className="rounded-r-lg px-3 py-3 font-semibold">
                        ETA
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {shipments.map((shipment) => (
                      <tr
                        key={shipment.id}
                        className="border-b border-slate-100 transition-colors hover:bg-cyan-50/50"
                      >
                        <td className="whitespace-nowrap px-3 py-3 font-semibold text-[#14314C]">
                          {shipment.id}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-slate-500">
                          {shipment.route}
                        </td>

                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                              shipment.status === "Delivered"
                                ? "bg-emerald-50 text-[#2563EC]"
                                : "bg-cyan-50 text-[#2563EC]"
                            }`}
                          >
                            {shipment.status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-slate-500">
                          {shipment.eta}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cost Savings */}
            <div className="rounded-2xl border border-[#E2EDF2] bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#14314C]">
                    Cost Savings
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    AI-powered cost optimization
                  </p>
                </div>

                <div className="rounded-lg bg-teal-50 p-2 text-[#2563EC]">
                  <PiggyBank className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-7 sm:flex-row">
                {/* Donut Chart */}
                <div
                  className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full shadow-[0_0_25px_rgba(6,182,212,0.12)]"
                  style={{
                    background:
                      "conic-gradient(#14B8A6 0% 18.6%, #DDF4F7 18.6% 100%)",
                  }}
                >
                  <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-2xl font-extrabold text-[#102A43]">
                      18.6%
                    </span>
                    <span className="mt-1 text-[10px] font-medium text-slate-400">
                      Avg. Savings
                    </span>
                  </div>
                </div>

                {/* Savings Details */}
                <div className="w-full max-w-[220px] space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2563EC]" />
                      <span className="text-xs text-slate-500">
                        Actual Cost
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#14314C]">
                      $32,00,000
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2563EC]" />
                      <span className="text-xs text-slate-500">
                        Saved
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#14314C]">
                      $10,000
                    </span>
                  </div>

                  <div className="rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50 to-[#2563EC] p-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-[#2563EC]" />
                      <span className="text-xs font-semibold text-[#2563EC]">
                        Smarter Cost Control
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      Optimize your global logistics
                      with AI-driven insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2EDF2] pt-5">
            <p className="text-xs text-slate-400">
              ASD CargoMate • Intelligent Logistics Analytics
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EC]">
              <span className="h-2 w-2 rounded-full bg-[#2563EC]" />
              AI-Powered Insights
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
