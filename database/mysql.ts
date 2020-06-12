import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'gymaccess_db',
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
        });

        this.conectarDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static escaped(value: any) {
        return MySQL.instance.cnn.escape(value);
    }

    static executeQuery(query: string, callback: Function) {
        this._instance.cnn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error en Query');
                console.log(err);
                return callback(err);
            }

            callback(null, results);
        })
    }

    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log("Error" + err.message);
            }

            this.conectado = true;
            console.log('Base de datos ONLINE');
        });
    }
}