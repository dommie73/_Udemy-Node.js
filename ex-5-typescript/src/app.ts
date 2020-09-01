import express from 'express';

import * as routes from '@/routes';
import { handleError } from '@/middlewares';

const app = express();

app.use(express.json());
app.use('/todos', routes.todos);
app.use(handleError);

app.listen(3550, () => console.log('listening'));
