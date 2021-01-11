import { Input } from '@chakra-ui/react';
import * as React from 'react';
import Autocomplete from 'react-autocomplete';
import LoaderContext from '@/contexts/LoaderContext';
import { getGoogleBooks } from '@/fetch/index';
import { BookType, GoogleBookType } from '@/types/index';
import SearchReadingCreate from './SearchReadingCreate';
import SearchReadingItem from './SearchReadingItem';

interface Props {
  onSelect: (item: GoogleBookType, book?: BookType) => void;
  theme?: 'white';
}

const SearchReading = ({ onSelect, theme }: Props) => {
  const [books, setBooks] = React.useState<GoogleBookType[]>([]);
  const [search, setSearch] = React.useState('');
  const { loader } = React.useContext(LoaderContext);

  const change = (e: any) => {
    e?.preventDefault();
    setSearch(e.target.value);
  };

  const select = (val: string, item: GoogleBookType) => {
    onSelect(item);
    setSearch('');
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
    <div className='flex items-center'>
      <Autocomplete
        getItemValue={(item: GoogleBookType) => item.volumeInfo.title}
        items={(books || [])?.slice(0, 3)}
        menuStyle={{ position: 'fixed', zIndex: 10 }}
        onChange={change}
        onSelect={select}
        renderInput={(props) => (
          <Input
            {...props}
            backgroundColor={theme || 'inherit'}
            color={theme === 'white' ? 'black' : 'inherit'}
            placeholder='Chercher une oeuvre'
          />
        )}
        renderItem={(item: GoogleBookType) => (
          <SearchReadingItem item={item} key={item.id} search={search} />
        )}
        value={search}
      />
      <SearchReadingCreate onSelect={onSelect} search={search} />
    </div>
  );
};

export default SearchReading;
