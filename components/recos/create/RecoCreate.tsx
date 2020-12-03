import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import AlertContext from '../../../contexts/AlertContext';
import { createReco } from '../../../fetch';
import useUpdate from '../../../hooks/useUpdate';
import { CustomerType, ModalProps, RecoType } from '../../../types';
import RecoCreateAddresses from './RecoCreateAddresses';
import RecoCreateFooter from './RecoCreateFooter';
import RecoCreateReadings from './RecoCreateReadings';
import RecoCreateType from './RecoCreateType';

const DEFAULT: RecoType['from'] = { addresses: [], readings: [] };

const RecoCreate = (props: ModalProps) => {
  const methods = useForm<RecoType>({
    defaultValues: { from: DEFAULT },
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { setAlert } = useContext(AlertContext);
  const { data: customer } = useQuery<CustomerType>('customer');
  const { mutate } = useUpdate<RecoType, CustomerType, RecoType>({
    action: createReco,
    key: 'customer',
    reset: () => {
      methods.reset({ from: DEFAULT });
      props.onClose();
    },
    subKey: 'recos',
  });

  const save: SubmitHandler<RecoType> = (data) => {
    if (data.from.addresses.length === 0)
      return setAlert({
        message: 'Veuillez choisir au moins une adresse',
        status: 'error',
      });
    mutate({ ...data, customerId: customer._id });
  };

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(save)}>
            <ModalHeader>Je crée ma reco</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs colorScheme='teal'>
                <TabList>
                  <Tab>Adresses</Tab>
                  <Tab>Lectures</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <RecoCreateAddresses />
                    <RecoCreateType />
                  </TabPanel>
                  <TabPanel>
                    <RecoCreateReadings />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            <RecoCreateFooter onClose={props.onClose} />
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default RecoCreate;
