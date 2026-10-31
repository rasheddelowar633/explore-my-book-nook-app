import Categories from '@/components/home/Categories';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import HeroSection from '@/components/home/HeroSection';
import LatestBooks from '@/components/home/LatestBooks';
import WhyBookNook from '@/components/home/WhyBookNook';
import React from 'react';

const page = () => {
  return (
    <div>
      <HeroSection/>
      <FeaturedBooks/>
      <LatestBooks/>
      <Categories/>
      <WhyBookNook/>
    </div>
  );
};

export default page;