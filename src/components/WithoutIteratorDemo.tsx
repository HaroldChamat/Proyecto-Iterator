import React, { useState, useEffect } from 'react';
import { Book, Library, Bookmark, ChevronLeft, ChevronRight, Filter, RotateCcw, Play, Pause, BarChart3 } from 'lucide-react';


interface Resource {
  id: string;
  title: string;
  author: string;
  category: string;
  publishDate: Date;
  popularity: number;
  type: 'book' | 'magazine' | 'audiobook';
  isbn?: string;
  pages?: number;
  rating?: number;
}

const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Gang of Four',
    category: 'Programación',
    publishDate: new Date('1994-10-21'),
    popularity: 95,
    type: 'book',
    isbn: '978-0201633610',
    pages: 395,
    rating: 4.7
  },
  {
    id: '2',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'Programación',
    publishDate: new Date('2008-08-01'),
    popularity: 98,
    type: 'book',
    isbn: '978-0132350884',
    pages: 464,
    rating: 4.8
  },
  {
    id: '3',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    category: 'Programación',
    publishDate: new Date('2008-05-01'),
    popularity: 85,
    type: 'book',
    rating: 4.3
  },
  {
    id: '4',
    title: 'Tech Monthly - Edición Enero 2024',
    author: 'Varios Autores',
    category: 'Revista Tecnología',
    publishDate: new Date('2024-01-01'),
    popularity: 72,
    type: 'magazine',
    pages: 80,
    rating: 3.9
  },
  {
    id: '5',
    title: 'El Arte de la Guerra',
    author: 'Sun Tzu',
    category: 'Estrategia',
    publishDate: new Date('2010-03-15'),
    popularity: 88,
    type: 'audiobook',
    rating: 4.6
  },
  {
    id: '6',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Psicología',
    publishDate: new Date('2011-10-25'),
    popularity: 91,
    type: 'book',
    pages: 499,
    rating: 4.5
  },
  {
    id: '7',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'Historia',
    publishDate: new Date('2014-02-10'),
    popularity: 96,
    type: 'book',
    pages: 443,
    rating: 4.9
  },
  {
    id: '8',
    title: 'Code Magazine - Especial IA',
    author: 'Tech Publishers',
    category: 'Revista Tecnología',
    publishDate: new Date('2024-06-01'),
    popularity: 68,
    type: 'magazine',
    rating: 4.1
  }
];

// ========================================
// BIBLIOTECA SIN PATRÓN - CÓDIGO ACOPLADO
// ========================================
class LibraryWithoutPattern {
  private resources: Resource[] = [];

  addResource(resource: Resource) {
    this.resources.push(resource);
  }

  getResources() {
    return [...this.resources];
  }

  
  getResourceByIndex(index: number): Resource | undefined {
    return this.resources[index];
  }

  getTotalResources(): number {
    return this.resources.length;
  }

  
  getResourcesSortedByAuthor(): Resource[] {
    return [...this.resources].sort((a, b) => a.author.localeCompare(b.author));
  }

  getResourcesSortedByCategory(): Resource[] {
    return [...this.resources].sort((a, b) => a.category.localeCompare(b.category));
  }

  getResourcesSortedByDate(): Resource[] {
    return [...this.resources].sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  }

  
  getBooksOnly(): Resource[] {
    return this.resources.filter(r => r.type === 'book');
  }

  getHighRatedResources(): Resource[] {
    return this.resources.filter(r => (r.rating || 0) >= 4.0);
  }

  getRecentResources(): Resource[] {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    return this.resources.filter(r => r.publishDate >= twoYearsAgo);
  }
}

export default function WithoutIteratorDemo() {
  const [library] = useState(() => {
    const lib = new LibraryWithoutPattern();
    sampleResources.forEach(r => lib.addResource(r));
    return lib;
  });

  const [iterationType, setIterationType] = useState('forward');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentList, setCurrentList] = useState<Resource[]>([]);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  const [history, setHistory] = useState<Resource[]>([]);
  const [isIterating, setIsIterating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [stats, setStats] = useState({ visited: 0, backwards: 0 });

  
  useEffect(() => {
    if (autoPlay && currentIndex < currentList.length - 1) {
      const timer = setTimeout(() => {
        handleNext();
      }, 2000);
      return () => clearTimeout(timer);
    } else if (autoPlay && currentIndex >= currentList.length - 1) {
      setAutoPlay(false);
    }
  }, [autoPlay, currentIndex, currentList]);

  
  const startIteration = () => {
    let list: Resource[];
    
    
    switch (iterationType) {
      case 'forward':
        list = library.getResources();
        break;
      case 'reverse':
        list = [...library.getResources()].reverse();
        break;
      case 'byAuthor':
        list = library.getResourcesSortedByAuthor();
        break;
      case 'byCategory':
        list = library.getResourcesSortedByCategory();
        break;
      case 'byDate':
        list = library.getResourcesSortedByDate();
        break;
      case 'booksOnly':
        list = library.getBooksOnly();
        break;
      case 'highRated':
        list = library.getHighRatedResources();
        break;
      case 'recent':
        list = library.getRecentResources();
        break;
      default:
        list = library.getResources();
    }

    setCurrentList(list);
    setCurrentIndex(-1);
    setHistory([]);
    setIsIterating(true);
    setStats({ visited: 0, backwards: 0 });
    
    
    if (list.length > 0) {
      setCurrentIndex(0);
      setCurrentResource(list[0]);
      setHistory([list[0]]);
      setStats(prev => ({ ...prev, visited: 1 }));
    }
  };

  
  const handleNext = () => {
    if (currentIndex < currentList.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      const resource = currentList[newIndex];
      setCurrentResource(resource);
      
      if (!history.find(r => r.id === resource.id)) {
        setHistory(prev => [...prev, resource]);
        setStats(prev => ({ ...prev, visited: prev.visited + 1 }));
      }
    }
  };

 
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentResource(currentList[newIndex]);
      setStats(prev => ({ ...prev, backwards: prev.backwards + 1 }));
    }
  };

  
  const handleSkip = () => {
    const newIndex = Math.min(currentIndex + 2, currentList.length - 1);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setCurrentResource(currentList[newIndex]);
    }
  };

  const handleReset = () => {
    setCurrentIndex(-1);
    setCurrentList([]);
    setCurrentResource(null);
    setHistory([]);
    setIsIterating(false);
    setAutoPlay(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'magazine': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'audiobook': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  
  const hasNext = currentIndex < currentList.length - 1;
  const hasPrevious = currentIndex > 0;
  const progress = currentList.length > 0 ? ((currentIndex + 1) / currentList.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header con advertencia */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Library className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-800">SIN Patrón Iterator</h1>
          </div>
          <p className="text-gray-600 mb-2">Código Acoplado y Duplicado</p>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Control Panel */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-5 border-2 border-red-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-red-600" />
              Control Manual
            </h2>

            <div className="space-y-4">
              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Recorrido
                </label>
                <select
                  value={iterationType}
                  onChange={(e) => setIterationType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                  disabled={isIterating}
                >
                  <optgroup label="Básicos">
                    <option value="forward">Forward (Manual)</option>
                    <option value="reverse">Reverse (Manual)</option>
                  </optgroup>
                  <optgroup label="Con Ordenamiento">
                    <option value="byCategory">Por Categoría</option>
                    <option value="byAuthor">Por Autor</option>
                    <option value="byDate">Por Fecha</option>
                  </optgroup>
                  <optgroup label="Con Filtros">
                    <option value="booksOnly">Solo Libros</option>
                    <option value="highRated">Alta Calificación</option>
                    <option value="recent">Recientes</option>
                  </optgroup>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={startIteration}
                  disabled={isIterating}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 text-sm font-medium transition-colors"
                >
                  Iniciar
                </button>
                <button
                  onClick={handleReset}
                  disabled={!isIterating}
                  className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-300 text-sm font-medium transition-colors"
                >
                  Reiniciar
                </button>
              </div>

              {isIterating && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={handlePrevious}
                      disabled={!hasPrevious}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Atrás
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!hasNext}
                      className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 text-sm font-medium flex items-center justify-center gap-1"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleSkip}
                      disabled={!hasNext}
                      className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 disabled:bg-gray-300 text-sm font-medium"
                    >
                      +2
                    </button>
                  </div>

                  <button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className={`w-full ${autoPlay ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2`}
                  >
                    {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {autoPlay ? 'Pausar' : 'Auto-Play'}
                  </button>
                </>
              )}

              {currentResource && (
                <div className="mt-4 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-300">
                  <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2 text-sm">
                    <Bookmark className="w-4 h-4" />
                    Recurso Actual
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-gray-800 text-sm">{currentResource.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(currentResource.type)}`}>
                        {currentResource.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{currentResource.author}</p>
                    <p className="text-xs text-gray-600">{currentResource.category}</p>
                    {currentResource.rating && (
                      <p className="text-xs text-gray-600">⭐ {currentResource.rating.toFixed(1)}</p>
                    )}
                  </div>
                </div>
              )}

              {isIterating && (
                <div className="space-y-2">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs">
                    <p className="text-yellow-800">
                      <strong>Posición:</strong> {currentIndex + 1} / {currentList.length}
                    </p>
                    <p className="text-yellow-800">
                      <strong>Estado:</strong> {hasNext ? 'Más recursos' : 'Fin'}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs">
                    <p className="text-green-800 font-semibold mb-1">Estadísticas</p>
                    <p className="text-green-700">Visitados: {stats.visited}</p>
                    <p className="text-green-700">Retrocesos: {stats.backwards}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* History Panel */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <RotateCcw className="w-6 h-6 text-red-600" />
                Historial
              </span>
              <span className="text-sm font-normal text-gray-500">
                {history.length} recursos
              </span>
            </h2>

            {history.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Library className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Inicia un recorrido</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {history.map((resource, index) => (
                  <div
                    key={`${resource.id}-${index}`}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      currentResource?.id === resource.id
                        ? 'bg-red-100 border-red-400 shadow-md'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 bg-red-600 text-white rounded-full text-xs font-bold">
                          {index + 1}
                        </span>
                        <h3 className="font-semibold text-gray-800 text-sm">{resource.title}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 ml-8">{resource.author}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Problems Panel */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-5 border-2 border-red-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-red-600" />
              Problemas Detectados
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                <h3 className="font-bold text-red-900 mb-2 text-sm">❌ Acoplamiento Fuerte</h3>
                <p className="text-xs text-red-800">
                  El componente UI conoce TODA la lógica de iteración. Cambiar el algoritmo requiere modificar múltiples lugares.
                </p>
              </div>

              <div className="p-4 bg-orange-50 border-2 border-orange-300 rounded-lg">
                <h3 className="font-bold text-orange-900 mb-2 text-sm">❌ Código Duplicado</h3>
                <p className="text-xs text-orange-800">
                  Cada tipo de ordenamiento/filtro tiene su propio método en la biblioteca. Agregar nuevos tipos = más código duplicado.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                <h3 className="font-bold text-yellow-900 mb-2 text-sm">❌ Sin Encapsulación</h3>
                <p className="text-xs text-yellow-800">
                  La estructura interna (array, índices) está expuesta. No hay abstracción de la navegación.
                </p>
              </div>

              <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
                <h3 className="font-bold text-purple-900 mb-2 text-sm">❌ Difícil de Mantener</h3>
                <p className="text-xs text-purple-800">
                  Agregar un nuevo tipo de iteración requiere:
                  • Nuevo método en LibraryWithoutPattern
                  • Nuevo case en el switch
                  • Modificar la lógica de navegación
                </p>
              </div>

              <div className="p-4 bg-pink-50 border-2 border-pink-300 rounded-lg">
                <h3 className="font-bold text-pink-900 mb-2 text-sm">❌ Violación de SOLID</h3>
                <ul className="text-xs text-pink-800 list-disc ml-4">
                  <li>Single Responsibility: La clase hace demasiado</li>
                  <li>Open/Closed: Cerrada para extensión</li>
                  <li>Dependency Inversion: Depende de implementaciones</li>
                </ul>
              </div>

              {isIterating && (
                <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200">
                  <h3 className="font-bold text-red-900 mb-3 text-sm">Estado Actual</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Progreso:</span>
                      <span className="font-bold text-red-900">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-700">Tipo:</span>
                      <span className="font-bold text-red-900">{iterationType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Elementos:</span>
                      <span className="font-bold text-red-900">{currentList.length}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}