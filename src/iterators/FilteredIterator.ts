import { Iterator } from '../interfaces/Iterator.interface';
import { Resource } from '../interfaces/Resource.interface';
import { BidirectionalIterator } from './BidirectionalIterator';

export class FilteredIterator extends BidirectionalIterator {

  constructor(
    collection: Resource[], 
    filterFn: (resource: Resource) => boolean
  ) {

    const filteredCollection = collection.filter(filterFn);
    
    
    super(filteredCollection);
  }
}