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
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { createReco } from '../../../fetch';
import useUpdate from '../../../hooks/useUpdate';
import { CustomerType, RecoType } from '../../../types';
import RecoCreateAddresses from './RecoCreateAddresses';
import RecoCreateFooter from './RecoCreateFooter';
import RecoCreateReadings from './RecoCreateReadings';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DEFAULT: RecoType['from'] = { addresses: [], readings: [] };

const RecoCreate = ({ open, setOpen }: Props) => {
  const {
    data: { _id: customerId },
  } = useQuery<CustomerType>('customer');
  const methods = useForm<RecoType>({
    defaultValues: { from: DEFAULT },
  });
  const { mutate } = useUpdate<RecoType, CustomerType, RecoType>({
    action: createReco,
    key: 'customer',
    reset: () => {
      methods.reset({ from: DEFAULT });
      setOpen(false);
    },
    subKey: 'recos',
  });

  const save: SubmitHandler<RecoType> = (data) =>
    mutate({ ...data, customerId });

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(save)}>
            <ModalHeader>Je crée ma reco</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs>
                <TabList>
                  <Tab>Adresses</Tab>
                  <Tab>Lectures</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <RecoCreateAddresses />
                  </TabPanel>
                  <TabPanel>
                    <RecoCreateReadings />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            <RecoCreateFooter setOpen={setOpen} />
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default RecoCreate;
