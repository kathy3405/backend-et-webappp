const knex = require('../database');

const EtNews = {
    create: async (newsData) => {
        const [id] = await knex('et_news').insert(newsData).returning('id');
        return { id, ...newsData };
    },
};



module.exports = EtNews