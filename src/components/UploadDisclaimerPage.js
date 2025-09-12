import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // para navegación entre páginas

export default function UploadDisclaimerPage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    if (profile) setUserProfile(profile);
    else navigate("/"); // si no hay sesión, volver a landing
  }, [navigate]);

  const handleContinue = () => {
    if (agreed) {
      navigate("/upload"); // página donde se suben los videos
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#03245C] p-6">
      {/* Avatar arriba a la derecha */}
      {userProfile && (
        <img
          src={userProfile.picture}
          alt={userProfile.name}
          className="absolute top-4 right-4 w-10 h-10 rounded-full shadow-md"
          title={userProfile.name}
        />
      )}

      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Bienvenido, {userProfile?.given_name}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Aviso de responsabilidad
        </h2>
        <p className="text-gray-700 mb-4">
          Al subir videos a esta plataforma, confirmas que eres propietario del contenido o tienes permiso explícito para usarlo. Cualquier infracción de derechos de autor es responsabilidad exclusiva del usuario.
        </p>
        <p className="text-gray-700 mb-4">
          Tu contenido será procesado únicamente para fines internos (transcripción, análisis y embeddings) y solo será accesible para ti.
        </p>
        <p className="text-gray-700 mb-4">
          Al continuar, aceptas nuestros <a href="/terms" className="underline text-blue-600">Términos de Servicio</a> y <a href="/privacy" className="underline text-blue-600">Política de Privacidad</a>.
        </p>

        <label className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="text-gray-800">
            Confirmo que soy propietario del contenido o tengo permiso para usarlo. Entiendo que cualquier violación de derechos de autor es mi responsabilidad.
          </span>
        </label>

        <button
          onClick={handleContinue}
          disabled={!agreed}
          className={`mt-6 px-6 py-3 rounded-lg text-white text-lg font-semibold transition ${
            agreed ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
