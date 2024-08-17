// require('dotenv').config();
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// connection.connect(error => {
//   if (error) {
//     console.error('Error connecting to the database:', error);

//   }
//   console.log('Connected to the database.');
// });

//   export function findStudents()
//   {
//     const [rows] = connection.query("select * from students ");
//   return rows;
//   }
//   //
// export function findStudent(id) 
//   {
//     const [moh] =  connection.query("select * from students  where user_id=?",[id]);
//   return moh[0];
//   }
//   //
//   export function findStudentbyname(username) 
//   {
//     connection.query('SELECT * FROM students WHERE username = ?', [username], (error, results) => {
//       if (error) {
//         console.error('Database query error:', error);
//       }
//       const moh = results;
//       if (moh) {
//         console.log(moh);
//       } else {
//         console.log('No student found with the provided username.');
//       }
//     });
//   }
//   //
//   function NewIds()
//   {
//     try {
//       connection.query('CREATE TABLE temp_users LIKE students;');
//       connection.query('INSERT INTO temp_users SELECT * FROM students WHERE username is not null ;');
//       connection.query('TRUNCATE TABLE students;');
//       connection.query('alter table students auto_increment 1;');
//       connection.query('INSERT INTO students (user_id, username, user_password, user_email) SELECT NULL, username, user_password, user_email FROM temp_users;');
//       connection.query('DROP TABLE temp_users;');
//     } catch (err) {
//       console.error('Error executing query:', err);
//     }
//   }
//   //
// export  function insertStudent(username,password)
//   {
//     const [result]=connection.query("insert into students (username,user_password) value(?,?)", [username, password]);
//     const id =result.insertId
//     const newuser=findStudent(id);
//     NewIds();
//     return newuser;
//   }
//   //
//   export  function updatepass(username,newpassword)
//   {
//     const [result]=connection.query("update students set user_password=? where username=? ", [newpassword,username]);
  
//    // NewIds();
//     return newuser;
//   }
//   //
//     export function deletStudent(Username) {
//     try {
//       connection.query('DELETE FROM students WHERE username = ?;', [Username]);
//       NewIds();
//     }catch{(err)=>console.error('Error executing query:', err)};
//   };
 
//   const user =findStudentbyname("didin")
//   console.log(user)

exports.register = (req, res) => {
    console.log(req.body);
    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                return res.sendFile(__dirname + "request.html", {
                    message: 'The email is already in use'
                })
            } else if (password != passwordConfirm) {
                return res.sendFile(__dirname + "request.html", {
                    message: 'Password dont match'
                });
            }
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                return res.sendFile(__dirname + "request.html", {
                    message: 'User registered'
                });
            }
        })
    })
    res.send("Form submitted");
}