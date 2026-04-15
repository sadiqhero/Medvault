// app/about/page.tsx
"use client";
import Navbar from "@/components/ui/Navbar";
import { useEffect, useRef } from "react";
import { Shield, Zap, BarChart3, Users, Target, Eye, FileText, Lock, Activity } from 'lucide-react';

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

.about-root {
  background: var(--g-light);
  font-family: 'DM Mono', monospace;
  color: var(--g-text);
}

.section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 120px 32px;
}

.eyebrow {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--g-dark);
  margin-bottom: 18px;
}

.heading {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(38px, 4vw, 56px);
  line-height: 1.1;
  margin-bottom: 20px;
}

.subtext {
  max-width: 520px;
  color: var(--g-muted);
  font-size: 14px;
  line-height: 1.7;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.card {
  background: #f8fdf9;
  border: 1px solid rgba(180,220,195,0.4);
  border-radius: 16px;
  padding: 40px;
}

.values {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.value-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--g-mid);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta {
  background: var(--g-dark);
  color: var(--g-light);
  text-align: center;
}

.cta h2 {
  font-family: 'DM Serif Display', serif;
  font-size: 36px;
  margin-bottom: 16px;
}

.cta p {
  color: var(--g-mid);
  margin-bottom: 32px;
}

.btn-row {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn {
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
}

.btn-primary {
  background: white;
  color: var(--g-dark);
}

.btn-secondary {
  border: 1px solid rgba(255,255,255,0.5);
  color: white;
}

@media (max-width: 768px) {
  .grid-2 { grid-template-columns: 1fr; }
  .values { grid-template-columns: 1fr 1fr; }
}
`;

export default function AboutPage() {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = styles;
    document.head.appendChild(tag);
    styleRef.current = tag;
    return () => { tag.remove(); };
  }, []);

  return (
    <div className="about-root">
<Navbar />
      {/* HERO */}
      <section className="section">
        <div className="eyebrow">Next-Gen Health Tech</div>
        <h1 className="heading">Reimagining Health Records</h1>
        <p className="subtext">
          MedVault is built for healthcare professionals — eliminating paper workflows and enabling
          fast, secure data access.
        </p>
      </section>

      {/* CHALLENGE */}
      <section className="section grid-2">
        <div>
          <div className="eyebrow">The Challenge</div>
          <h2 className="heading">Outdated systems slow down care</h2>
          <p className="subtext">
            Paper records are inefficient, error-prone, and time-consuming.
          </p>
        </div>

        <div className="card">
          <p>• 90% still rely on paper</p>
          <p>• 30-40% time lost</p>
          <p>• 5x error rate</p>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section grid-2">
        <div className="card">
          <Target />
          <h3>Mission</h3>
          <p>Empowering professionals with secure systems.</p>
        </div>

        <div className="card">
          <Eye />
          <h3>Vision</h3>
          <p>Fully digital healthcare ecosystem.</p>
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="eyebrow">Values</div>
        <div className="values">
          <div className="value-item"><Shield /> Security</div>
          <div className="value-item"><Zap /> Speed</div>
          <div className="value-item"><Users /> People</div>
          <div className="value-item"><BarChart3 /> Innovation</div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <h2>Ready to modernize your practice?</h2>
        <p>Join healthcare teams moving digital-first.</p>
        <div className="btn-row">
          <button className="btn btn-primary">Request Demo</button>
          <button className="btn btn-secondary">Contact Sales</button>
        </div>
      </section>

    </div>
  );
}
