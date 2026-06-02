import { useState } from "react";

const SocialLink = ({ href, children }) => {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: "#fff",
        textDecoration: "none",
        fontSize: "13px",
        letterSpacing: "1px",
        opacity: hover ? 1 : 0.8,
        transition: "opacity 0.2s",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {children}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: hover ? 1 : 0,
          transform: hover
            ? "translateY(0) translateX(0)"
            : "translateY(2px) translateX(-2px)",
          transition: "all 0.2s ease-out",
        }}
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </a>
  );
};

export default function Overlay() {
  return (
    <div
      className="ui-overlay"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#ffffff",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 4px 0",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontStyle: "italic",
            }}
          >
            Diamond Orbit
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              opacity: 0.6,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            By Razi Hassan
          </p>
        </div>
      </header>

      {/* Footer */}
      <footer className="ui-footer">
        <div className="ui-socials">
          <SocialLink href="https://linkedin.com/in/raziulh">
            Linkedin
          </SocialLink>
          <SocialLink href="https://github.com/raziulh">GitHub</SocialLink>
          <SocialLink href="https://razihassan.vercel.app">Portfolio</SocialLink>
        </div>
        <div style={{ fontSize: "12px", opacity: 0.4, letterSpacing: "1px" }}>
          © 2026 Razi Hassan
        </div>
      </footer>
    </div>
  );
}
