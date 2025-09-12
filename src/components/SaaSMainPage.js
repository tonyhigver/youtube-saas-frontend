import React, { useEffect, useState } from "react";

export default function SaaSMainPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    if (profile) setUserProfile(profile);
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return alert("Por favor selecciona un archivo antes de subir.");
    // Aquí irá la lógica para subir y transcribir el video
    console.log("Subiendo video:", selectedFile.name);
    alert(`Video "${selectedFile.name}" listo para transcripción (simulación).`);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar izquierda */}
      <aside className="w-64 bg-gray-800 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Menú SaaS</h2>
        <ul className="flex flex-col gap-4">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Dashboard</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Subir Video</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Buscar Videos</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Configuración</li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 relative p-6 flex flex-col items-center justify-center">
        {/* Avatar usuario arriba derecha */}
        {userProfile && (
          <img
            src={userProfile.picture}
            alt={userProfile.name}
            className="absolute top-4 right-4 w-12 h-12 rounded-full shadow-md"
            title={userProfile.name}
          />
        )}

        {/* Área central para subir video */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Sube tu video para transcribir</h1>
          <p className="text-gray-300 mb-4 text-center">
            Selecciona un archivo de video desde tu ordenador. Luego lo procesaremos para transcripción y búsqueda semántica.
          </p>
          
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="mb-4 text-black"
          />

          <button
            onClick={handleUpload}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition"
          >
            Subir y Transcribir
          </button>

          {selectedFile && (
            <p className="mt-2 text-gray-400 text-sm">
              Archivo seleccionado: {selectedFile.name}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
