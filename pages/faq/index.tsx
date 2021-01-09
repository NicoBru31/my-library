import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import items from '@/components/faq/items';

const index = () => (
  <Accordion allowToggle>
    {items.map(({ text, title }) => (
      <AccordionItem key={title}>
        <AccordionButton>
          <Box flex='1' textAlign='left'>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>{text}</AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);

export default index;
