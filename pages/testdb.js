import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import "tailwindcss/tailwind.css"; // Import Tailwind CSS

export default function Testdb() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [matricula, setMatricula] = useState("");
  const [edad, setEdad] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("/api/testmongo");
    const data = await res.data;
    setData(data);
  };

  const sendData = async () => {
    setLoading(true);
    if (
      nombre === "" ||
      apellidos === "" ||
      correo === "" ||
      matricula === "" ||
      edad === ""
    ) {
      toast.error("Llena todos los campos");
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/dbpage", {
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        matricula: matricula,
        edad: edad,
      });
      getData();
      toast.success("Datos enviados");
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Error al enviar datos");
    }
    setLoading(false);
  };

  const updateData = async () => {
    setLoading(true);
    if (
      !updatingId ||
      nombre === "" ||
      apellidos === "" ||
      correo === "" ||
      matricula === "" ||
      edad === ""
    ) {
      toast.error("Selecciona un elemento y llena todos los campos");
      setLoading(false);
      return;
    }
    try {
      await axios.put(`/api/dbpage?id=${updatingId}`, {
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        matricula: matricula,
        edad: edad,
      });
      getData();
      toast.success("Datos actualizados");
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar datos");
    }
    setLoading(false);
    setUpdatingId(null);
    setEditingData(null);
  };

  const eliminarData = async (id) => {
    try {
      const resultado = await axios.delete(`/api/testmongo?id=${id}`);
      console.log(resultado);
      getData();
      toast.success("Datos eliminados");
    } catch (error) {
      console.log(error);
      toast.error("No se pudo eliminar");
    }
  };

  const editarData = (alumno) => {
    setEditingData(alumno);
    setUpdatingId(alumno.PKid);
    setNombre(alumno.nombre);
    setApellidos(alumno.apellidos);
    setCorreo(alumno.correo);
    setMatricula(alumno.matricula);
    setEdad(alumno.edad);
  };

  const resetForm = () => {
    setNombre("");
    setApellidos("");
    setCorreo("");
    setMatricula("");
    setEdad("");
  };

  return (
    <>
      <Toaster position="bottom-center" />

      <div className="flex flex-col p-4 space-y-4 bg-gray-200">
        <input
          className="px-4 py-2 text-black border rounded focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="px-4 py-2 text-black border rounded focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
        <input
          className="px-4 py-2 text-black border rounded focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          className="px-4 py-2 text-black border rounded focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Matricula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        <input
          className="px-4 py-2 text-black border rounded focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
      </div>

      <div className="flex justify-end p-4 space-x-4 bg-gray-200">
        {updatingId ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded cursor-not-allowed"
            disabled={loading}
            onClick={updateData}
          >
            {loading ? "Detener" : "Actualizar"}
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={loading}
            onClick={sendData}
          >
            {loading ? "Detener" : "Iniciar"}
          </button>
        )}
      </div>

      <main className="p-4 bg-gray-200">
        {data.map((alumno, i) => (
          <div
            className="flex items-center justify-between p-4 mb-4 bg-white rounded"
            key={i}
          >
            <div>
              <h1 className="text-xl font-bold text-black">{alumno.nombre}</h1>
              <h2 className="text-black">{alumno.apellidos}</h2>
            </div>

            <div className="flex space-x-2">
              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => eliminarData(alumno.PKid)}
              >
                Eliminar
              </button>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => editarData(alumno)}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
