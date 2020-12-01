import { Input } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
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
  const [books, setBooks] = useState<GoogleBookType[]>([]);
  const [search, setSearch] = useState('');
  const { loader } = useContext(LoaderContext);

  const change = (e: any) => {
    e?.preventDefault();
    setSearch(e.target.value);
  };

  const select = (val: string, item: GoogleBookType) => {
    onSelect(item);
    setSearch(clearOnSelect ? '' : val);
  };

  useEffect(() => {
    loader.isLoading && setSearch('');
  }, [loader, setSearch]);

  useEffect(() => {
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
        <Input {...props} placeholder='Chercher une oeuvre' />
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
