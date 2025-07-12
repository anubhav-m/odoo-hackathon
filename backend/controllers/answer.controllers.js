import { Answer } from '../models/answer.models.js';
import { Question } from '../models/question.models.js';


export const createAnswer = async (req, res, next) => {
    try {
        const { content } = req.body;
        const { questionId } = req.params;

        if (!content || content.trim() === '') {
            const error = new Error('Answer content is required');
            error.statusCode = 400;
            throw error;
        }

        const questionExists = await Question.findById(questionId);
        if (!questionExists) {
            const error = new Error('Question not found');
            error.statusCode = 404;
            throw error;
        }

        const answer = await Answer.create({
            content,
            question: questionId,
            author: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: 'Answer posted successfully',
            answer,
        });
    } catch (err) {
        next(err);
    }
};


export const deleteAnswer = async (req, res, next) => {
    try {
        const { answerId } = req.params;

        const answer = await Answer.findById(answerId);

        if (!answer) {
            const error = new Error('Answer not found');
            error.statusCode = 404;
            throw error;
        }

        // Only the author can delete their answer
        if (!answer.author.equals(req.user._id)) {
            const error = new Error('Not authorized to delete this answer');
            error.statusCode = 403;
            throw error;
        }

        await answer.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Answer deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};

export const getAnswersByQuestion = async (req, res, next) => {
    try {
        const { questionId } = req.params;

        const questionExists = await Question.exists({ _id: questionId });
        if (!questionExists) {
            const error = new Error('Question not found');
            error.statusCode = 404;
            throw error;
        }

        // Fetch answers, newest first, and populate author username
        const answers = await Answer.find({ question: questionId })
            .sort({ createdAt: -1 })
            .populate('author', 'username');

        res.status(200).json({
            success: true,
            total: answers.length,
            answers,
        });
    } catch (err) {
        next(err);
    }
};