import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
    {
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true,
            index: true,
        },

     
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        content: {
            type: String,
            required: [true, 'Answer content is required'],
        },

        votes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true } 
);

export const Answer = mongoose.model('Answer', answerSchema);
