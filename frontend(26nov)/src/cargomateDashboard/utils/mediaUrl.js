// Resolve self-hosted uploads against the configured API origin (GoDaddy compatible).
export function mediaUrl(value) {
  if (!value || typeof value !== "string") return "";
  if (/^(data:image\/|blob:)/i.test(value)) return value;
  if (/^https?:\/\//i.test(value)) return value;
  const configured = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/+$/, "");
  const origin = configured.replace(/\/api$/, "");
  const pathname = value.startsWith("/") ? value : `/${value}`;
  return `${origin}${pathname.startsWith("/api/uploads/") ? pathname : pathname.replace(/^\/uploads\//, "/uploads/")}`;
}
