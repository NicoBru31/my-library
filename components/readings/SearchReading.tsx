import * as React from 'react';
import { Input } from '@chakra-ui/react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import Autocomplete from 'react-autocomplete';
import LoaderContext from '../../contexts/LoaderContext';
import { getGoogleBooks } from '../../fetch';
import { GoogleBookType } from '../../types';
import SearchReadingItem from './SearchReadingItem';

interface Props {
  clearOnSelect?: boolean;
  onSelect: (item: GoogleBookType) => void;
}

const SearchReading = ({ clearOnSelect = false, onSelect }: Props) => {
  const [books, setBooks] = React.useState<GoogleBookType[]>([]);
  const [search, setSearch] = React.useState('');
  const [book, setBook] = React.useState<GoogleBookType>();
  const { loader } = React.useContext(LoaderContext);

  const change = (e: any) => {
    e?.preventDefault();
    setBook(undefined);
    setSearch(e.target.value);
  };

  const select = (val: string, item: GoogleBookType) => {
    onSelect(item);
    setBook(item);
    setSearch(clearOnSelect ? '' : val);
  };

  React.useEffect(() => {
    loader.isLoading && setSearch('');
  }, [loader, setSearch]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length > 2)
        getGoogleBooks(`intitle:${search}`).then(setBooks).catch(console.log);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <Autocomplete
      getItemValue={(item: GoogleBookType) => item.volumeInfo.title}
      items={books.slice(0, 3)}
      menuStyle={{ position: 'fixed', zIndex: 10 }}
      onChange={change}
      onSelect={select}
      renderInput={(props) => (
        <div className='flex items-center'>
          <Input {...props} placeholder='Chercher une oeuvre' />
          {book ? (
            <AiOutlineCheckCircle size={30} color='green' />
          ) : (
            <AiOutlineCloseCircle size={30} color='red' />
          )}
        </div>
      )}
      renderItem={(item: GoogleBookType) => (
        <div key={item.id}>
          <SearchReadingItem item={item} search={search} />
        </div>
      )}
      value={search}
    />
  );
};

export default SearchReading;
