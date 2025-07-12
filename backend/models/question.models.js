// models/question.models.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: 150,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true,
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export const Question = mongoose.model('Question', questionSchema);
