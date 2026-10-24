import React, { useEffect, useState } from "react";
import API from "../api/axios";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");
const getImageUrl = (image) => {
  if (!image) return "";
  if (/^https?:\/\//i.test(image) || image.startsWith("data:")) return image;
  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
};

/** Displays active ads assigned to the exact Admin Ad Management placement. */
export default function DashboardAdPlacement({ location }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    if (!location) {
      setAds([]);
      return undefined;
    }
    let cancelled = false;
    API.get("/ads/placement", { params: { location } })
      .then((response) => {
        if (!cancelled) setAds(Array.isArray(response.data?.data) ? response.data.data : []);
      })
      .catch((error) => {
        console.error(`[Dashboard ads] Could not load placement: ${location}`, error?.response?.data || error.message);
        if (!cancelled) setAds([]);
      });
    return () => { cancelled = true; };
  }, [location]);

  if (!ads.length) return null;

  return (
    <section className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2" aria-label="Sponsored content">
      {ads.map((ad) => {
        const imageUrl = getImageUrl(ad.image || ad.imageUrl);
        const destination = ad.linkUrl || ad.redirectUrl;
        const content = (
          <>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={ad.postText || ad.title || "Sponsored advertisement"}
                loading="lazy"
                className="block max-h-64 w-full object-cover"
                onError={(event) => { event.currentTarget.style.display = "none"; }}
              />
            )}
            <div className="p-4">
              {ad.postText && <p className="whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-900">{ad.postText}</p>}
              {ad.subPostText && <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-slate-600">{ad.subPostText}</p>}
              {destination && <span className="mt-3 inline-flex text-xs font-semibold text-blue-700">Learn more ↗</span>}
            </div>
          </>
        );
        return destination ? (
          <a key={ad._id} href={destination} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            {content}
          </a>
        ) : (
          <article key={ad._id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">{content}</article>
        );
      })}
    </section>
  );
}
