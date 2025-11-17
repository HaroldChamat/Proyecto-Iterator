
export interface Resource {

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