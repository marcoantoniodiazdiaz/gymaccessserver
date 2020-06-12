import { Router, Request, Response } from 'express';

import { app } from './router';
import MySQL from '../database/mysql';
import bcrypt from 'bcrypt';
import * as _ from 'underscore';


app.get('/usuarios', (req: Request, res: Response) => {
	const query = `
   SELECT usuarios.id, usuarios.nombre, usuarios.nac, usuarios.estatura, usuarios.peso, usuarios.telefono, usuarios.foto, usuarios.email, usuarios.estatura FROM usuarios LIMIT 5;
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

app.get('/usuarios/:id', (req: Request, res: Response) => {
	const id = req.params.id;

	const query = `
   SELECT u.id, u.nombre, u.nac, u.estatura, u.peso, u.telefono, u.foto, u.email, u.estatura
   FROM usuarios as u
   WHERE u.id = ${id} 
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

app.post('/usuarios', (req: Request, res: Response) => {
	let body = req.body;

	body.password = bcrypt.hashSync(body.password, 10);

	const query = `
	INSERT INTO usuarios (nombre, foto, password, email)
	VALUES (
		${MySQL.instance.cnn.escape(body.nombre)}, ${MySQL.instance.cnn.escape(body.foto)}, ${MySQL.instance.cnn.escape(body.password)},${MySQL.instance.cnn.escape(body.email)}
	)
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