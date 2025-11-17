import { Iterator } from '../interfaces/Iterator.interface';
import { Resource } from '../interfaces/Resource.interface';


export class PaginatedIterator implements Iterator<Resource> {
 
  private currentPage: number = -1;
  private pageSize: number;
  private collection: Resource[];

  
  constructor(collection: Resource[], pageSize: number = 3) {
    this.collection = [...collection];
    this.pageSize = pageSize;
  }

  
  next(): Resource | null {
    const nextPos = (this.currentPage + 1) * this.pageSize;
    if (nextPos < this.collection.length) {
      this.currentPage++;
      const page = this.getCurrentPage();
      return page[0] || null;
    }
    return null;
  }

 
  hasNext(): boolean {
    return (this.currentPage + 1) * this.pageSize < this.collection.length;
  }

  
  previous(): Resource | null {
    if (this.hasPrevious()) {
      this.currentPage--;
      const page = this.getCurrentPage();
      return page[0] || null;
    }
    return null;
  }

  
  hasPrevious(): boolean {
    return this.currentPage > 0;
  }

  
  current(): Resource | null {
    const page = this.getCurrentPage();
    return page[0] || null;
  }

  
  getCurrentPage(): Resource[] {
    if (this.currentPage < 0) {
      return [];
    }
    
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.collection.slice(start, end);
  }

  
  reset(): void {
    this.currentPage = -1;
  }

  
  skip(count: number): void {
    const newPage = this.currentPage + count;
    const maxPage = Math.ceil(this.collection.length / this.pageSize) - 1;
    
    // Validación de límites
    if (newPage >= 0 && newPage <= maxPage) {
      this.currentPage = newPage;
    }
  }

  
  getPosition(): number {
    return this.currentPage;
  }


  getTotalSize(): number {
    return Math.ceil(this.collection.length / this.pageSize);
  }

  
  getCurrentPageNumber(): number {
    return this.currentPage + 1;
  }

  
  getCurrentRange(): { from: number; to: number; total: number } {
    const from = this.currentPage * this.pageSize + 1;
    const to = Math.min(
      (this.currentPage + 1) * this.pageSize,
      this.collection.length
    );
    return { from, to, total: this.collection.length };
  }

  
  goToPage(pageNumber: number): boolean {
    const pageIndex = pageNumber - 1;
    const maxPage = Math.ceil(this.collection.length / this.pageSize) - 1;
    
    if (pageIndex >= 0 && pageIndex <= maxPage) {
      this.currentPage = pageIndex;
      return true;
    }
    return false;
  }
}