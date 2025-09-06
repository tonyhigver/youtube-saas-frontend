import React from "react";

export default function LandingPage() {
  const oauthUrl = "TU_OAUTH_URL"; // aquí luego pones la URL de OAuth

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 p-4">
      {/* Título principal */}
      <h1 className="text-6xl font-extrabold text-center mb-6 text-white drop-shadow-[0_0_20px_rgb(255,255,255)]">
        Búsqueda semántica básica
      </h1>

      {/* Subtítulo con glow */}
      <h2 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-[0_0_15px_rgb(255,0,0)]">
        YouTube SaaS
      </h2>

      {/* Descripción */}
      <p className="text-center text-lg mb-8 max-w-lg text-gray-200">
        Transcribe, indexa y busca automáticamente en los últimos videos de tu canal de YouTube.
      </p>

      {/* Botón con glow */}
      <a
        href={oauthUrl}
        className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-700 transition drop-shadow-[0_0_10px_rgb(255,0,0)]"
      >
        Conectar con YouTube
      </a>

      {/* Footer */}
      <footer className="mt-16 text-gray-400 text-sm">
        <a href="/terms" className="underline mx-2">Términos</a>
        <a href="/privacy" className="underline mx-2">Privacidad</a>
      </footer>
    </div>
  );
}
