import React from 'react';
import { NextSeo } from 'next-seo';
import CustomizePanel from '../components/CustomizePanel';

const CustomizePage: React.FC = () => (
    <>
        <NextSeo title="Customize" description="Customize your accent color and preferences" />
        <CustomizePanel />
    </>
);

export default CustomizePage;
