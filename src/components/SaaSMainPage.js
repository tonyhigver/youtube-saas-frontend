import React, { useEffect, useState } from "react";

export default function SaaSMainPage() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    if (profile) setUserProfile(profile);
  }, []);

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
      <main className="flex-1 relative p-6">
        {/* Avatar usuario arriba derecha */}
        {userProfile && (
          <img
            src={userProfile.picture}
            alt={userProfile.name}
            className="absolute top-4 right-4 w-12 h-12 rounded-full shadow-md"
            title={userProfile.name}
          />
        )}

        {/* Área de trabajo */}
        <div className="mt-12">
          <h1 className="text-3xl font-bold mb-6">Bienvenido al SaaS</h1>
          <p className="text-gray-300">
            Aquí aparecerán tus funcionalidades: transcripción, embeddings, búsqueda semántica y más.
          </p>

          {/* Aquí luego podrás incluir tus componentes de la app */}
        </div>
      </main>
    </div>
  );
}
