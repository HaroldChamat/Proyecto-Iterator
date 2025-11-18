// src/App.tsx
// OPCIÓN 2: Con Tabs en la parte superior (Sin necesidad de React Router)

import React, { useState } from 'react';
import { CheckCircle, XCircle, BookOpen, Home } from 'lucide-react';
import IteratorPatternDemo from './components/IteratorPatternDemo';
import WithoutIteratorDemo from './components/WithoutIteratorDemo';

type View = 'home' | 'with' | 'without';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  return (
    <div className="App min-h-screen bg-gray-50">
      {/* Navegación con Tabs */}
      <nav className="bg-white shadow-lg border-b-4 border-indigo-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800 hidden md:block">
                Patrón Iterator - Comparación
              </h1>
              <h1 className="text-xl font-bold text-gray-800 md:hidden">
                Iterator Pattern
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  currentView === 'home'
                    ? 'bg-gray-700 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Inicio</span>
              </button>
              
              <button
                onClick={() => setCurrentView('with')}
                className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  currentView === 'with'
                    ? 'bg-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                <span className="hidden sm:inline">CON Patrón</span>
                <span className="sm:hidden">CON</span>
              </button>
              
              <button
                onClick={() => setCurrentView('without')}
                className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  currentView === 'without'
                    ? 'bg-red-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <XCircle className="w-5 h-5" />
                <span className="hidden sm:inline">SIN Patrón</span>
                <span className="sm:hidden">SIN</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main>
        {currentView === 'home' && <HomePage setView={setCurrentView} />}
        {currentView === 'with' && <IteratorPatternDemo />}
        {currentView === 'without' && <WithoutIteratorDemo />}
      </main>
    </div>
  );
}

interface HomePageProps {
  setView: (view: View) => void;
}

function HomePage({ setView }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Comparación del Patrón Iterator
          </h1>
          <p className="text-xl text-gray-600">
            Explora las diferencias entre usar y no usar el patrón de diseño
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Card CON Patrón */}
          <button
            onClick={() => setView('with')}
            className="block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden border-4 border-indigo-200 text-left"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
              <CheckCircle className="w-16 h-16 mb-4" />
              <h2 className="text-3xl font-bold mb-2">CON Patrón Iterator</h2>
              <p className="text-indigo-100">Código profesional y escalable</p>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-lg mb-3 text-gray-800">✨ Ventajas:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Bajo acoplamiento entre componentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Código reutilizable y mantenible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Cumple principios SOLID</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Fácil de extender y testear</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>15+ tipos de iteradores</span>
                </li>
              </ul>
              
              <div className="mt-6 p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-800">
                  <strong>Arquitectura:</strong> 5 clases especializadas, interfaces bien definidas
                </p>
              </div>

              <div className="mt-4 text-center">
                <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium">
                  Ver Demostración →
                </span>
              </div>
            </div>
          </button>

          {/* Card SIN Patrón */}
          <button
            onClick={() => setView('without')}
            className="block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden border-4 border-red-200 text-left"
          >
            <div className="bg-gradient-to-br from-red-500 to-orange-600 p-6 text-white">
              <XCircle className="w-16 h-16 mb-4" />
              <h2 className="text-3xl font-bold mb-2">SIN Patrón Iterator</h2>
              <p className="text-red-100">Código acoplado y problemático</p>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-lg mb-3 text-gray-800">⚠️ Problemas:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Alto acoplamiento y dependencias</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Código duplicado extensivamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Violación de principios SOLID</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Difícil de mantener y extender</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Switch case gigante en UI</span>
                </li>
              </ul>
              
              <div className="mt-6 p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Arquitectura:</strong> 1 clase monolítica, lógica mezclada con UI
                </p>
              </div>

              <div className="mt-4 text-center">
                <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                  Ver Problemas →
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;