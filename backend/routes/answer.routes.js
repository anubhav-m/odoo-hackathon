import { Router } from 'express';
import { createAnswer, deleteAnswer, getAnswersByQuestion } from '../controllers/answer.controllers.js';
import { authorize } from '../middlewares/auth.middlewares.js';

export const answerRouter = Router();

//User authenticated routes
answerRouter.post('/:questionId', authorize, createAnswer);

answerRouter.delete('/:answerId', authorize, deleteAnswer);

//General routes
answerRouter.get('/:questionId', getAnswersByQuestion);