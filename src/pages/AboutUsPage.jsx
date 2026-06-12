import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
// ROUTES not needed here; sections handle their own links

import HeroSection from './about/HeroSection';
import StatsSection from './about/StatsSection';
import StorySection from './about/StorySection';
import MissionVisionSection from './about/MissionVisionSection';
import ValuesSection from './about/ValuesSection';
import TeamSection from './about/TeamSection';
import JoinCommunitySection from './about/JoinCommunitySection';

const HERO_IMAGE = '/Our_Story.png';
// decorative flower assets moved into section components when needed
const TEAM_IMAGE = '/Sarah_Mitchell.png';
const STORY_IMAGES = [
  '/Wedding celebration.png',
  '/Happy-couple.png',
  '/Wedding details.png',
  '/Wedding-venue.png',
];

const STATS = [
  ['50K+', 'Happy Couples'],
  ['10K+', 'Trusted Vendors'],
  ['500K+', 'Connections Made'],
  ['4.9', 'Average Rating'],
];

const VALUES = [
  {
    title: 'Love & Passion',
    text: 'We put heart into every detail because your celebration deserves care, warmth, and elegance.',
  },
  {
    title: 'Quality First',
    text: 'Every vendor is carefully vetted so couples can plan with confidence and peace of mind.',
  },
  {
    title: 'Community Driven',
    text: 'We build a welcoming space that connects couples, vendors, and local wedding professionals.',
  },
  {
    title: 'Innovation',
    text: 'We create simple tools and thoughtful experiences that make wedding planning feel easier.',
  },
];

const AboutUsPage = memo(() => {
  useSEO({
    title: 'About Us',
    description: 'Learn about the wedding marketplace mission, values, and founding story.',
    keywords: ['about us', 'mission', 'values'],
  });

  return (
    <div className='overflow-hidden bg-[#f4f0ea] text-[#2d2d2d]'>
      <HeroSection image={HERO_IMAGE} />

      <StatsSection stats={STATS} />

      <StorySection images={STORY_IMAGES} />

      <MissionVisionSection />

      <ValuesSection values={VALUES} />

      <TeamSection teamImage={TEAM_IMAGE} />

      <section className='relative px-4 py-14 sm:px-6 lg:px-8 lg:py-20'>
        <div  className='mx-auto container text-center'>
          <JoinCommunitySection />
        </div>
      </section>
    </div>
  );
});

AboutUsPage.displayName = 'AboutUsPage';

export default AboutUsPage;