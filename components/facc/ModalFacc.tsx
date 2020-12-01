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
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
    </ModalContent>
  </Modal>
);

export default ModalFacc;
