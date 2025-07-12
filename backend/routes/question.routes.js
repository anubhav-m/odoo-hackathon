import { Router } from 'express';
import { authorize } from '../middlewares/auth.middlewares.js';
import { createQuestion, deleteQuestion, getQuestions, getQuestionById } from '../controllers/question.controllers.js';

export const questionRouter = Router();


//User authenticated routes
questionRouter.post('/', authorize, createQuestion);

questionRouter.delete('/:id', authorize, deleteQuestion);


//General routes
questionRouter.get('/', getQuestions);

questionRouter.get('/:id', getQuestionById);
