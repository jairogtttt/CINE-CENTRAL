export default function Button({ children, variante = "primary", onClick, type = "button" }) {
  return (
    <button type={type} className={`btn btn-${variante}`} onClick={onClick}>
      {children}
    </button>
  );
}
