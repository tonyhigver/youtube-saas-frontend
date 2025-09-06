import React, { useEffect, useState } from "react";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Google login
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false); // YouTube OAuth

  useEffect(() => {
    // Revisar si el usuario ya inició sesión en Google
    const googleLogged = localStorage.getItem("userLoggedIn") === "true";
    setIsLoggedIn(googleLogged);

    // Revisar si backend ya completó YouTube OAuth
    const params = new URLSearchParams(window.location.search);
    if (params.get("loggedIn") === "true") {
      setIsYouTubeConnected(true);
    }

    // Limpiar query params
    window.history.replaceState({}, document.title, "/");

    // Revisar si frontend recibió token de Google (OAuth Flow)
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const token = new URLSearchParams(hash.replace("#", "?")).get("access_token");
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("google_token", token);
      setIsLoggedIn(true);
      window.location.hash = "";
    }
  }, []);

  // OAuth frontend login Google (solo login)
  const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?client_id=771066809924-68rinikvn84dl6stdmniov39uo38emsu.apps.googleusercontent.com&redirect_uri=https://youtube-saas-frontend.vercel.app&response_type=token&scope=openid%20email%20profile";

  // OAuth de YouTube (apunta al backend)
  const clientId = "771066809924-68rinikvn84dl6stdmniov39uo38emsu.apps.googleusercontent.com";
  const redirectUri = "https://youtube-backend.vercel.app/api/oauth-callback";
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

      {/* Botón de Google Sign-In (solo si NO ha iniciado sesión) */}
      {!isLoggedIn && (
        <a
          href={googleAuthUrl}
          className="bg-white text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition mb-4 flex items-center gap-2 shadow-md"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Iniciar sesión con Google
        </a>
      )}

      {/* Botón Conectar con YouTube (siempre visible) */}
      <a
        href={youtubeAuthUrl}
        className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-700 transition drop-shadow-[0_0_10px_rgb(255,0,0)] flex items-center gap-2"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube logo"
          className="w-5 h-5"
        />
        Conectar con YouTube
      </a>

      {/* Mensaje cuando ya completó YouTube OAuth */}
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
