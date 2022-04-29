export type Link = {
  name: string;
  url: string;
  text: string;
};

export const navbarlinks: Link[] = [
  {
    name: 'about',
    text: 'Sobre',
    url: '/about',
  },
  {
    name: 'blog',
    text: 'Blog',
    url: '/blog/posts',
  },
  {
    name: 'repositories',
    text: 'Repositórios',
    url: '/repositories',
  },
  {
    name: 'projects',
    text: 'Projetos',
    url: '/projects',
  },
  {
    name: 'flow',
    text: 'Flow',
    url: '/flow',
  },
];
