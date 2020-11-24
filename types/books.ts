export interface BookType {
  _id?: string;
  author: string;
  googleId: string;
  price?: number;
  title: string;
}

export interface GoogleBookType {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}

export interface RecoBooksType {
  books: string[];
  sellerId: string;
}
