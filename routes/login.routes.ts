import { Router, Request, Response } from 'express';

import { app } from './router';
import MySQL from '../database/mysql';
import { MysqlError } from 'mysql';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

app.post('/login', (req: Request, res: Response) => {

    let body = req.body;

    if (body.password === "" || body.email === "") {
        return res.status(400).json({
            ok: false,
            err: 'Los campos son invalidos'
        });
    }

    const query = `
    SELECT u.id, u.nombre, u.email, u.password FROM usuarios as u WHERE u.email = ${MySQL.escaped(body.email)}
    `

    MySQL.executeQuery(query, (erro: MysqlError, data: any[]) => {
        if (erro) {
            console.log(erro);
            return res.status(400).json({
                ok: false,
                err: 'Error de conexion',
                erro // TODO: QUITAR ESTO
            });
        }

        if (data.length === 0) {
            return res.status(400).json({
                ok: false,
                err: 'El usuario no esta registrado'
            });
        }


        if (!bcrypt.compareSync(body.password, data[0]['password'])) {
            return res.status(400).json({
                ok: false,
                err: 'El email o la contraseña son incorrectos'
            });
        }

        let token = jwt.sign(
            { data }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '60d' }
        );

        res.json({
            ok: true,
            data,
            token
        });
    });

});

export default app;