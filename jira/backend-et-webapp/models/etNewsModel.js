const knex = require('../database');

const EtNewsService = {
    getEtNews: async ({ author, dateRange, page = 1, pageSize = 10 }) => {
        const query = knex('et_news');

        if (author) {
            query.where('author', 'like', `%${author}%`);
        }
        if (dateRange) {
            query.whereBetween('publishDate', [dateRange.from, dateRange.to]);
        }
        
        const offset = (page - 1) * pageSize;
        query.offset(offset).limit(pageSize);

        const totalItemsQuery = knex('et_news').count('* as count');
        if (author) totalItemsQuery.where('author', 'like', `%${author}%`);
        if (dateRange) totalItemsQuery.whereBetween('publishDate', [dateRange.from, dateRange.to]);
        
        const [totalItems] = await totalItemsQuery;
        const items = await query;

        return {
            page,
            pageSize,
            totalItems: totalItems.count,
            items
        };
    }
};



module.exports = EtNewsService