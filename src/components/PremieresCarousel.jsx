import { usePremieres } from "../hooks/usePremieres.js";
import PremieresSkeleton from "./PremieresSkeleton.jsx";
import Button from "./Button.jsx";

export default function PremieresCarousel() {
  const { estrenos, cargando, error, recargar } = usePremieres();

  return (
    <section className="premieres-section">
      <div className="section-header">
        <h2>Próximos Estrenos</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button variante="secondary" onClick={() => recargar(false)}>
            ↻ Recargar
          </Button>
          <Button variante="secondary" onClick={() => recargar(true)}>
            ⚠ Simular Error
          </Button>
        </div>
      </div>

      {cargando && <PremieresSkeleton />}

      {!cargando && error && (
        <div className="error-box">
          <span>❌ {error}</span>
          <Button variante="primary" onClick={() => recargar(false)}>
            Reintentar carga
          </Button>
        </div>
      )}

      {!cargando && !error && (
        <div className="carousel-track">
          {estrenos.map((item) => (
            <article key={item.id} className="premiere-card">
              <img src={item.imagen} alt={item.titulo} />
              <div className="premiere-body">
                <span className="release-tag">Estreno: {item.fechaEstreno}</span>
                <h4>{item.titulo}</h4>
                <p>{item.genero}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
