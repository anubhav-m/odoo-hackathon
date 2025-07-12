// controllers/question.controllers.js

import { Question } from '../models/question.models.js';

export const createQuestion = async (req, res, next) => {
    try {
        const { title, description, tags } = req.body;

        // Basic validation
        if (!title || !description) {
            const error = new Error("Title and description are required.");
            error.statusCode = 400;
            throw error;
        }

        const question = await Question.create({
            title,
            description,
            tags,
            author: req.user.id, // Injected by `authorize` middleware
        });

        res.status(201).json({
            success: true,
            message: 'Question posted successfully',
            question,
        });
    } catch (err) {
        next(err);
    }
};


export const deleteQuestion = async (req, res, next) => {
    try {
        const questionId = req.params.id;
        const userId = req.user.id;

        const question = await Question.findById(questionId);

        if (!question) {
            const error = new Error('Question not found');
            error.statusCode = 404;
            throw error;
        }

        // Check if the logged-in user is the author
        if (question.author.toString() !== userId) {
            const error = new Error('Unauthorized: You can only delete your own question');
            error.statusCode = 403;
            throw error;
        }

        await question.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Question deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};


/**
 * GET /api/questions
 * Query params:
 *   page   – page number (default 1)
 *   limit  – items per page (default 10)
 */
export const getQuestions = async (req, res, next) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const skip = (page - 1) * limit;

        const filter = {};

        // 🔍 If search term exists, filter by title or description (case-insensitive)
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            filter.$or = [
                { title: searchRegex },
                { description: searchRegex }
            ];
        }

        // Use filter in both queries
        const [questions, total] = await Promise.all([
            Question.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('author', 'username'),
            Question.countDocuments(filter)
        ]);

        res.status(200).json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            questions
        });
    } catch (err) {
        next(err);
    }
};



export const getQuestionById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const question = await Question.findById(id)
            .populate('author', 'username');

        if (!question) {
            const error = new Error('Question not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            question
        });
    } catch (err) {
        next(err);
    }
};