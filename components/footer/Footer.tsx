import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';
import { hoverOpacity } from '../../variants';

const Footer = () => (
  <div className='bg-green-700 text-white h-20 w-full flex justify-between items-center pl-12 pr-8'>
    <div className='flex'>
      <motion.div className='footerLink mr-6' whileHover={hoverOpacity}>
        <Link href='/contact'>Nous contacter</Link>
      </motion.div>
      <motion.div className='footerLink' whileHover={hoverOpacity}>
        <Link href='/faq'>FAQ</Link>
      </motion.div>
    </div>
    <div>{`© ${new Date().getFullYear()} Nicolas Bruère`}</div>
  </div>
);

export default Footer;
