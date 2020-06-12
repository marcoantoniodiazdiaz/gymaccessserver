import { Router, Request, Response } from 'express';

import { app } from './router';
import MySQL from '../database/mysql';


app.get('/gym', (req: Request, res: Response) => {
    const query = `
    SELECT gym.id, gym.direccion, gym.logo, gym.nombre, clases.nombre AS clase, gym.descripcion, gym.telefono, lat_long.lat as lat, lat_long.lon as lon, AVG(valoraciones.valor) as valoraciones, COUNT(valoraciones.valor) as tValoraciones FROM gym INNER JOIN clases INNER JOIN valoraciones INNER JOIN lat_long WHERE gym.clase = clases.id AND gym.id = valoraciones.gym AND gym.lat_lon = lat_long.id GROUP BY gym
    `;

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

app.get('/gym/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    const query = `
    SELECT gym.id, gym.direccion, gym.logo, gym.nombre, clases.nombre AS clase, gym.descripcion, gym.telefono, lat_long.lat as lat, lat_long.lon as lon, AVG(valoraciones.valor) as valoraciones, COUNT(valoraciones.valor) as tValoraciones FROM gym INNER JOIN clases INNER JOIN valoraciones INNER JOIN lat_long WHERE gym.clase = clases.id AND gym.id = valoraciones.gym AND gym.lat_lon = lat_long.id AND gym.id = ${id}
    `;

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