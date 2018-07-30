import mssql from 'mssql';

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

  handleUpload(name, data) {
    return new Promise((resolve, reject) => {
      new this.sql.Request()
        .input('blobname', name)
        .input('blobdata', mssql.VarBinary(mssql.MAX), data)
        .query('insert into Audio (name, blobdata) values (@blobname, @blobdata)')
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
        .query(`SELECT * from Audio WHERE ID = ${id}`)
        .then((res) => {
          resolve(res.recordset[0].blobdata);
        })
        .catch((err) => {
          console.log('err', err);
        });
    });
  }

  getAllSounds() {
    return new Promise((resolve, reject) => {
      new this.sql.Request()
        .query('SELECT id, name from Audio')
        .then((res) => {
          resolve(res.recordsets);
        })
        .catch((err) => {
          console.log('err', err);
          reject(err);
        });
    });
  }

  close() {
    console.log('Connection closed.');
    this.sql.close();
  }
}

export default DBConnection;
