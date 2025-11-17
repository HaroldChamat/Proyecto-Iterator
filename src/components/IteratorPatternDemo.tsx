
import React, { useState, useEffect } from 'react';
import { Book, Library, Bookmark, ChevronLeft, ChevronRight, Filter, User, Calendar, TrendingUp, SkipForward, RotateCcw, Play, Pause, RefreshCw, BarChart3, Layers } from 'lucide-react';
import { DigitalLibrary } from '../collections/DigitalLibrary';
import { Iterator } from '../interfaces/Iterator.interface';
import { Resource } from '../interfaces/Resource.interface';
import { sampleResources } from '../data/sampleData';


export default function IteratorPatternDemo() {
  
  const [library] = useState(() => {
    const lib = new DigitalLibrary();
    sampleResources.forEach(r => lib.addResource(r));
    return lib;
  });


  const [iteratorType, setIteratorType] = useState('forward');
  const [currentIterator, setCurrentIterator] = useState<Iterator<Resource> | null>(null);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  const [iterationHistory, setIterationHistory] = useState<Resource[]>([]);
  const [isIterating, setIsIterating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [stats, setStats] = useState({ visited: 0, skipped: 0, backwards: 0 });
  const [showPaginated, setShowPaginated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Resource[]>([]);

  
  useEffect(() => {
    if (autoPlay && currentIterator && currentIterator.hasNext()) {
      const timer = setTimeout(() => {
        nextResource();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, currentResource, currentIterator]);


  const startIteration = () => {
    const options = iteratorType === 'paginated' ? { pageSize: 3 } : undefined;
    
    
    const iterator = library.createIterator(iteratorType, options);
    setCurrentIterator(iterator);
    setIterationHistory([]);
    setIsIterating(true);
    setStats({ visited: 0, skipped: 0, backwards: 0 });
    
    
    const first = iterator.next();
    setCurrentResource(first);
    
    
    if (iteratorType === 'paginated') {
      setShowPaginated(true);
      const paginatedIter = iterator as any;
      if (paginatedIter.getCurrentPage) {
        setCurrentPage(paginatedIter.getCurrentPage());
      }
    } else {
      setShowPaginated(false);
    }
    
    if (first) {
      setIterationHistory([first]);
      setStats(prev => ({ ...prev, visited: 1 }));
    }
  };

  
  const nextResource = () => {
    if (currentIterator && currentIterator.hasNext()) {
      const resource = currentIterator.next();
      setCurrentResource(resource);
      
      
      if (iteratorType === 'paginated') {
        const paginatedIter = currentIterator as any;
        if (paginatedIter.getCurrentPage) {
          setCurrentPage(paginatedIter.getCurrentPage());
        }
      }
      
      
      if (resource && !iterationHistory.find(r => r.id === resource.id)) {
        setIterationHistory(prev => [...prev, resource]);
        setStats(prev => ({ ...prev, visited: prev.visited + 1 }));
      }
    } else {
      setAutoPlay(false);
    }
  };

  
  const previousResource = () => {
    if (currentIterator && currentIterator.hasPrevious()) {
      const resource = currentIterator.previous();
      setCurrentResource(resource);
      
      if (iteratorType === 'paginated') {
        const paginatedIter = currentIterator as any;
        if (paginatedIter.getCurrentPage) {
          setCurrentPage(paginatedIter.getCurrentPage());
        }
      }
      
      setStats(prev => ({ ...prev, backwards: prev.backwards + 1 }));
    }
  };

  
  const skipResources = () => {
    if (currentIterator) {
      currentIterator.skip(2);
      const resource = currentIterator.current();
      setCurrentResource(resource);
      
      if (iteratorType === 'paginated') {
        const paginatedIter = currentIterator as any;
        if (paginatedIter.getCurrentPage) {
          setCurrentPage(paginatedIter.getCurrentPage());
        }
      }
      
      setStats(prev => ({ ...prev, skipped: prev.skipped + 2 }));
    }
  };

  
  const resetIteration = () => {
    if (currentIterator) {
      currentIterator.reset();
      setCurrentResource(null);
      setIterationHistory([]);
      setIsIterating(false);
      setAutoPlay(false);
      setShowPaginated(false);
      setCurrentPage([]);
    }
  };

  /**
   * Utilidad: Obtiene color según tipo de recurso
   */
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'magazine': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'audiobook': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  /**
   * Utilidad: Obtiene descripción del tipo de iterator
   */
  const getIteratorDescription = (type: string) => {
    const descriptions: Record<string, string> = {
      forward: 'Recorre la colección de principio a fin',
      reverse: 'Recorre la colección de fin a principio',
      byCategory: 'Ordena alfabéticamente por categoría',
      byAuthor: 'Ordena alfabéticamente por autor',
      byDate: 'Ordena por fecha de publicación (recientes primero)',
      byPopularity: 'Ordena por nivel de popularidad',
      booksOnly: 'Filtra solo libros',
      highRated: 'Filtra recursos con rating ≥ 4.0',
      recent: 'Filtra publicaciones de últimos 2 años',
      paginated: 'Muestra 3 recursos por página',
      byRating: 'Ordena por calificación (mejor primero)'
    };
    return descriptions[type] || 'Iterator personalizado';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Library className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Patrón Iterator</h1>
          </div>
          <p className="text-gray-600">Sistema de Biblioteca Digital</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Control Panel */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-indigo-600" />
              Control de Iteradores
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Iterator
                </label>
                <select
                  value={iteratorType}
                  onChange={(e) => setIteratorType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                  disabled={isIterating}
                >
                  <optgroup label="Básicos">
                    <option value="forward">Forward Iterator</option>
                    <option value="reverse">Reverse Iterator</option>
                  </optgroup>
                  <optgroup label="Con Ordenamiento">
                    <option value="byCategory">Por Categoría</option>
                    <option value="byAuthor">Por Autor</option>
                    <option value="byDate">Por Fecha</option>
                    <option value="byPopularity">Por Popularidad</option>
                    <option value="byRating">Por Calificación</option>
                  </optgroup>
                  <optgroup label="Con Filtros">
                    <option value="booksOnly">Solo Libros</option>
                    <option value="highRated">Alta Calificación (≥4.0)</option>
                    <option value="recent">Recientes (2 años)</option>
                  </optgroup>
                  <optgroup label="Especiales">
                    <option value="paginated">Paginado (3/página)</option>
                  </optgroup>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {getIteratorDescription(iteratorType)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={startIteration}
                  disabled={isIterating}
                  className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 text-sm font-medium transition-colors"
                >
                  Iniciar
                </button>
                <button
                  onClick={resetIteration}
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
                      onClick={previousResource}
                      disabled={!currentIterator?.hasPrevious()}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Atrás
                    </button>
                    <button
                      onClick={nextResource}
                      disabled={!currentIterator?.hasNext()}
                      className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 text-sm font-medium flex items-center justify-center gap-1"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={skipResources}
                      disabled={!currentIterator?.hasNext()}
                      className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 disabled:bg-gray-300 text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <SkipForward className="w-4 h-4" />
                      +2
                    </button>
                  </div>

                  <button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className={`w-full ${autoPlay ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2`}
                  >
                    {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {autoPlay ? 'Pausar Auto-Play' : 'Auto-Play (2s)'}
                  </button>
                </>
              )}

              {/* Current Resource Display */}
              {currentResource && (
                <div className="mt-4 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-300">
                  <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2 text-sm">
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
                    <p className="text-xs text-gray-600">{currentResource.publishDate.toLocaleDateString()}</p>
                    {currentResource.pages && (
                      <p className="text-xs text-gray-600">{currentResource.pages} páginas</p>
                    )}
                    {currentResource.rating && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">⭐ {currentResource.rating.toFixed(1)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${currentResource.popularity}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {currentResource.popularity}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Paginated View */}
              {showPaginated && currentPage.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-2 text-sm">Página Actual</h3>
                  <div className="space-y-2">
                    {currentPage.map((resource, idx) => (
                      <div key={resource.id} className="p-2 bg-white rounded border border-blue-200 text-xs">
                        <span className="font-medium">{idx + 1}. {resource.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Iterator Status */}
              {isIterating && currentIterator && (
                <div className="space-y-2">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs">
                    <p className="text-yellow-800">
                      <strong>Posición:</strong> {currentIterator.getPosition() + 1} / {currentIterator.getTotalSize()}
                    </p>
                    <p className="text-yellow-800">
                      <strong>Estado:</strong> {currentIterator.hasNext() ? 'Más recursos' : 'Fin'}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs">
                    <p className="text-green-800 font-semibold mb-1">Elementos</p>
                    <p className="text-green-700">Visitados: {stats.visited}</p>
                    <p className="text-green-700">Saltados: {stats.skipped}</p>
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
                <RefreshCw className="w-6 h-6 text-indigo-600" />
                Historial
              </span>
              <span className="text-sm font-normal text-gray-500">
                {iterationHistory.length} recursos
              </span>
            </h2>

            {iterationHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Library className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Inicia una iteración para ver el historial</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {iterationHistory.map((resource, index) => (
                  <div
                    key={`${resource.id}-${index}`}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      currentResource?.id === resource.id
                        ? 'bg-indigo-100 border-indigo-400 shadow-md'
                        : 'bg-gray-50 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full text-xs font-bold">
                          {index + 1}
                        </span>
                        <h3 className="font-semibold text-gray-800 text-sm">{resource.title}</h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 ml-8">
                      {resource.author} • {resource.category}
                    </p>
                    {resource.rating && (
                      <p className="text-xs text-gray-600 ml-8">⭐ {resource.rating.toFixed(1)}</p>
                    )}
                    <div className="flex items-center gap-2 ml-8 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-indigo-600 h-1 rounded-full transition-all"
                          style={{ width: `${resource.popularity}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{resource.popularity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats Panel */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              Estadísticas
            </h2>

            <div className="space-y-4">
              {/* Real Usage Stats */}
              {isIterating && currentIterator ? (
                <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-3 text-sm">Estadisticas</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Progreso:</span>
                      <span className="font-bold text-orange-900">
                        {Math.round(((currentIterator.getPosition() + 1) / currentIterator.getTotalSize()) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ 
                          width: `${((currentIterator.getPosition() + 1) / currentIterator.getTotalSize()) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-700">Tipo Iterator:</span>
                      <span className="font-bold text-orange-900">{iteratorType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Elementos totales:</span>
                      <span className="font-bold text-orange-900">{currentIterator.getTotalSize()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Recorridos únicos:</span>
                      <span className="font-bold text-orange-900">{iterationHistory.length}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <BarChart3 className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Inicia una iteración para ver estadísticas</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}