const knex = require('knex');
const EtNews = require('../models/etNewsModel');


const createEtNews = async (req, res) => {
    const { title, content, author, publishDate } = req.body;
    const isValidDate = (date) => {
        return !isNaN(Date.parse(date)) && new Date(date).toISOString() === date;
    }

    if (!title || title.length > 100) {
        return res.status(400).json({ message: 'Title is required and must be less than 100 characters.' });
    }
    if (!content) {
        return res.status(400).json({ message: 'Content is required.' });
    }
    if (!author || typeof author !== 'string') {
        return res.status(400).json({ message: 'Author is required and must be a valid string.' });
    }
    if (!publishDate || isNaN(Date.parse(publishDate))) {
        return res.status(400).json({ message: 'PublishDate is required and must be a valid ISO 8601 date.' });
    }

    try {
        const newNewsItem = await EtNews.create({ title, content, author, publishDate });
        res.status(201).json({
            message: 'ET News item created successfully',
            data: newNewsItem,
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the ET News item.', error: error.message });
    }
};



module.exports = {createEtNews};