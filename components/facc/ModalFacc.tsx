import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { ModalProps } from '../../types';

const ModalFacc = ({
  children,
  title,
  ...props
}: PropsWithChildren<ModalProps>) => (
  <Modal {...props}>
    <ModalOverlay className='rounded' />
    <ModalContent>
      <ModalHeader className='bg-green-600 rounded-t-md text-white'>
        {title}
      </ModalHeader>
      <ModalCloseButton
        className='focus:shadow-none'
        color='white'
        borderColor='transparent'
      />
      <ModalBody>{children}</ModalBody>
    </ModalContent>
  </Modal>
);

export default ModalFacc;
