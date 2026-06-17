import { useCallback, useEffect, useState } from "react";

/**
 * Static, localStorage-backed auth for the Customer Portal demo.
 *
 * There is no real backend — this exists purely so a client demo has a
 * believable login / sign-up gate in front of the portal. A predefined
 * demo account always works; any account the user signs up with is also
 * stored locally so they can sign back in with it.
 */

const ACCOUNTS_KEY = "alloybazaar.portal.accounts.v1";
const SESSION_KEY = "alloybazaar.portal.session.v1";
const EVENT = "alloybazaar:portal-auth-change";

export type Account = {
  name: string;
  company: string;
  email: string;
  password: string;
};

export type Session = {
  name: string;
  company: string;
  email: string;
  loginAt: string;
};

/** Predefined hardcoded credentials — shown on the login screen for the demo. */
export const DEMO_ACCOUNT: Account = {
  name: "Aarav Mehta",
  company: "Meridian Steel Traders",
  email: "demo@alloybazaar.in",
  password: "demo1234",
};

function readAccounts(): Account[] {
  if (typeof window === "undefined") return [DEMO_ACCOUNT];
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    const stored = raw ? (JSON.parse(raw) as Account[]) : [];
    // Always keep the demo account available, even if storage was cleared.
    const hasDemo = stored.some((a) => a.email.toLowerCase() === DEMO_ACCOUNT.email);
    return hasDemo ? stored : [DEMO_ACCOUNT, ...stored];
  } catch {
    return [DEMO_ACCOUNT];
  }
}

function writeAccounts(accounts: Account[]) {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function writeSession(session: Session | null) {
  if (session) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent(EVENT));
}

export type AuthResult = { ok: boolean; error?: string };

/**
 * React hook exposing the current session plus login / signup / logout helpers.
 * Subscribes to changes so multiple tabs / components stay in sync.
 */
export function usePortalAuth() {
  const [session, setSession] = useState<Session | null>(readSession);

  useEffect(() => {
    const sync = () => setSession(readSession());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const login = useCallback((email: string, password: string): AuthResult => {
    const e = email.trim().toLowerCase();
    if (!e || !password) return { ok: false, error: "Enter both email and password." };
    const account = readAccounts().find((a) => a.email.toLowerCase() === e);
    if (!account) return { ok: false, error: "No account found for that email." };
    if (account.password !== password) return { ok: false, error: "Incorrect password." };
    writeSession({
      name: account.name,
      company: account.company,
      email: account.email,
      loginAt: new Date().toISOString(),
    });
    return { ok: true };
  }, []);

  const signup = useCallback(
    (account: Account): AuthResult => {
      const email = account.email.trim().toLowerCase();
      if (!account.name.trim() || !email || !account.password) {
        return { ok: false, error: "Name, email and password are required." };
      }
      if (account.password.length < 6) {
        return { ok: false, error: "Password must be at least 6 characters." };
      }
      const accounts = readAccounts();
      if (accounts.some((a) => a.email.toLowerCase() === email)) {
        return { ok: false, error: "An account with that email already exists." };
      }
      const next: Account = { ...account, email };
      writeAccounts([...accounts, next]);
      writeSession({
        name: next.name,
        company: next.company,
        email: next.email,
        loginAt: new Date().toISOString(),
      });
      return { ok: true };
    },
    [],
  );

  const logout = useCallback(() => {
    writeSession(null);
  }, []);

  return { session, isAuthenticated: !!session, login, signup, logout };
}
