import { Skeleton } from '@chakra-ui/react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text?: string;
}

const Loading = ({ text, ...props }: Props) => (
  <Skeleton isLoaded={text !== undefined}>
    <div {...props}>{text}</div>
  </Skeleton>
);

export default Loading;
