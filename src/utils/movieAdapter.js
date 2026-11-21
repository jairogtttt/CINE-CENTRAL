export function adaptarPelicula(raw) {
  return {
    id: raw.id,
    titulo: raw.titulo || raw.title || "Título no disponible",
    clasificacion: raw.clasificacion || raw.rating || "APT",
    valoracion: Number(raw.valoracion ?? raw.score ?? 0).toFixed(1),
    sinopsis: raw.sinopsis || raw.overview || "Sin descripción disponible.",
    horarios: Array.isArray(raw.horarios) && raw.horarios.length > 0 ? raw.horarios : ["Próximamente"],
    imagen: raw.imagen || raw.poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
  };
}

export function adaptarListaPeliculas(listaRaw = []) {
  return listaRaw.map(adaptarPelicula);
}
