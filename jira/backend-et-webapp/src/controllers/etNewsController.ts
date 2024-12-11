import { Request, Response } from 'express';
import { EtNews} from '../models/etNewsModel';

// Kiểm tra ngày hợp lệ
const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date.toISOString() === dateString;
};

// Tạo ET News
export const createEtNews = async (req: Request, res: Response): Promise<void> => {
    const { title, content, author, publishDate: providedPublishDate } = req.body;

    // Xác thực dữ liệu đầu vào
    if (!title || title.length > 100) {
        res.status(400).json({ message: 'Title is required and must be less than 100 characters.' });
        return;
    }
    if (!content) {
        res.status(400).json({ message: 'Content is required.' });
        return;
    }
    if (typeof author !== 'string' || author.length === 0) {
        res.status(400).json({ message: 'Author is required and must be a valid string.' });
        return;
    }
    if (!providedPublishDate || !isValidDate(providedPublishDate)) {
        res.status(400).json({ message: 'PublishDate is required and must be a valid ISO 8601 date.' });
        return;
    }

    try {
        const newNewsItem = await EtNews.create({ title, content, author, publishDate: providedPublishDate });
        res.status(201).json({
            message: 'ET News item created successfully',
            data: newNewsItem,
        });
    } catch (error: any) {
        res.status(500).json({ message: 'An error occurred while creating the ET News item.', error: error.message });
    }
};