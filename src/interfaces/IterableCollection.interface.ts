
import { Iterator } from './Iterator.interface';


export interface IterableCollection<T> {
  
  createIterator(type: string, options?: any): Iterator<T>;
  
  getSize(): number;
}

