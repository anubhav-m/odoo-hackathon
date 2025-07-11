import { config } from 'dotenv';

config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});

export const { PORT } = process.env || 3000; //Fallback if on prod no PORT is specified

export const { NODE_ENV, DB_URI } = process.env; 