import { Iterator } from '../interfaces/Iterator.interface';
import { Resource } from '../interfaces/Resource.interface';


export class ReverseIterator implements Iterator<Resource> {

  private position: number;
  private collection: Resource[];


  constructor(collection: Resource[]) {
    
    this.collection = [...collection];
    
    
    this.position = this.collection.length;
  }

  
  next(): Resource | null {
    if (this.hasNext()) {
      this.position--;
      return this.collection[this.position];
    }
    return null;
  }

  
  hasNext(): boolean {
    return this.position > 0;
  }

  
  previous(): Resource | null {
    if (this.hasPrevious()) {
      this.position++;
      return this.collection[this.position];
    }
    return null;
  }

  
  hasPrevious(): boolean {
    return this.position < this.collection.length;
  }

  
  current(): Resource | null {
    if (this.position >= 0 && this.position < this.collection.length) {
      return this.collection[this.position];
    }
    return null;
  }

  
  reset(): void {
    this.position = this.collection.length;
  }

  
  skip(count: number): void {
    const newPosition = this.position - count;
    // Validación de límites
    if (newPosition >= 0 && newPosition <= this.collection.length) {
      this.position = newPosition;
    }
  }

  
  getPosition(): number {
    return this.collection.length - this.position;
  }

  
  getTotalSize(): number {
    return this.collection.length;
  }
}