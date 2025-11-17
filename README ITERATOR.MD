# 📚 Patrón Iterator - Sistema de Biblioteca Digital

## 📋 Planteamiento del Problema

### Contexto
Una biblioteca digital moderna gestiona miles de recursos diversos (libros, revistas, audiolibros) y necesita proporcionar a sus usuarios múltiples formas de explorar y navegar por su catálogo. Los usuarios tienen diferentes necesidades:

- **Estudiantes** buscan recursos por categoría académica
- **Investigadores** necesitan ordenar por fecha de publicación
- **Lectores casuales** prefieren descubrir contenido por popularidad o calificación
- **Usuarios móviles** requieren navegación paginada para mejorar la experiencia

### Desafíos Identificados

1. **Acoplamiento fuerte**: El código cliente estaba directamente acoplado a la estructura interna de las colecciones
2. **Duplicación de lógica**: Cada tipo de navegación requería reimplementar la lógica de recorrido
3. **Falta de flexibilidad**: Agregar nuevas formas de iterar requería modificar el código existente
4. **Manejo de estado complejo**: Gestionar múltiples posiciones de iteración era propenso a errores

### Requisitos del Sistema

- ✅ Recorrer colecciones sin exponer su representación interna
- ✅ Soportar múltiples algoritmos de recorrido simultáneamente
- ✅ Proporcionar navegación bidireccional (adelante/atrás)
- ✅ Permitir filtrado dinámico sin modificar la colección original
- ✅ Implementar paginación eficiente
- ✅ Mantener historial de navegación
- ✅ Garantizar extensibilidad para futuros tipos de iteración

### Solución: Patrón Iterator

El patrón Iterator proporciona una forma de acceder secuencialmente a los elementos de una colección sin exponer su representación subyacente. Este proyecto implementa una solución completa que:

- Desacopla los algoritmos de recorrido de la colección
- Permite múltiples iteraciones simultáneas e independientes
- Facilita la adición de nuevos tipos de iteradores sin modificar código existente
- Mantiene el principio de responsabilidad única

---

## 🎯 Descripción del Proyecto

Sistema interactivo de biblioteca digital que demuestra la implementación del **Patrón de Diseño Iterator** utilizando TypeScript y React. El proyecto permite explorar una colección de recursos bibliográficos mediante diferentes estrategias de iteración.

### ✨ Características Principales

- 🔄 **Múltiples tipos de iteradores**
  - Forward Iterator (navegación estándar)
  - Reverse Iterator (navegación inversa)
  - Filtered Iterator (con filtros dinámicos)
  - Paginated Iterator (navegación por páginas)
  
- 🎨 **Interfaz interactiva**
  - Panel de control de iteradores
  - Visualización en tiempo real del recurso actual
  - Historial completo de navegación
  - Estadísticas de uso detalladas

- 📊 **Tipos de ordenamiento**
  - Por categoría
  - Por autor
  - Por fecha de publicación
  - Por popularidad
  - Por calificación

- 🔍 **Filtros disponibles**
  - Solo libros
  - Solo revistas
  - Solo audiolibros
  - Alta calificación (≥4.0)
  - Publicaciones recientes (últimos 2 años)
  - Contenido popular (≥80% popularidad)

---

## 🏗️ Arquitectura del Proyecto

```
src/
├── collections/
│   └── DigitalLibrary.ts          # Colección iterable principal
├── interfaces/
│   ├── Iterator.interface.ts       # Contrato del iterador
│   ├── IterableCollection.interface.ts
│   └── Resource.interface.ts       # Modelo de recurso
├── iterators/
│   ├── BidirectionalIterator.ts   # Iterador bidireccional base
│   ├── ReverseIterator.ts         # Iterador inverso
│   ├── FilteredIterator.ts        # Iterador con filtros
│   └── PaginatedIterator.ts       # Iterador paginado
├── data/
│   └── sampleData.ts              # Datos de ejemplo
├── components/
│   └── IteratorPatternDemo.tsx    # Componente principal UI
├── App.tsx
└── index.tsx
```

---

## 🔧 Componentes Principales

### 1. **Iterator Interface** (`Iterator.interface.ts`)
Define el contrato que deben cumplir todos los iteradores:

```typescript
interface Iterator<T> {
  next(): T | null;           // Avanza al siguiente elemento
  hasNext(): boolean;         // Verifica si hay más elementos
  previous(): T | null;       // Retrocede al elemento anterior
  hasPrevious(): boolean;     // Verifica si se puede retroceder
  current(): T | null;        // Obtiene el elemento actual
  reset(): void;              // Reinicia la iteración
  skip(count: number): void;  // Salta elementos
  getPosition(): number;      // Posición actual
  getTotalSize(): number;     // Tamaño total
}
```

### 2. **DigitalLibrary** (`DigitalLibrary.ts`)
Colección principal que implementa el patrón Factory para crear iteradores:

```typescript
class DigitalLibrary implements IterableCollection<Resource> {
  createIterator(type: string, options?: any): Iterator<Resource>
  addResource(resource: Resource): void
  removeResource(id: string): boolean
  getSize(): number
  getIteratorStats(): Map<string, number>
}
```

### 3. **Implementaciones de Iteradores**

#### **BidirectionalIterator**
- Navegación adelante y atrás
- Base para otros iteradores especializados
- Gestión de posición y límites

#### **ReverseIterator**
- Recorrido inverso de la colección
- Comienza desde el último elemento
- Mantiene semántica consistente

#### **FilteredIterator**
- Aplica función de filtrado
- Hereda de BidirectionalIterator
- Filtra en tiempo de construcción

#### **PaginatedIterator**
- Divide colección en páginas
- Navegación por bloques de elementos
- Métodos adicionales para gestión de páginas

---

## 🎮 Funcionalidades de la UI

### Panel de Control
- Selector de tipo de iterador (15+ opciones)
- Botones de navegación (Siguiente/Anterior/Saltar)
- Modo Auto-Play (navegación automática cada 2s)
- Botón de reinicio

### Visualización de Recursos
- Título y autor del recurso actual
- Categoría y tipo (libro/revista/audiobook)
- Fecha de publicación
- Páginas (cuando aplica)
- Calificación con estrellas
- Barra de popularidad

### Historial de Navegación
- Lista completa de recursos visitados
- Indicador del recurso activo
- Ordenamiento temporal
- Información resumida de cada recurso

### Panel de Estadísticas
- Progreso de la iteración (%)
- Tipo de iterador activo
- Elementos totales en la iteración
- Recursos únicos visitados
- Contador de saltos y retrocesos

---

## 💻 Tecnologías Utilizadas

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño
- **Lucide React** - Iconografía
- **Create React App** - Configuración base

---

## 🚀 Instalación y Uso

### Prerrequisitos
```bash
Node.js >= 14.x
npm >= 6.x
```

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Navegar al directorio
cd iterator-pattern-library

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

### Scripts Disponibles
```bash
npm start          # Inicia el servidor de desarrollo
npm run build      # Construye la aplicación para producción
npm test           # Ejecuta las pruebas
npm run eject      # Expone la configuración (irreversible)
```

---

## 📚 Patrones de Diseño Implementados

### 1. **Iterator Pattern** (Principal)
- Desacopla algoritmos de recorrido de la colección
- Permite múltiples iteraciones simultáneas
- Encapsula la lógica de navegación

### 2. **Factory Pattern**
- Método `createIterator()` actúa como factory
- Centraliza la creación de diferentes tipos de iteradores
- Facilita la extensibilidad

### 3. **Strategy Pattern**
- Diferentes estrategias de iteración intercambiables
- Función de filtrado como estrategia en `FilteredIterator`

---

## 🎓 Conceptos Demostrados

### Principios SOLID
- **Single Responsibility**: Cada iterador tiene una responsabilidad única
- **Open/Closed**: Extendible sin modificar código existente
- **Liskov Substitution**: Todos los iteradores son intercambiables
- **Interface Segregation**: Interfaces específicas y cohesivas
- **Dependency Inversion**: Dependencia de abstracciones (interfaces)

### Ventajas del Patrón Iterator
1. ✅ Acceso uniforme a diferentes estructuras de datos
2. ✅ Múltiples recorridos simultáneos independientes
3. ✅ Simplifica la interfaz de la colección
4. ✅ Facilita cambios en algoritmos de recorrido
5. ✅ Separa responsabilidades claramente

---

## 🔄 Flujo de Operación

```
1. Usuario selecciona tipo de iterador
   ↓
2. DigitalLibrary.createIterator() crea instancia
   ↓
3. Iterator inicializado con colección filtrada/ordenada
   ↓
4. Usuario navega usando next()/previous()
   ↓
5. UI actualiza visualización en tiempo real
   ↓
6. Historial y estadísticas se actualizan
```

---

## 🧪 Casos de Uso Reales

### Caso 1: Exploración por Categoría
```typescript
// Estudiante busca libros de programación
const iterator = library.createIterator('byCategory');
while (iterator.hasNext()) {
  const resource = iterator.next();
  if (resource.category === 'Programación') {
    // Mostrar recurso
  }
}
```

### Caso 2: Recomendaciones Personalizadas
```typescript
// Sistema de recomendaciones
const iterator = library.createIterator('highRated');
const recommendations = [];
for (let i = 0; i < 5 && iterator.hasNext(); i++) {
  recommendations.push(iterator.next());
}
```

### Caso 3: Navegación Móvil
```typescript
// Vista paginada para dispositivos móviles
const iterator = library.createIterator('paginated', { pageSize: 3 });
const page = iterator.getCurrentPage(); // [resource1, resource2, resource3]
```

---

## 🌟 Extensibilidad

### Agregar Nuevo Tipo de Iterator

1. **Crear clase de iterador**:
```typescript
export class CustomIterator implements Iterator<Resource> {
  // Implementar métodos requeridos
}
```

2. **Registrar en DigitalLibrary**:
```typescript
case 'custom':
  return new CustomIterator(this.resources, options);
```

3. **Agregar a UI**:
```typescript
<option value="custom">Mi Iterator Personalizado</option>
```

---

## 📊 Datos de Ejemplo

El proyecto incluye 20 recursos de muestra:
- 📘 **13 Libros**: Programación, ficción, negocios, autoayuda
- 📰 **5 Revistas**: Tecnología, ciencia
- 🎧 **2 Audiolibros**: Estrategia, mindfulness

Cada recurso incluye:
- Título, autor, categoría
- Fecha de publicación
- Rating (1-5 estrellas)
- Popularidad (0-100%)
- ISBN (para libros)
- Número de páginas

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---
