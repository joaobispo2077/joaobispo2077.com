/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { KanbanCardListData } from '@src/components/Kanban/KanbanCardList';

export default (
  _req: NextApiRequest,
  res: NextApiResponse<KanbanCardListData[]>,
) => {
  res.status(200).json([
    {
      title: 'Tarefas',
      creatable: true,
      id: 1,
      cards: [
        {
          id: 1,
          content: 'Gravar clone do Trello com Vue 3',
          labels: ['#19afdd'],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
        {
          id: 2,
          content: 'Estudar renderizações SPA, SSR e ISG',
          labels: ['#19afdd'],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
        {
          id: 3,
          content: 'Limpar o quarto',
          labels: ['#19afdd'],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
        {
          id: 4,
          content: 'Preparar projetos secretos para minha namorada',
          labels: ['#a86f9c'],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
        {
          id: 5,
          content: 'Implementar testes unitários com Serverless Framework',
          labels: ['#5BBA6F'],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
      ],
    },
    {
      title: 'Pausado',
      creatable: false,
      id: 3,
      cards: [
        {
          id: 9,
          content: 'Organizar guarda roupas',
          labels: ['#19afdd'],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
        {
          id: 10,
          content: 'Ler Sapiens - uma breve história da humanidade',
          labels: ['#a86f9c'],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
        {
          id: 11,
          content: 'Pull Request do artigo de Next.JS para a he4rt',
          labels: [],
        },
        {
          id: 12,
          content:
            'Selecionar resources de documentação de componentes no estilo Storybook',
          labels: ['#5BBA6F'],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
      ],
    },
    {
      title: 'Fazendo',
      creatable: false,
      id: 2,
      cards: [
        {
          id: 6,
          content:
            'Testando Serverless Framework com Dynamo DB, Athena e TypeScript',
          labels: [],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
        {
          id: 7,
          content: 'Fazer um clone do Pipefy com suporte a acessibilidade',
          labels: ['#5BBA6F'],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
        {
          id: 8,
          content:
            'Selecionar resources de documentação de APIs no estilo Swagger',
          labels: ['#5BBA6F'],
          user: 'https://avatars.githubusercontent.com/u/43768058?s=400&u=88f13aa1305b0a1d36270179b7f2fbf3725b792b&v=4',
        },
      ],
    },

    {
      title: 'Concluído',
      creatable: false,
      done: true,
      id: 4,
      cards: [
        {
          id: 13,
          content: 'Estudar Clean Architecture',
          labels: [],
        },
        {
          id: 14,
          content: 'Treinar testes de integração',
          labels: ['#a86f9c'],
        },
        {
          id: 15,
          content: 'Primeira parte do projeto secreto',
          labels: ['#19afdd'],
        },
      ],
    },
  ]);
};
