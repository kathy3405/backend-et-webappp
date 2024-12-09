const knex = require('knex');
const EtNewsService = require('../models/etNewsModel');


const getETNews = async (req, res)=>{
    try{
        const { author, publishDate, page, pageSize } = req.query;
        if (publishDate && !publishDate.includes(',')) {
            return res.status(400).json({
                message: 'PublishDate must be a comma-separated range in ISO 8601 format, e.g., "2024-12-01,2024-12-31".'
            });
        }

            let dateRange = null;
            if (publishDate) {
                const [from, to] = publishDate.split(',');
                dateRange = { from, to };
            }           

            const result = await EtNewsService.getEtNews({
                author,
                dateRange,
                page: parseInt(page, 10) || 1,
                pageSize: parseInt(pageSize, 10) || 10
            });


            res.status(200).json(result);

    }
    catch (err){
        console.error('Error retrieveing ET News items', err);
        res.status(500).json({
            message: 'An error occurred while retrieving ET News items',
            error: err.message,
        });
    }
};



module.exports = {getETNews};