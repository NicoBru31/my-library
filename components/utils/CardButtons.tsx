import { CustomerType, Field } from '../../types';
import RemoveModal from './RemoveModal';
import UpdateModal from './UpdateModal';

interface Props<T> {
  data: T;
  field: keyof CustomerType;
  fields: Field<T>[];
  remove: (id: string) => Promise<{ id: string }>;
  update: (data: unknown) => Promise<T>;
}

const CardButtons = <T extends { _id: string }>({
  field,
  fields,
  data,
  remove,
  update,
}: Props<T>) => (
  <div className='flex justify-end mt-4'>
    <UpdateModal<T>
      fields={fields}
      initial={data}
      subKey={field}
      title='Modifier une lecture'
      update={update}
    />
    <RemoveModal field={field} id={data._id} remove={remove} />
  </div>
);

export default CardButtons;
