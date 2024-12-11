import knex from '../database';

interface NewsData {
    title: string;
    content: string;
    author: string;
    publishDate: string;
}
export const EtNews = {
    create: async (newsData: NewsData): Promise<NewsData & { id: number }> => {
        const [id] = await knex('et_news').insert(newsData).returning('id');
        return { id, ...newsData };
    },
};