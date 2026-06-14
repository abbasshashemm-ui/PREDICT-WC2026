import { useCallback, useId, useState, type FormEvent } from 'react';
import { useSupabaseAuth } from '../context/SupabaseAuthContext';
import {
  isValidPassword,
  isValidUsername,
  normalizeUsernameInput,
} from '../lib/supabase/usernameAuth';

type AuthMode = 'sign-in' | 'sign-up';

interface AuthCardProps {
  onSuccess?: () => void;
  onClose?: () => void;
  className?: string;
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
      aria-hidden="true"
    />
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M3 3l18 18" />
      <path d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42" />
      <path d="M9.88 5.09A10.94 10.94 0 0112 5c6.5 0 10 7 10 7a18.43 18.43 0 01-4.32 5.28" />
      <path d="M6.11 6.11A18.43 18.43 0 002 12s3.5 7 10 7a10.94 10.94 0 003.12-.41" />
    </svg>
  );
}

export function AuthCard({ onSuccess, onClose, className = '' }: AuthCardProps) {
  const formId = useId();
  const {
    isConfigured,
    signUpWithUsernamePassword,
    signInWithUsernamePassword,
  } = useSupabaseAuth();

  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const cleanUsername = normalizeUsernameInput(username);
  const usernameValid = isValidUsername(cleanUsername);
  const passwordValid = isValidPassword(password);

  const handleUsernameChange = useCallback((value: string) => {
    setUsername(normalizeUsernameInput(value));
    setError(null);
    setNotice(null);
  }, []);

  const toggleMode = useCallback(() => {
    setMode((current) => (current === 'sign-in' ? 'sign-up' : 'sign-in'));
    setError(null);
    setNotice(null);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!isConfigured) {
      setError('Cloud sync is not configured.');
      return;
    }
    if (!usernameValid) {
      setError('Username must be at least 3 alphanumeric characters.');
      return;
    }
    if (!passwordValid) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setNotice(null);

    try {
      if (mode === 'sign-up') {
        const result = await signUpWithUsernamePassword(cleanUsername, password);
        if (result.error) {
          setError(result.error);
          return;
        }
        if (result.needsSignIn) {
          setNotice('Account created. Sign in with your username and password.');
          setMode('sign-in');
          return;
        }
      } else {
        const result = await signInWithUsernamePassword(cleanUsername, password);
        if (result.error) {
          setError(result.error);
          return;
        }
      }

      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = mode === 'sign-in' ? 'Welcome back' : 'Create your account';
  const subtitle =
    mode === 'sign-in'
      ? 'Sign in to sync your bracket across devices.'
      : 'Pick a username and password — no email verification required.';

  return (
    <div
      className={`bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl max-w-md w-full shadow-2xl ${className}`}
    >
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400/90">
            WC 2026 Predictor
          </p>
          <h2
            key={mode}
            className="mt-1 text-2xl font-black tracking-tight text-white transition-opacity duration-300"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-semibold text-slate-400 transition hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            Close
          </button>
        ) : null}
      </div>

      <form id={formId} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={`${formId}-username`} className="mb-1.5 block text-xs font-semibold text-slate-300">
            Username
          </label>
          <input
            id={`${formId}-username`}
            type="text"
            inputMode="text"
            autoComplete="username"
            value={username}
            onChange={(event) => handleUsernameChange(event.target.value)}
            disabled={isSubmitting}
            maxLength={24}
            placeholder="Abbas123"
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
          <p className="mt-1.5 text-[11px] text-slate-500">
            Letters and numbers only · minimum 3 characters
          </p>
        </div>

        <div>
          <label htmlFor={`${formId}-password`} className="mb-1.5 block text-xs font-semibold text-slate-300">
            Password
          </label>
          <div className="relative">
            <input
              id={`${formId}-password`}
              type={showPassword ? 'text' : 'password'}
              autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(null);
                setNotice(null);
              }}
              disabled={isSubmitting}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword((open) => !open)}
              disabled={isSubmitting}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:text-white disabled:opacity-50"
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-500">Minimum 6 characters</p>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        {notice ? (
          <p className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">
            {notice}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || !usernameValid || !passwordValid}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Spinner />
              <span>{mode === 'sign-in' ? 'Signing in…' : 'Creating account…'}</span>
            </>
          ) : (
            <span>{mode === 'sign-in' ? 'Sign In' : 'Create Account'}</span>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={toggleMode}
          disabled={isSubmitting}
          className="text-sm font-semibold text-slate-400 transition hover:text-emerald-300 disabled:opacity-50"
        >
          {mode === 'sign-in' ? (
            <>
              New here? <span className="text-emerald-400">Create Account</span>
            </>
          ) : (
            <>
              Already have an account? <span className="text-emerald-400">Sign In</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
