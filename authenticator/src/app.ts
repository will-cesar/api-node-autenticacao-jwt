import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';

import { connectToDb } from './config/db';
import { authRouter } from './route/auth';

export const app = express();

// habilita o acesso aos endpoints para outra aplicação externa
app.use(cors());

// habilita o uso do json para as requisições
app.use(express.json());

// habilita a utilização dos logs em dev
app.use(logger('dev'));

// conecta ao banco
connectToDb();

// habilita a rota de autenticação na aplicação
app.use('/auth', authRouter);