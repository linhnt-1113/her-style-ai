import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const lanAddresses = Object.values(networkInterfaces()).flatMap((interfaces) =>
  (interfaces ?? [])
    .filter((address) => address.family === "IPv4" && !address.internal)
    .map((address) => address.address),
);
const developmentApiUrl =
  process.env.NODE_ENV === "development" && !process.env.NEXT_PUBLIC_API_BASE_URL
    ? `http://${lanAddresses[0] ?? "127.0.0.1"}:8000`
    : undefined;

const nextConfig: NextConfig = {
  env: developmentApiUrl
    ? { NEXT_PUBLIC_API_BASE_URL: developmentApiUrl }
    : undefined,
  // Allow the Next.js dev server/HMR to be opened from a phone on the same LAN.
  allowedDevOrigins: lanAddresses,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "style-src 'self' 'unsafe-inline'",
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
              process.env.NODE_ENV === "development"
                ? "connect-src 'self' ws: http: https:"
                : "connect-src 'self' https:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
