import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        background: "#F9F7F3",
        color: "#1D1D1D",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 14, letterSpacing: "0.2em", color: "#00bd3a" }}>
          ERROR 404
        </div>
        <h1 style={{ fontSize: 56, marginTop: 16, marginBottom: 16 }}>
          Page not found
        </h1>
        <p style={{ color: "#4A4A4A", marginBottom: 32 }}>
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: 9999,
            background: "#1D1D1D",
            color: "#F9F7F3",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
