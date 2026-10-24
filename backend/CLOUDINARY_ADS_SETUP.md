# Cloudinary ad-image upload integration

Ad images submitted from Admin > Ad Management are uploaded directly to Cloudinary in the `asd/ads` folder. The saved `Ad.image` field is the Cloudinary HTTPS URL, so dashboard placements can render it without using `/uploads/ads/...`.

## 1. Configure backend environment

Add these values to the backend's existing `.env` file. Use your real values from Cloudinary Dashboard; do not commit `.env`.

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 2. Install the dependency

From the backend directory run:

```bash
npm install
```

This updates `package-lock.json` for the added `cloudinary` dependency. Then restart/redeploy the backend.

## 3. Test

Create an ad in Admin > Ad Management and upload a JPG, PNG, WEBP, or GIF (maximum 10 MB). The API response's `data.image` should be a URL similar to:

`https://res.cloudinary.com/<cloud-name>/image/upload/v.../asd/ads/ad-....jpg`

If upload fails, verify all three Cloudinary environment variables and restart the backend.
