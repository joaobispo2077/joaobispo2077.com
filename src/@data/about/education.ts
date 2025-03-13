import { CourseProps } from '@src/components/Course';

// TODO: Migrate this data to a CMS

export const getEducationSchemaByLocale = (locale: string): CourseProps[] => {
  if (locale === 'pt-br') {
    return educationsPtBr;
  }

  return educations;
};

export const educations: CourseProps[] = [
  {
    title: 'Analysis and Systems Development',
    institution: 'IFSP',
    startedAt: '2020',
    endedAt: '2022',
    degree: `Bachelor of Applied Science (BAS)`,
    location: 'São Paulo, Brazil',
    time: '3 years',
    website: 'https://www.ifsp.edu.br/',
  },
  {
    title: 'Computers Networks',
    institution: 'ETEC',
    startedAt: '2017',
    endedAt: '2018',
    degree: `Technical`,
    location: 'São Paulo, Brazil',
    time: '1 year and 6 months',
    website: 'https://www.cps.sp.gov.br/',
  },
  {
    title: 'System Development',
    institution: 'ETEC',
    startedAt: '2016',
    endedAt: '2017',
    degree: `Technical`,
    location: 'São Paulo, Brazil',
    time: '1 year and 6 months',
    website: 'https://www.cps.sp.gov.br/',
  },
];

export const educationsPtBr: CourseProps[] = [
  {
    title: 'Análise e Desenvolvimento de Sistemas',
    institution: 'IFSP',
    startedAt: '2020',
    endedAt: '2022',
    degree: `Tecnólogo`,
    location: 'São Paulo, Brazil',
    time: '3 anos',
    website: 'https://www.ifsp.edu.br/',
  },
  {
    title: 'Redes de Computadores',
    institution: 'ETEC',
    startedAt: '2017',
    endedAt: '2018',
    degree: `Técnico`,
    location: 'São Paulo, Brazil',
    time: '1 ano e 6 meses',
    website: 'https://www.cps.sp.gov.br/',
  },
  {
    title: 'System Development',
    institution: 'ETEC',
    startedAt: '2016',
    endedAt: '2017',
    degree: `Técnico`,
    location: 'São Paulo, Brazil',
    time: '1 ano e 6 meses',
    website: 'https://www.cps.sp.gov.br/',
  },
];
