export default function KevinAvatar({ size = 128, alive = false, breathing = false, className = "" }) {
  return (
    <div
      className={`kevin-avatar ${alive ? "is-alive" : ""} ${breathing ? "is-breathing" : ""} ${className}`}
      style={{ "--avatar-size": `${size}px` }}
      role="img"
      aria-label="Kevin, a warm glowing avatar"
    >
      <span className="kevin-rays" aria-hidden="true" />
      <span className="kevin-face" aria-hidden="true">
        <span className="kevin-eye kevin-eye-left" />
        <span className="kevin-eye kevin-eye-right" />
      </span>
    </div>
  );
}
