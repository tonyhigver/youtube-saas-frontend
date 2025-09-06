import React, { useEffect, useState } from "react";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Comprobar si el usuario ya inició sesión en tu app
    const logged = localStorage.getItem("userLoggedIn");
    setIsLoggedIn(logged === "true");
  }, []);

  // Configuración de OAuth
  const clientId = "771066809924-68rinikvn84dl6stdmniov39uo38emsu.apps.googleusercontent.com";
  const redirectUri = "https://tu-backend.com/api/oauth-callback"; // Endpoint de backend que maneja el code
  const scope = "https://www.googleapis.com/auth/youtube.readonly";
  const accessType = "offline"; // Para obtener refresh_token

  const youtubeAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=${accessType}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#03245C] p-4">
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

      {/* Botón Conectar con YouTube solo si NO está logueado */}
      {!isLoggedIn && (
        <a
          href={youtubeAuthUrl}
          className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-700 transition drop-shadow-[0_0_10px_rgb(255,0,0)] flex items-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Conectar con YouTube
        </a>
      )}

      {/* Footer */}
      <footer className="mt-16 text-gray-400 text-sm">
        <a href="/terms" className="underline mx-2">
          Términos
        </a>
        <a href="/privacy" className="underline mx-2">
          Privacidad
        </a>
      </footer>
    </div>
  );
}
