export type Link = {
  name: string;
  url: string;
  text: string;
};

export const links: Link[] = [
  {
    name: 'about',
    text: 'Sobre',
    url: '/about',
  },
  {
    name: 'roadmap',
    text: 'roadmap',
    url: '/roadmap',
  },
  {
    name: 'blog',
    text: 'Blog',
    url: '/blog/posts',
  },
  // {
  //   name: 'repositories',
  //   text: 'Repositórios',
  //   url: '/repositories',
  // },
  // {
  //   name: 'projects',
  //   text: 'Projetos',
  //   url: '/projects',
  // },
  // {
  //   name: 'think',
  //   text: 'Think',
  //   url: '/think',
  // },
];
