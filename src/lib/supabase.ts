import { createBrowserClient, createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

export const supabaseEnabled = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export function createBrowser() {
  if (!supabaseEnabled) return null;
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

type CookieStore = {
  get(name: string): { value: string } | undefined;
  set(name: string, value: string, options?: CookieOptions): void;
};

export function createServer(cookieStore: CookieStore) {
  if (!supabaseEnabled) return null;
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => cookieStore.set(name, value, options),
        remove: (name, options) =>
          cookieStore.set(name, "", { ...options, maxAge: 0 }),
      },
    },
  );
}
