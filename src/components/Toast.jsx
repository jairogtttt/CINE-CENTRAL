export default function Toast({ mensaje }) {
  if (!mensaje) return null;
  return (
    <div className="toast-banner" role="status">
      {mensaje}
    </div>
  );
}
