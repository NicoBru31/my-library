import { ModalProps as ModalPrp } from '@chakra-ui/react';

export interface ModalProps extends Omit<ModalPrp, 'children'> {
  title?: string;
}
