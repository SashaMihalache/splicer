import mssql from 'mssql';
import { resolve } from '../node_modules/uri-js';
// import mysql from 'mysql';

// class DBConnection {
//   constructor() {
//     this.connection = mysql.createConnection({
//       host: 'localhost',
//       user: 'sa',
//       password: 'sa',
//       database: 'SplicerDemo',
//     });
//   }

//   connect() {
//     this.connection.connect();
//     this.connection.query('SELECT * from test', (err, results) => {
//       if (err) throw err;
//       console.log('Results: ', results);
//     });
//   }
// }

class DBConnection {
  constructor() {
    this.sql = mssql;
    this.config = ({
      user: 'sa',
      password: 'P@ssw0rd',
      server: 'localhost',
      database: 'TestDB',
      port: 1433,
      options: {
        encrypt: true,
      },
    });
  }

  connect() {
    this.sql.connect(this.config, (err) => {
      console.log('intra', err);
      if (err) {
        this.sql.close();
      } else {
        console.log('Connected to DB');

        this.testRequest();
      }
    });

    this.sql.on('error', (err) => {
      console.log(err);
      this.sql.close();
    });
  }

  testRequest() {
    new this.sql.Request().query(
      'SELECT * from test;',
      (err, result) => {
        if (err) {
          console.log('err', err);
          return;
        }
        console.log(result);
      },
    );
  }

  handleUpload(data) {
    return new Promise((resolve, reject) => {
      new this.sql.Request()
        .input('blobname', 'testing')
        .input('blobdata', mssql.VarBinary(mssql.MAX), data)
        .query('insert into BlobTest (name, blobdata) values (@blobname, @blobdata)')
        .then((res) => {
          console.log('success', res);
          resolve();
        })
        .catch((err) => {
          console.log('err', err);
          reject();
        });
    });
  }

  getSound(id) {
    return new Promise((resolve, reject) => {
      new this.sql.Request()
        .query(`SELECT * from BlobTest WHERE ID = ${id}`)
        .then((res) => {
          resolve(res.recordset[0].blobdata);
        })
        .catch((err) => {
          console.log('err', err);
        });
    });
  }

  close() {
    console.log('Connection closed.');
    this.sql.close();
  }
}

export default DBConnection;
