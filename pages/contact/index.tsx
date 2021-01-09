import * as React from 'react';
import Intro from '@/components/utils/Intro';

const Contact = () => (
  <div>
    <Intro title='Contactez-nous' text='' />
    <div>
      Pour toute question ou suggéstion, n'hésitez pas à nous contacter à
      l'adresse{' '}
      <a
        className='cursor-pointer text-blue-700'
        target='_blank'
        rel='noreferrer'
        onClick={() =>
          window.open(`mailto:nicolas.bruere31@gmail.com`, '_blank')
        }
      >
        nicolas.bruere31@gmail.com
      </a>
      .
    </div>
  </div>
);

export default Contact;
