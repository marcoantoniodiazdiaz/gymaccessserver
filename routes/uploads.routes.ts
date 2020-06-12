import { Router, Request, Response } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import fs from 'fs';

import { app } from './router';
import path from 'path';

app.use(fileUpload());

app.put('/upload/:type', (req: Request, res: Response) => {

    const type = req.params.type;

    if (!req.files) {
        return res.status(400).json({
            ok: 'false',
            err: 'No se a seleccionado ningun archivo'
        });
    }

    let types = ['user_profile', 'gym_profile', 'gym_users', 'gym_portraits'];

    if (types.indexOf(type) < 0) {
        return res.status(400).json({
            ok: 'false',
            err: 'El archivo no es un tipo valido'
        });
    }

    let file = req.files.file as UploadedFile;
    let nombreCortado = file.name.split('.');
    let ex = nombreCortado[nombreCortado.length - 1];

    // Extensiones permitidas
    let extensiones = ['png', 'jpg', 'jpeg'];

    if (extensiones.indexOf(ex) < 0) {
        return res.status(400).json({
            ok: 'false',
            err: 'El archivo tiene una extension no invalida'
        });
    }

    const date = new Date();
    let nombreSubir = `${type}${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getSeconds()}${date.getMilliseconds()}`;


    file.mv(`uploads/${nombreSubir}.${ex}`, (err) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: 'Subido correctamente',
            name: `${nombreSubir}.${ex}`
        });
    });
});

app.get('/upload/:filename', (req: Request, res: Response) => {
    const filename = req.params.filename;
    let pathImg = path.resolve(__dirname, `../uploads/${filename}`)

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        res.status(400).json({
            ok: false,
            message: 'Imagen no encontrada',
            pathImg
        })
    }
});

export default app;