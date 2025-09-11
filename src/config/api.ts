// Vite fournit les types via "vite/client" (assure-toi d'avoir "types": ["vite/client"] dans tsconfig)
const RAW_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5030";

export const API_BASE_URL = RAW_BASE.replace(/\/+$/, "");

export function api(path: string) {
    return `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}