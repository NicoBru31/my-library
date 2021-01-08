import { useDisclosure } from '@chakra-ui/react';
import * as React from 'react';
import { BookType, GoogleBookType } from '../../types';
import CreateBook from '../books/CreateBook';

interface Props {
  onSelect: (item: GoogleBookType, book?: BookType) => void;
  search: string;
}

const SearchReadingCreate = ({ onSelect, search }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div
        className='ml-2 text-blue-300 cursor-pointer hover:opacity-50'
        onClick={onOpen}
      >
        Je ne trouve pas mon livre
      </div>
      <CreateBook
        isOpen={isOpen}
        onClose={onClose}
        onSelect={onSelect}
        search={search}
      />
    </div>
  );
};

export default SearchReadingCreate;
