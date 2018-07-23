// import mssql from 'mssql';
import mysql from 'mysql';

class DBConnection {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'sa',
      password: 'sa',
      database: 'SplicerDemo',
    });
  }

  connect() {
    this.connection.connect();
    this.connection.query('SELECT * from test', (err, results, fields) => {
      if (err) throw err;
      console.log('Results: ', results);
    });
  }
}

// class DBConnection {
//   constructor() {
//     this.sql = mssql;
//     this.config = ({
//       user: 'sa',
//       password: 'sa',
//       server: 'localhost',
//       database: 'SplicerDemo',
//       port: 3306,
//       options: {
//         encrypt: true,
//       },
//     });
//   }

//   connect() {
//     this.sql.connect(this.config, (err) => {
//       console.log('intra', err);
//       if (err) {
//         this.sql.close();
//       } else {
//         console.log('Connected to DB');

//         this.testRequest();
//       }
//     });

//     this.sql.on('error', (err) => {
//       console.log(err);
//       this.sql.close();
//     });
//   }

//   testRequest() {
//     new this.sql.Request().query(
//       'SELECT * from test;',
//       (err, result) => {
//         if (err) {
//           console.log('intrs 2', err);
//           return;
//         }
//         console.log(result);
//       },
//     );
//   }

//   close() {
//     console.log('Connection closed.');
//     this.sql.close();
//   }
// }

export default DBConnection;
