import React from "react";

export default function LandingPage() {
  const oauthUrl = "TU_OAUTH_URL"; // aquí luego pones la URL de OAuth

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-5xl font-bold text-center mb-4">YouTube SaaS</h1>
      <p className="text-center text-lg mb-8 max-w-lg">
        Transcribe, indexa y busca automáticamente en los últimos videos de tu canal de YouTube.
      </p>
      <a
        href={oauthUrl}
        className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-700 transition"
      >
        Conectar con YouTube
      </a>
      <footer className="mt-16 text-gray-600 text-sm">
        <a href="/terms" className="underline mx-2">Términos</a>
        <a href="/privacy" className="underline mx-2">Privacidad</a>
      </footer>
    </div>
  );
}
