

import { IterableCollection } from '../interfaces/IterableCollection.interface';
import { Iterator } from '../interfaces/Iterator.interface';
import { Resource } from '../interfaces/Resource.interface';
import { BidirectionalIterator } from '../iterators/BidirectionalIterator';
import { FilteredIterator } from '../iterators/FilteredIterator';
import { ReverseIterator } from '../iterators/ReverseIterator';
import { PaginatedIterator } from '../iterators/PaginatedIterator';


export class DigitalLibrary implements IterableCollection<Resource> {
  
  private resources: Resource[] = [];
  
  
  private iteratorHistory: Map<string, number> = new Map();


  addResource(resource: Resource): void {
    this.resources.push(resource);
  }


  removeResource(id: string): boolean {
    const initialLength = this.resources.length;
    this.resources = this.resources.filter(r => r.id !== id);
    return this.resources.length < initialLength;
  }


  findResourceById(id: string): Resource | undefined {
    return this.resources.find(r => r.id === id);
  }

 
  createIterator(type: string, options?: any): Iterator<Resource> {
    
    this.iteratorHistory.set(type, (this.iteratorHistory.get(type) || 0) + 1);

    
    switch (type) {
      // ========== ITERADORES BÁSICOS ==========
      
      case 'forward':
        
        return new BidirectionalIterator([...this.resources]);
      
      case 'reverse':
        
        return new ReverseIterator([...this.resources]);
      
      // ========== ITERADORES CON ORDENAMIENTO ==========
      
      case 'byCategory':
       
        const sortedByCategory = [...this.resources].sort((a, b) => 
          a.category.localeCompare(b.category)
        );
        return new BidirectionalIterator(sortedByCategory);
      
      case 'byAuthor':
        
        const sortedByAuthor = [...this.resources].sort((a, b) => 
          a.author.localeCompare(b.author)
        );
        return new BidirectionalIterator(sortedByAuthor);
      
      case 'byDate':
        
        const sortedByDate = [...this.resources].sort((a, b) => 
          b.publishDate.getTime() - a.publishDate.getTime()
        );
        return new BidirectionalIterator(sortedByDate);
      
      case 'byPopularity':
        
        const sortedByPopularity = [...this.resources].sort((a, b) => 
          b.popularity - a.popularity
        );
        return new BidirectionalIterator(sortedByPopularity);
      
      case 'byRating':
        
        const sortedByRating = [...this.resources].sort((a, b) => 
          (b.rating || 0) - (a.rating || 0)
        );
        return new BidirectionalIterator(sortedByRating);
      
      // ========== ITERADORES CON FILTROS ==========
      
      case 'booksOnly':
        
        return new FilteredIterator(
          this.resources, 
          resource => resource.type === 'book'
        );
      
      case 'magazinesOnly':
        
        return new FilteredIterator(
          this.resources,
          resource => resource.type === 'magazine'
        );
      
      case 'audiobooksOnly':
        
        return new FilteredIterator(
          this.resources,
          resource => resource.type === 'audiobook'
        );
      
      case 'highRated':
        
        return new FilteredIterator(
          this.resources, 
          resource => (resource.rating || 0) >= 4.0
        );
      
      case 'recent':
        
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
        return new FilteredIterator(
          this.resources, 
          resource => resource.publishDate >= twoYearsAgo
        );
      
      case 'popular':
        
        return new FilteredIterator(
          this.resources,
          resource => resource.popularity >= 80
        );
      
      // ========== ITERADORES ESPECIALES ==========
      
      case 'paginated':
        
        const pageSize = options?.pageSize || 3;
        return new PaginatedIterator(this.resources, pageSize);
      
      case 'random':
        
        const shuffled = [...this.resources].sort(() => Math.random() - 0.5);
        return new BidirectionalIterator(shuffled);
      
      // ========== ITERADORES COMPUESTOS (Filtro + Orden) ==========
      
      case 'recentBooksHighRated':
        
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const filtered = this.resources.filter(r => 
          r.type === 'book' && 
          r.publishDate >= oneYearAgo && 
          (r.rating || 0) >= 4.5
        );
        const sorted = filtered.sort((a, b) => 
          (b.rating || 0) - (a.rating || 0)
        );
        return new BidirectionalIterator(sorted);
      
      // ========== CASO DEFAULT ==========
      
      default:
        
        console.warn(`Iterator type "${type}" not recognized. Using default.`);
        return new BidirectionalIterator([...this.resources]);
    }
  }


  getSize(): number {
    return this.resources.length;
  }


  getResources(): Resource[] {
    
    return [...this.resources];
  }

  
  getIteratorStats(): Map<string, number> {
    return new Map(this.iteratorHistory);
  }

 
  getMostUsedIteratorType(): string | null {
    if (this.iteratorHistory.size === 0) return null;
    
    let maxCount = 0;
    let maxType = '';
    
    this.iteratorHistory.forEach((count, type) => {
      if (count > maxCount) {
        maxCount = count;
        maxType = type;
      }
    });
    
    return maxType;
  }

 
  clearStats(): void {
    this.iteratorHistory.clear();
  }

 
  getLibraryInfo(): {
    totalResources: number;
    bookCount: number;
    magazineCount: number;
    audiobookCount: number;
    averageRating: number;
  } {
    const bookCount = this.resources.filter(r => r.type === 'book').length;
    const magazineCount = this.resources.filter(r => r.type === 'magazine').length;
    const audiobookCount = this.resources.filter(r => r.type === 'audiobook').length;
    
    const ratings = this.resources
      .map(r => r.rating || 0)
      .filter(r => r > 0);
    const averageRating = ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0;
    
    return {
      totalResources: this.resources.length,
      bookCount,
      magazineCount,
      audiobookCount,
      averageRating
    };
  }
}
