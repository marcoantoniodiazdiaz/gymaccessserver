import { Router, Request, Response } from 'express';
import MySQL from '../database/mysql';

const app = Router();
export { app };

app.get('/status', (req: Request, res: Response) => {
    const query = ` SELECT * FROM usuarios `;

    MySQL.executeQuery(query, (err: any, data: Object[]) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            return res.json({
                ok: true,
                data
            });
        }

    });
});

export default app;