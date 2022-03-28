import { News } from '../dto/news.dto';

export const news: News[] = [
  {
    newsId: 1,
    title: 'First news element',
    description: 'Some text describing the things',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        commentsId: 1,
        description: 'This is the first comment',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        avatar: '',
      },
      {
        commentsId: 2,
        description: 'Another comment',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        avatar: '',
      },
    ],
  },
  {
    newsId: 2,
    title: 'Second news element',
    description: 'Another text describing the things',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        commentsId: 3,
        description: 'Yet another comment',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        avatar: '',
      },
    ],
  },
];
