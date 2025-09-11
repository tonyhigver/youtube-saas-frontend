import React, { useState } from "react";
import { motion } from "framer-motion";

// Demo React autónoma para verificación de Google OAuth
// - Simula listado de videos (youtube.readonly)
// - Simula formulario de subida de video (youtube.upload)
// - Incluye páginas de Home, Demo, Privacy y Terms
// - No realiza llamadas reales a Google ni YouTube

export default function YouTubeOAuthDemoSimulado() {
  const [route, setRoute] = useState("home"); // home | demo | privacy | terms
  const [connected, setConnected] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const sampleVideos = [
    { id: "a1", title: "Introducción a mi canal", thumb: "https://via.placeholder.com/320x180?text=Video+1" },
    { id: "a2", title: "Detrás de cámaras: proyecto X", thumb: "https://via.placeholder.com/320x180?text=Video+2" },
    { id: "a3", title: "Tutorial rápido: Y", thumb: "https://via.placeholder.com/320x180?text=Video+3" },
  ];

  function simulateConnect() {
    // Simula conexión con Google/YouTube
    setConnected(true);
  }

  function simulateUpload() {
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.floor(Math.random() * 15) + 10;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            setProgress(0);
            alert("Simulación: video subido correctamente al canal (interfaz demostrativa)");
          }, 400);
          return 100;
        }
        return next;
      });
    }, 400);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-red-600">YouTube Demo Simulado</h1>
            <p className="text-sm text-gray-600 mt-1">Frontend de demostración para verificación de scopes</p>
          </div>
          <nav className="flex gap-3 items-center">
            <button onClick={() => setRoute("home")} className="text-sm px-3 py-1 rounded hover:bg-gray-100">Home</button>
            <button onClick={() => setRoute("demo")} className="text-sm px-3 py-1 rounded hover:bg-gray-100">Demo</button>
            <button onClick={() => setRoute("privacy")} className="text-sm px-3 py-1 rounded hover:bg-gray-100">Privacy</button>
            <button onClick={() => setRoute("terms")} className="text-sm px-3 py-1 rounded hover:bg-gray-100">Terms</button>
            <div className="ml-4">
              {!connected ? (
                <button onClick={simulateConnect} className="bg-white border px-3 py-2 rounded flex items-center gap-2 shadow">
                  <span className="text-sm">Conectar (Simulado)</span>
                </button>
              ) : (
                <div className="text-sm text-green-700">Conectado (Simulado)</div>
              )}
            </div>
          </nav>
        </header>

        {/* ROUTES */}
        {route === "home" && (
          <main className="space-y-6">
            <section className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold">Bienvenido</h2>
              <p className="text-gray-600 mt-2">Usa esta demo para mostrar a Google cómo tu aplicación utilizará los permisos de YouTube. Todo está simulado y no realiza llamadas reales.</p>
              <ul className="mt-3 list-disc ml-5 text-sm text-gray-700">
                <li>Muestra la interfaz de conexión simulada.</li>
                <li>Simula la lista de videos y la subida de contenido.</li>
                <li>Incluye navegación a Privacy y Terms.</li>
              </ul>
            </section>
          </main>
        )}

        {route === "demo" && (
          <main className="space-y-6">
            <section className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold">Flujo de conexión simulado</h2>
              <p className="text-gray-600 mt-2">Haz clic en <strong>Conectar (Simulado)</strong> para activar la demo y mostrar la funcionalidad de gestión de videos.</p>
            </section>

            {/* Video list (youtube.readonly) */}
            <section className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold">📺 Lista de videos (Simulada)</h3>
              <p className="text-sm text-gray-600 mt-2">La aplicación puede listar los videos del usuario para mostrar gestión y estadísticas básicas (simulado).</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleVideos.map((v) => (
                  <article key={v.id} className="bg-gray-50 rounded overflow-hidden border">
                    <img src={v.thumb} alt={v.title} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <h4 className="font-medium text-sm">{v.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">ID: {v.id}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Upload form (youtube.upload) */}
            <section className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold">⬆️ Formulario de subida (Simulado)</h3>
              <p className="text-sm text-gray-600 mt-2">Simulación de subida de videos para la verificación de Google.</p>

              <div className="mt-4 max-w-xl">
                <label className="block text-sm">Título</label>
                <input className="w-full border rounded px-3 py-2 mt-1" placeholder="Mi nuevo video" />

                <label className="block text-sm mt-3">Descripción</label>
                <textarea className="w-full border rounded px-3 py-2 mt-1" rows={4} placeholder="Descripción del video"></textarea>

                <label className="block text-sm mt-3">Archivo de video</label>
                <input type="file" className="mt-1" />

                <div className="mt-4 flex items-center gap-3">
                  <button onClick={simulateUpload} className="px-4 py-2 bg-red-600 text-white rounded" disabled={uploading}>Subir (Simulado)</button>
                  {uploading && (
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                        <div style={{ width: `${progress}%` }} className="h-3 bg-red-600 transition-all" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Progreso: {progress}%</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>
        )}

        {route === "privacy" && (
          <main className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Política de Privacidad (Simulada)</h2>
            <p className="text-sm text-gray-700 mt-3">Esta política de privacidad es un ejemplo para la verificación. Adapta a tu servicio real antes de publicar en producción.</p>
          </main>
        )}

        {route === "terms" && (
          <main className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Términos de Servicio (Simulado)</h2>
            <p className="text-sm text-gray-700 mt-3">Estos términos son un ejemplo para la verificación. Personaliza antes de publicar en producción.</p>
          </main>
        )}

        <footer className="mt-10 text-center text-xs text-gray-500">Demo creada para verificación de OAuth • Simulación total, no realiza llamadas reales</footer>
      </div>
    </div>
  );
}
