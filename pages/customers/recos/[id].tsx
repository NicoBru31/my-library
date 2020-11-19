import { Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import RecoAddresses from '../../../components/recos/RecoAddresses';
import RecoIntro from '../../../components/recos/RecoIntro';
import RecoReadings from '../../../components/recos/RecoReadings';
import { createReco, getCustomer } from '../../../fetch';
import useUpdate from '../../../hooks/useUpdate';
import { CustomerPageType, CustomerType, RecoType } from '../../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const customer: CustomerType = await getCustomer(id);
  return { props: { customer, id } };
};

const Reco = ({ customer, id }: CustomerPageType) => {
  const { data } = useQuery<CustomerType>('customer', {
    initialData: customer,
  });
  const methods = useForm<RecoType>({
    defaultValues: {
      from: {
        addresses: [],
        readings: customer.readings
          .filter(({ rating }) => rating > 14)
          .map(({ _id }) => _id),
      },
    },
  });
  const { mutate, isLoading } = useUpdate<RecoType, CustomerType, RecoType>({
    action: createReco,
    key: 'customer',
    reset: methods.reset,
    subKey: 'recos',
  });

  const save: SubmitHandler<RecoType> = (data) => {
    if (!data.from.addresses.length) {
      return methods.setError('from', {
        message: 'Veuillez sélectionner au moins une adresse',
      });
    }
    mutate({ ...data, customerId: id });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(save)}>
        <RecoIntro />
        <div className='flex items-baseline justify-between my-4'>
          <RecoAddresses />
          <RecoReadings />
          <div className='w-1/4'>
            <Button disabled={isLoading} colorScheme='teal' type='submit'>
              Demander une reco
            </Button>
          </div>
        </div>
      </form>
      <div>Mes recos :</div>
      {data?.recos.map((reco) => (
        <div key={reco._id}>{reco._id}</div>
      ))}
    </FormProvider>
  );
};

export default Reco;
