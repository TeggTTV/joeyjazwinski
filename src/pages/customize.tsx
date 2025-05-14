import React from 'react';
import { NextSeo } from 'next-seo';
import CustomizePanel from '../components/CustomizePanel';
import { seoCustomize } from '@/lib/seoConfig';

const CustomizePage: React.FC = () => (
    <>
        <NextSeo {...seoCustomize} />
        <CustomizePanel />
    </>
);

export default CustomizePage;
