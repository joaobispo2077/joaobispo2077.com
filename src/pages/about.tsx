import type { NextPage } from 'next';

import { Flex, Heading, Text, VStack } from '@chakra-ui/react';

import { useTranslation } from '@src/hooks/useTranslation';
import { generateTextLinearGradient } from '@src/utils/generateGradient';
import { SEO } from '@src/components/SEO';
import { Image } from '@src/components/Image';
import {
  formatDate,
  getMonthsDifferenceFromDates,
  getYearsDifferenceFromDates,
} from '@src/utils/date';
import { Job, JobProps } from '@src/components/Job';
import { MakePartial } from '@src/@types/generics/MakePartial';

const AboutPage: NextPage = () => {
  const { aboutTranslation, locale } = useTranslation();

  const jobs: MakePartial<JobProps, 'endedAt'>[] = [
    {
      role: 'Software Engineer',
      startedAt: '2021-11-01',
      company: 'IBM',
      location: 'New York, United States',
      contract: 'Full Time',
    },
    {
      role: 'Full Stack Developer',
      startedAt: '2020-12-01',
      company: 'SaveLivez',
      location: 'São Paulo, Brazil',
      contract: 'Full Time',
    },
  ];

  const parsedJobs = jobs.map((job) => {
    const yearsDifference = getYearsDifferenceFromDates(
      job.startedAt,
      job.endedAt,
    );
    console.log(yearsDifference);
    const monthsDifference =
      getMonthsDifferenceFromDates(job.startedAt, job.endedAt) -
      yearsDifference * 12;

    const time =
      yearsDifference > 0
        ? `${yearsDifference} ${aboutTranslation.years} ${monthsDifference} ${aboutTranslation.months}`
        : `${monthsDifference} ${aboutTranslation.months}`;

    return {
      ...job,
      startedAt: formatDate(new Date(job.startedAt), locale, {
        year: 'numeric',
        month: 'short',
        day: undefined,
      }),
      endedAt: job.endedAt
        ? formatDate(new Date(job.endedAt), locale, {
            year: 'numeric',
            month: 'short',
            day: undefined,
          })
        : 'Present',
      time,
    };
  });

  return (
    <Flex
      as="main"
      background="brand.background"
      width="100%"
      minHeight="calc(100vh - 8rem)"
      flexDirection="column"
      paddingTop={[4, 16]}
      paddingX={'1rem'}
    >
      <SEO
        title={aboutTranslation.seoTitle}
        description="João Bispo is a Brazilian creator and developer. He currently lives in São Paulo, Brazil, where he's the Software Engineer at IBM. His started to write first code lines in 2015 and since so he really like solving problems with software craftship using concepts of Software Engineering, algorithms efficiency and choose the right tool for the job."
        url="/about"
      />
      <Flex width="100%" minHeight="4rem" justifyContent="flex-start">
        <Heading
          as="h1"
          fontSize="5xl"
          color="brand.primary"
          {...generateTextLinearGradient('cyan', 'purple')}
          whiteSpace="pre-wrap"
          wordBreak={'break-word'}
        >
          {aboutTranslation.title}
        </Heading>
      </Flex>
      <Flex as="section" flexDirection="column" marginTop="1.5rem">
        <Flex
          as="section"
          justifyContent={['center', 'flex-start']}
          flexWrap={['wrap-reverse', 'wrap-reverse', 'wrap-reverse']}
          gap={['1rem', '1rem', '2rem', '2rem']}
        >
          <VStack flex={1} spacing="1.5rem">
            <Text as="p" fontSize="medium" color="brand.secondary">
              Hey!
              <Text as="span" fontSize="medium" color="brand.primary">
                {' '}
                I&#39;m João Bispo
              </Text>
              , I started as a software developer in 2015, trying to rotate a
              bull on my screen writing my first code lines with JavaScript.
            </Text>
            <Text as="p" fontSize="medium" color="brand.secondary">
              I&#39;m currently
              <Text as="span" fontSize="medium" color="brand.primary">
                {' '}
                Software Engineer{' '}
              </Text>
              at IBM. Since my start, I really like solving problems with
              software craftship using concepts of software engineering,
              algorithms efficiency and choose the right tool for the job.
              I&#39;m originally from{' '}
              <Text as="span" fontSize="medium" color="brand.primary">
                {' '}
                Brazil
              </Text>
              , I want to know other countries and cities, but I&#39;ve always
              lived here.
            </Text>
            <Text as="p" fontSize="medium" color="brand.secondary">
              In my spare time I like to foster my creativite, doing
              <Text as="span" fontSize="medium" color="brand.primary">
                {' '}
                PixelArt
              </Text>
              , write articles, watch anime and play games. I also like to
              workout and{''}
              <Text as="span" fontSize="medium" color="brand.primary">
                {' '}
                chocolate milkshake
              </Text>
              .
            </Text>
          </VStack>

          <Image
            src="https://github.com/joaobispo2077.png"
            alt="João Bispo - Software Engineer"
            title="João Bispo - Software Engineer"
            width={400}
            height={400}
            objectFit="cover"
            borderRadius={8}
            flexShrink={0}
            flex={1}
          />
        </Flex>
        <Text
          as="p"
          fontSize="xl"
          color="brand.primary"
          fontWeight="bold"
          marginY={['1rem', '1rem', '2rem', '2rem']}
        >
          {aboutTranslation.seeAllJobs}
        </Text>
        <VStack as="ul" spacing="1.5rem">
          {parsedJobs.map((job) => (
            <Job key={job.startedAt} {...job} />
          ))}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default AboutPage;
