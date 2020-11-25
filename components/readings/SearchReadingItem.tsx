import { GoogleBookType } from '../../types';

interface Props {
  item: GoogleBookType;
  search: string;
}

const SearchReadingItem = ({ item, search }: Props) => (
  <div
    key={item.id}
    className='bg-green-700 p-4 cursor-pointer z-10 w-full flex items-start'
  >
    <img
      src={item?.volumeInfo?.imageLinks?.smallThumbnail}
      height={40}
      width={40}
    />
    <div className='pl-6 text-white'>
      <div
        dangerouslySetInnerHTML={{
          __html: item.volumeInfo.title.replace(search, `<b>${search}</b>`),
        }}
      />
      <div>{item?.volumeInfo?.authors?.join(', ')}</div>
    </div>
  </div>
);

export default SearchReadingItem;