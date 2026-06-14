/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PRICE_SUBSCRIPTION: string;
  readonly VITE_STRIPE_PRICE_ONETIME: string;
  readonly VITE_STRIPE_API_URL: string;
  readonly VITE_STRIPE_VERIFY_URL: string;
  readonly VITE_LIVE_RESULTS_API_URL: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly NEXT_PUBLIC_SUPABASE_URL?: string;
  readonly NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
