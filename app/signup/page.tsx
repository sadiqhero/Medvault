"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/ui/Navbar";
import { useRouter } from "next/navigation";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

  :root {
    --g-light: #d5f8e3;
    --g-mid: #b4dcc3;
    --g-dark: #0c8347;
    --g-darker: #095c34;
    --g-text: #063d23;
    --g-muted: #5a8a6a;
    --g-hint: #7eaa8e;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--g-light);
    min-height: 100vh;
    font-family: 'DM Mono', monospace;
    color: var(--g-text);
  }

  .login-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--g-light);
    overflow: hidden;
    position: relative;
  }

  /* ── LEFT PANEL ── */
  .panel-left {
    position: relative;
    background: var(--g-darker);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 56px 52px;
    overflow: hidden;
  }

  .panel-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 80%, rgba(12,131,71,0.55) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 10%, rgba(5,40,22,0.7) 0%, transparent 55%);
    pointer-events: none;
  }

  .panel-left-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(181,220,195,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(181,220,195,0.06) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .brand {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brand-icon {
    width: 36px;
    height: 36px;
    border: 2px solid var(--g-dark);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(12,131,71,0.2);
  }

  .brand-icon svg {
    width: 18px;
    height: 18px;
    fill: var(--g-mid);
  }

  .brand-name {
    font-family: 'DM Mono', monospace;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--g-mid);
  }

  .left-hero {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .left-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--g-dark);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .left-eyebrow::before {
    content: '';
    display: block;
    width: 28px;
    height: 2px;
    background: var(--g-dark);
  }

  .left-headline {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(40px, 4vw, 58px);
    line-height: 1.08;
    color: var(--g-light);
    margin-bottom: 28px;
    letter-spacing: -0.01em;
  }

  .left-headline em {
    font-style: italic;
    color: var(--g-mid);
  }

  .left-sub {
    font-size: 13px;
    line-height: 1.7;
    color: var(--g-hint);
    max-width: 320px;
    font-weight: 300;
  }

  .left-stats {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 32px;
    border-top: 1px solid rgba(181,220,195,0.12);
    padding-top: 32px;
  }

  .stat-item {}
  .stat-value {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    color: var(--g-light);
    letter-spacing: -0.02em;
  }
  .stat-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--g-muted);
    margin-top: 2px;
  }

  /* ── RIGHT PANEL ── */
  .panel-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 56px 72px;
    position: relative;
    background: var(--g-light);
  }

  .panel-right::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -120px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(180,220,195,0.5) 0%, transparent 70%);
    pointer-events: none;
  }

  .form-container {
    width: 100%;
    max-width: 380px;
    position: relative;
    z-index: 1;
    animation: fadeUp 0.6s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .form-top-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(12,131,71,0.1);
    border: 1px solid rgba(12,131,71,0.2);
    border-radius: 999px;
    padding: 5px 14px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--g-dark);
    margin-bottom: 32px;
  }

  .form-top-tag::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--g-dark);
    animation: pulse 2s ease infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .form-heading {
    font-family: 'DM Serif Display', serif;
    font-size: 36px;
    letter-spacing: -0.02em;
    color: var(--g-text);
    line-height: 1.1;
    margin-bottom: 8px;
  }

  .form-sub {
    font-size: 13px;
    color: var(--g-muted);
    font-weight: 300;
    margin-bottom: 40px;
  }

  .form-sub a {
    color: var(--g-dark);
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid var(--g-dark);
    padding-bottom: 1px;
    transition: opacity 0.2s;
  }

  .form-sub a:hover { opacity: 0.7; }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 12px;
  }

  .field-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--g-muted);
    display: block;
    margin-bottom: 8px;
  }

  .input-wrap {
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--g-hint);
    width: 16px;
    height: 16px;
    pointer-events: none;
    transition: color 0.2s;
  }

  .field-input {
    width: 100%;
    padding: 14px 16px 14px 44px;
    background: white;
    border: 1.5px solid var(--g-mid);
    border-radius: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 13.5px;
    color: var(--g-text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .field-input::placeholder { color: var(--g-hint); }

  .field-input:focus {
    border-color: var(--g-dark);
    box-shadow: 0 0 0 3px rgba(12,131,71,0.12);
  }

  .field-input:focus + .input-icon-after,
  .input-wrap:focus-within .input-icon { color: var(--g-dark); }

  .field-input.error {
    border-color: #c0392b;
    box-shadow: 0 0 0 3px rgba(192,57,43,0.1);
  }

  .password-toggle {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--g-hint);
    display: flex;
    align-items: center;
    padding: 4px;
    transition: color 0.2s;
  }
  .password-toggle:hover { color: var(--g-dark); }

  .field-error {
    font-size: 11px;
    color: #c0392b;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
    animation: errIn 0.2s ease;
  }
  @keyframes errIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .form-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0 28px;
  }

  .remember-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--g-muted);
    cursor: pointer;
    user-select: none;
  }

  .remember-check {
    width: 16px;
    height: 16px;
    border: 1.5px solid var(--g-mid);
    border-radius: 4px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    flex-shrink: 0;
  }

  .remember-check.checked {
    background: var(--g-dark);
    border-color: var(--g-dark);
  }

  .forgot-link {
    font-size: 12px;
    color: var(--g-dark);
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
  }
  .forgot-link:hover { opacity: 0.65; }

  .submit-btn {
    width: 100%;
    padding: 15px;
    background: var(--g-darker);
    color: var(--g-light);
    border: none;
    border-radius: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .submit-btn:hover:not(:disabled) {
    background: var(--g-dark);
    box-shadow: 0 6px 20px rgba(9,92,52,0.3);
    transform: translateY(-1px);
  }

  .submit-btn:active:not(:disabled) { transform: translateY(0); }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .submit-btn .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(213,248,227,0.3);
    border-top-color: var(--g-light);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .divider {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 28px 0;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: var(--g-mid);
  }

  .divider-text {
    font-size: 11px;
    color: var(--g-hint);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .sso-btn {
    width: 100%;
    padding: 13px;
    background: white;
    border: 1.5px solid var(--g-mid);
    border-radius: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 12.5px;
    color: var(--g-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-weight: 400;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
    letter-spacing: 0.04em;
  }

  .sso-btn:hover {
    border-color: var(--g-dark);
    box-shadow: 0 4px 12px rgba(12,131,71,0.1);
    transform: translateY(-1px);
  }

  .sso-btn svg { width: 18px; height: 18px; }

  .success-overlay {
    position: fixed;
    inset: 0;
    background: var(--g-darker);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    z-index: 100;
    animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .success-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(12,131,71,0.2);
    border: 2px solid var(--g-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
  }
  @keyframes popIn {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  .success-text {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    color: var(--g-light);
    animation: fadeUp 0.5s ease 0.35s both;
  }

  .success-sub {
    font-size: 13px;
    color: var(--g-hint);
    animation: fadeUp 0.5s ease 0.45s both;
  }

  @media (max-width: 768px) {
    .login-root { grid-template-columns: 1fr; }
    .panel-left { display: none; }
    .panel-right { padding: 48px 32px; }
  }
`;
interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = styles;
    document.head.appendChild(tag);
    styleRef.current = tag;
    return () => { tag.remove(); };
  }, []);

  function validate() {
    const errs: FormErrors = {};

    if (!form.name) errs.name = "Full name is required";

    if (!form.email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";

    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "At least 6 characters required";

    if (form.confirmPassword !== form.password)
      errs.confirmPassword = "Passwords do not match";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

async function handleSubmit() {
  if (!validate()) return;

  setLoading(true);
  await new Promise(r => setTimeout(r, 1800));
  setLoading(false);

  router.push("/"); // 👈 redirect to home
}

  if (success) {
    return (
      <div className="success-overlay">
        <div className="success-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d5f8e3" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="success-text">Account created.</p>
        <p className="success-sub">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="login-root">
        {/* LEFT PANEL (same as login) */}
        <div className="panel-left">
          <div className="panel-left-grid" />

          <div className="brand">
            <div className="brand-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="none" stroke="#b4dcc3" strokeWidth="2"/>
              </svg>
            </div>
            <span className="brand-name">MedVault</span>
          </div>

          <div className="left-hero">
            <div className="left-eyebrow">Create Account</div>
            <h1 className="left-headline">
              Start managing <em>patients securely</em><br />from day one.
            </h1>
            <p className="left-sub">
              Join a platform designed for healthcare professionals who value
              precision, privacy, and performance.
            </p>
          </div>

          <div className="left-stats">
            <div>
              <div className="stat-value">10k+</div>
              <div className="stat-label">Users</div>
            </div>
            <div>
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div>
              <div className="stat-value">Secure</div>
              <div className="stat-label">Data</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="panel-right">
          <div className="form-container">
            <div className="form-top-tag">New Account</div>

            <h2 className="form-heading">Create account</h2>
            <p className="form-sub">
              Already have an account?{" "}
              <a href="/login">Sign in</a>
            </p>

            <div className="field-group">

              {/* Name */}
              <div>
                <label className="field-label">Full Name</label>
                <div className="input-wrap">
                  <input
                    className={`field-input${errors.name ? " error" : ""}`}
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                {errors.name && <p className="field-error">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="field-label">Email</label>
                <div className="input-wrap">
                  <input
                    className={`field-input${errors.email ? " error" : ""}`}
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="field-label">Password</label>
                <div className="input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`field-input${errors.password ? " error" : ""}`}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                  />
                </div>
                {errors.password && <p className="field-error">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="field-label">Confirm Password</label>
                <div className="input-wrap">
                  <input
                    type="password"
                    className={`field-input${errors.confirmPassword ? " error" : ""}`}
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="field-error">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}