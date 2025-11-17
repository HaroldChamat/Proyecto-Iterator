
export interface Iterator<T> {

  next(): T | null;
  

  hasNext(): boolean;
  
 
  current(): T | null;
  

  reset(): void;
  

  previous(): T | null;
  

  hasPrevious(): boolean;
  

  skip(count: number): void;
  
 
  getPosition(): number;
  

  getTotalSize(): number;
}

