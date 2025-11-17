import { Resource } from '../interfaces/Resource.interface';


export const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Gang of Four (Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides)',
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
    isbn: '978-0596517748',
    pages: 176,
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
    isbn: '978-0374533557',
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
    isbn: '978-0062316097',
    pages: 443,
    rating: 4.9
  },
  {
    id: '8',
    title: 'Code Magazine - Especial Inteligencia Artificial',
    author: 'Tech Publishers',
    category: 'Revista Tecnología',
    publishDate: new Date('2024-06-01'),
    popularity: 68,
    type: 'magazine',
    pages: 95,
    rating: 4.1
  },
  {
    id: '9',
    title: 'The Pragmatic Programmer: Your Journey to Mastery',
    author: 'Andrew Hunt & David Thomas',
    category: 'Programación',
    publishDate: new Date('1999-10-30'),
    popularity: 93,
    type: 'book',
    isbn: '978-0201616224',
    pages: 352,
    rating: 4.6
  },
  {
    id: '10',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits',
    author: 'James Clear',
    category: 'Autoayuda',
    publishDate: new Date('2018-10-16'),
    popularity: 94,
    type: 'book',
    isbn: '978-0735211292',
    pages: 320,
    rating: 4.8
  },
  {
    id: '11',
    title: 'Algorithms to Live By: The Computer Science of Human Decisions',
    author: 'Brian Christian & Tom Griffiths',
    category: 'Ciencia',
    publishDate: new Date('2016-04-19'),
    popularity: 82,
    type: 'audiobook',
    rating: 4.4
  },
  {
    id: '12',
    title: 'Scientific American - Mayo 2024',
    author: 'SA Editorial Team',
    category: 'Revista Científica',
    publishDate: new Date('2024-05-01'),
    popularity: 75,
    type: 'magazine',
    pages: 110,
    rating: 4.2
  },
  {
    id: '13',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    category: 'Negocios',
    publishDate: new Date('2011-09-13'),
    popularity: 87,
    type: 'book',
    isbn: '978-0307887894',
    pages: 336,
    rating: 4.3
  },
  {
    id: '14',
    title: '1984',
    author: 'George Orwell',
    category: 'Ficción',
    publishDate: new Date('1949-06-08'),
    popularity: 97,
    type: 'book',
    isbn: '978-0451524935',
    pages: 328,
    rating: 4.7
  },
  {
    id: '15',
    title: 'Mindfulness para Principiantes',
    author: 'Jon Kabat-Zinn',
    category: 'Autoayuda',
    publishDate: new Date('2016-01-05'),
    popularity: 79,
    type: 'audiobook',
    rating: 4.2
  },
  {
    id: '16',
    title: 'National Geographic - Edición Especial Océanos',
    author: 'NG Editorial',
    category: 'Revista Científica',
    publishDate: new Date('2024-03-15'),
    popularity: 83,
    type: 'magazine',
    pages: 120,
    rating: 4.6
  },
  {
    id: '17',
    title: 'Refactoring: Improving the Design of Existing Code',
    author: 'Martin Fowler',
    category: 'Programación',
    publishDate: new Date('1999-07-08'),
    popularity: 89,
    type: 'book',
    isbn: '978-0201485677',
    pages: 431,
    rating: 4.5
  },
  {
    id: '18',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    category: 'Autoayuda',
    publishDate: new Date('1997-08-19'),
    popularity: 90,
    type: 'book',
    isbn: '978-1577314806',
    pages: 236,
    rating: 4.4
  },
  {
    id: '19',
    title: 'Wired - Futuro de la IA',
    author: 'Wired Editorial',
    category: 'Revista Tecnología',
    publishDate: new Date('2024-07-01'),
    popularity: 77,
    type: 'magazine',
    pages: 88,
    rating: 4.0
  },
  {
    id: '20',
    title: 'Deep Work: Rules for Focused Success',
    author: 'Cal Newport',
    category: 'Productividad',
    publishDate: new Date('2016-01-05'),
    popularity: 86,
    type: 'book',
    isbn: '978-1455586691',
    pages: 296,
    rating: 4.6
  }
];


export function generateRandomResources(count: number): Resource[] {
  const titles = [
    'The Art of Programming',
    'Advanced Algorithms',
    'Machine Learning Basics',
    'Web Development Guide',
    'Database Design',
    'Cloud Computing',
    'DevOps Handbook',
    'Agile Methodologies',
    'Software Architecture',
    'Computer Networks'
  ];

  const authors = [
    'John Doe',
    'Jane Smith',
    'Robert Johnson',
    'Emily Davis',
    'Michael Brown',
    'Sarah Wilson'
  ];

  const categories = [
    'Programación',
    'Ciencia',
    'Historia',
    'Negocios',
    'Autoayuda',
    'Ficción'
  ];

  const types: ('book' | 'magazine' | 'audiobook')[] = ['book', 'magazine', 'audiobook'];

  const resources: Resource[] = [];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    resources.push({
      id: `generated-${i + 1}`,
      title: `${titles[Math.floor(Math.random() * titles.length)]} Vol. ${i + 1}`,
      author: authors[Math.floor(Math.random() * authors.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      publishDate: new Date(
        2015 + Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 12),
        1 + Math.floor(Math.random() * 28)
      ),
      popularity: 50 + Math.floor(Math.random() * 50),
      type,
      isbn: type === 'book' ? `978-${Math.floor(Math.random() * 10000000000)}` : undefined,
      pages: type !== 'audiobook' ? 100 + Math.floor(Math.random() * 400) : undefined,
      rating: 2.5 + Math.random() * 2.5
    });
  }

  return resources;
}


export function getResourcesByCategory(category: string): Resource[] {
  return sampleResources.filter(r => r.category === category);
}


export function getUniqueCategories(): string[] {
  return Array.from(new Set(sampleResources.map(r => r.category)));
}


export function getUniqueAuthors(): string[] {
  return Array.from(new Set(sampleResources.map(r => r.author)));
}