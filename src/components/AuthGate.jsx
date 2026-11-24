import { useState } from "react";
import KevinAvatar from "./KevinAvatar.jsx";
import Icon from "./Icon.jsx";
import { supabase } from "../lib/supabase.js";

export default function AuthGate({ onAuthenticated, onContinueAsGuest }) {
  const [showAccount, setShowAccount] = useState(false);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!supabase) return;

    setBusy(true);
    setError("");
    try {
      const result = mode === "signup"
        ? await supabase.auth.signUp({ email: email.trim(), password })
        : await supabase.auth.signInWithPassword({ email: email.trim(), password });

      if (result.error) throw result.error;
      if (!result.data.session) {
        throw new Error("Check your email to confirm the account, then come back to sign in.");
      }
      await onAuthenticated(result.data.session, password);
    } catch (caught) {
      setError(caught.message || "Could not open your account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-screen">
      <section className="auth-panel" aria-labelledby="auth-title">
        <KevinAvatar size={92} breathing />
        <p className="auth-kicker">EMOTION ESTATE</p>
        <h1 id="auth-title">Welcome to your quiet room</h1>
        <p className="auth-lede">Try Kevin freely, or choose an account to sync an encrypted private vault.</p>

        <button type="button" className="btn btn-primary auth-submit" onClick={onContinueAsGuest}>
          Continue as guest <Icon name="arrow" size={17} />
        </button>

        {supabase && !showAccount && (
          <button type="button" className="link-btn auth-switch" onClick={() => setShowAccount(true)}>
            Sign in or create an account
          </button>
        )}

        {showAccount && supabase && (
          <>
            <form onSubmit={submit} className="auth-form">
              <label>
                Email
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
              </label>
              <label>
                Password
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} required />
              </label>

              {error && <p className="auth-error" role="alert">{error}</p>}

              <button className="btn btn-primary auth-submit" type="submit" disabled={busy}>
                {busy ? "Opening…" : mode === "signup" ? "Create my room" : "Sign in"}
              </button>
            </form>

            <button type="button" className="link-btn auth-switch" onClick={() => setMode((value) => value === "login" ? "signup" : "login")}> 
              {mode === "login" ? "Create an account" : "I already have an account"}
            </button>
          </>
        )}

        <p className="auth-privacy">Guests keep conversations and journal entries only on this device. No guest password or account is created.</p>
      </section>
    </main>
  );
}
