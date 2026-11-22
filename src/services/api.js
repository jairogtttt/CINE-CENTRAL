import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const listarExamenes = async () => {
  const respuesta = await api.get("/exams/");
  return Array.isArray(respuesta.data) ? respuesta.data : respuesta.data.results || [];
};

export const crearExamen = async (nuevoExamen) => {
  const respuesta = await api.post("/exams/", nuevoExamen);
  return respuesta.data;
};

export const eliminarExamen = async (id) => {
  await api.delete(`/exams/${id}/`);
};

export default api;
