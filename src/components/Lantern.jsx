/** Legacy lantern mark: retained for the breathing tool. */
export default function Lantern({ size = 28, alive = false, breathing = false, className = "" }) {
  return (
    <span
      className={`lantern ${alive ? "is-alive" : ""} ${breathing ? "is-breathing" : ""} ${className}`}
      style={{ "--size": `${size}px` }}
      aria-hidden="true"
    />
  );
}
