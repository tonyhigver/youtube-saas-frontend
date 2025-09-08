import React, { useEffect, useState } from "react";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false);

  useEffect(() => {
    // Revisar si ya hay sesión guardada
    const googleLogged = localStorage.getItem("userLoggedIn") === "true";
    if (googleLogged) {
      setIsLoggedIn(true);
    }

    const params = new URLSearchParams(window.location.search);

    // Revisar si backend ya completó YouTube OAuth
    if (params.get("loggedIn") === "true") {
      setIsYouTubeConnected(true);
    }

    // Revisar si viene token de Google en hash o query
    let token = null;
    const hash = window.location.hash;

    if (hash.includes("access_token")) {
      token = new URLSearchParams(hash.replace("#", "?")).get("access_token");
    } else {
      token = params.get("access_token");
    }

    if (token) {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("google_token", token);
      setIsLoggedIn(true); // 👈 fuerza re-render inmediato
    }

    // Limpiar la URL después de procesar
    window.history.replaceState({}, document.title, "/");
    window.location.hash = "";
  }, []);

  const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?client_id=771066809924-68rinikvn84dl6stdmniov39uo38emsu.apps.googleusercontent.com&redirect_uri=https://youtube-saas-frontend.vercel.app&response_type=token&scope=openid%20email%20profile";

  // CLIENT IDs ACTUALIZADOS
  const clientId = "771066809924-atjqbg5dafq7of82se2a7ltr3688hnkp.apps.googleusercontent.com"; // YouTube OAuth
  const redirectUri = "https://mi-backend12.duckdns.org/api/oauth-callback"; // <-- Actualizado
  const scope = "https://www.googleapis.com/auth/youtube.readonly";
  const accessType = "offline";
  const youtubeAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=${accessType}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#03245C] p-4">
      <h1 className="text-6xl font-extrabold text-center mb-6 text-white drop-shadow-[0_0_20px_rgb(255,255,255)]">
        Búsqueda semántica básica
      </h1>
      <h2 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-[0_0_15px_rgb(255,0,0)]">
        YouTube SaaS
      </h2>
      <p className="text-center text-lg mb-8 max-w-lg text-gray-200">
        Transcribe, indexa y busca automáticamente en los últimos videos de tu canal de YouTube.
      </p>

      {/* Botón de Google solo si no ha iniciado sesión */}
      {!isLoggedIn && (
        <a
          href={googleAuthUrl}
          className="bg-white text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition mb-4 flex items-center gap-2 shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
            <path
              fill="#4285F4"
              d="M533.5 278.4c0-17.3-1.5-34-4.3-50.3H272v95.3h146.9c-6.3 34-25 
              62.9-53.1 82l85.8 66.7c50.1-46.2 78-114.1 78-193.7z"
            />
            <path
              fill="#34A853"
              d="M272 544.3c72.6 0 133.6-24.1 
              178.1-65.4l-85.8-66.7c-23.9 16-54.3 
              25.6-92.3 25.6-71 0-131.2-47.8-152.8-111.9L32.1 
              386.6c44.6 88.5 134.2 151.7 239.9 157.7z"
            />
            <path
              fill="#FBBC05"
              d="M119.2 306.5c-10.5-31.5-10.5-65.6 
              0-97.1L32.1 142.2c-39.3 77-39.3 
              168.1 0 245.1l87.1-80.8z"
            />
            <path
              fill="#EA4335"
              d="M272 107.7c38.3-.6 74.9 13.2 
              102.8 38.9l77.1-77.1C405.3 24.1 
              344.3 0 272 0 166.3 6 76.7 69.2 
              32.1 157.7l87.1 80.8C140.8 155.5 
              201 107.7 272 107.7z"
            />
          </svg>
          Iniciar sesión con Google
        </a>
      )}

      {/* Botón Conectar con YouTube */}
      <a
        href={youtubeAuthUrl}
        className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-700 transition drop-shadow-[0_0_10px_rgb(255,0,0)] flex items-center gap-2"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path
            fill="white"
            d="M23.5 6.2s-.2-1.7-.9-2.5c-.9-1-2-1-2.5-1.1C16.6 2.2 
            12 2.2 12 2.2h0s-4.6 0-8.1.4c-.5.1-1.6.1-2.5 
            1.1-.7.8-.9 2.5-.9 2.5S0 8.3 0 10.5v1.9c0 2.2.2 
            4.3.2 4.3s.2 1.7.9 2.5c.9 1 2.1 1 2.6 1.1 1.9.2 
            7.9.4 7.9.4s4.6 0 8.1-.4c.5-.1 1.6-.1 2.5-1.1.7-.8.9-2.5.9-2.5s.2-2.2.2-4.3v-1.9c0-2.2-.2-4.3-.2-4.3z"
          />
          <path fill="#03245C" d="M9.8 15.3V8.7l6.4 3.3-6.4 3.3z" />
        </svg>
        Conectar con YouTube
      </a>

      {isYouTubeConnected && (
        <p className="text-white text-xl mt-4">¡Conexión con YouTube completada! Puedes continuar.</p>
      )}

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
