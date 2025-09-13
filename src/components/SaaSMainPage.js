import React, { useEffect, useState } from "react";

export default function SaaSMainPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    if (profile) setUserProfile(profile);
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile)
      return alert("Por favor selecciona un archivo antes de subir.");
    if (!agreed)
      return alert("Debes confirmar que eres propietario del contenido.");

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      // 🔹 URL apuntando a tu servidor VPS con IP pública y puerto 5000
      const res = await fetch("http://157.180.88.215:5000/upload-video", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message); // "Video transcrito y embeddings generados con éxito"
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error durante la subida y transcripción.");
    }
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
        {userProfile && (
          <img
            src={userProfile.picture}
            alt={userProfile.name}
            className="absolute top-4 right-4 w-12 h-12 rounded-full shadow-md"
            title={userProfile.name}
          />
        )}

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

          <label className="flex items-center gap-2 mt-2 text-white text-lg">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5"
            />
            ☑ Confirmo que soy propietario del contenido o tengo permiso para usarlo.
          </label>
          <a href="/terms" className="underline text-blue-400 mt-2 mb-4 block">
            Leer Términos de Servicio completos
          </a>

          <button
            onClick={handleUpload}
            disabled={!agreed}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              agreed ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
            }`}
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
