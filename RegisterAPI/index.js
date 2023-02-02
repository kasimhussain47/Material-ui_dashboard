const mysql = require("mysql");
// const otpGenerator = require("otp-generator");
const express = require("express");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kk",
});

app.post("/register", (req, res) => {
  const Name = req.body.Name;
  const Email = req.body.Email;
  const Password = req.body.Password;

  con.query(
    "INSERT INTO register (Name,Email,Password) VALUES (?,?,?)",
    [Name, Email, Password],
    (err, result) => {
      console.log(err);
    }
  );

  app.post("/sender", (req, res) => {
    var OTP = Math.floor(100000 + Math.random() * 9000);
    // const OTP = req.body.OTP;
    // console.log(otp);
    con.query("INSERT INTO Verify (OTP) VALUES (?)", [OTP], (err, result) => {
      // console.log(err);
      // console.log(result);

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kushvdarji@gmail.com",
          pass: "lequgskpfswekfre",
        },
      });

      let details = {
        from: "kushvdarji@gmail.com",
        to: "kasimhusain5788@gmail.com",
        subject: "Verify your OTP..!",
        text: "Your OTP is : " + OTP + " Please Don't Share this to anyone",
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log("error occured");
        } else {
          console.log("email has been send");
        }
      });
    });
  });

  // const db = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "API",
  // });
});

app.post("/verification", (req, res) => {
  const OTP = req.body.OTP;

  con.query("SELECT * FROM Verify WHERE OTP = ?", [OTP], (err, result) => {
    if (err) {
      console.log(err);
      res.json({ success: false, err: err });
    } else {
      console.log(result);
      if (result.length > 0) {
        res.json({ success: true, result: result });
      } else {
        res.json({ success: false, message: "wrong password/email" });
      }
    }
  });
});

app.post("/login", (req, res) => {
  // const Name = req.body.Name;
  const Email = req.body.Email;
  const Password = req.body.Password;

  con.query(
    "SELECT * FROM register WHERE Email = ? AND Password=?",
    [Email, Password],
    (err, result) => {
      if (err) {
        res.json({ success: false, err: err });
      } else {
        if (result.length > 0) {
          res.json({ success: true, result: result });
        } else {
          res.json({ success: false, message: "wrong password/email" });
        }
      }
    }
  );
});

// app.listen(8002, () => {
//   console.log("server running");
// });

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "API",
// });

// app.post("/sender", (req, res) => {
//   const OTP = req.body.OTP;
//   console.log(OTP);
//   db.query("INSERT INTO register (OTP) VALUES (?)", [OTP], (err, result) => {
//     console.log(err);
//     console.log(result);
//   });

// });
app.get("/getting", (req, res) => {
  con.query("SELECT * FROM register", (error, result) => {
    if (error) {
      res.send({error:error});
    } else {
      res.send({result:result});
    }
  });
});

// app.post("/Adding", (req, res) => {
//   const {Name,Email,Password} = req.body;
//   con.query(
//     "INSERT INTO register (Name,Email,Password) VALUES (?,?,?)",
//     [Name, Email, Password],
//     (error,result)=> {
//       if(error){
//         console.log(error);
//       }
//     }
//   )
// })
    // ---------------> does't need 

app.delete("/deleting/:id",(req, res) => {
  const { id } = req.params;
  con.query("DELETE FROM register WHERE id = ?", id, (error,result) => {
    if (error){
      console.log(error);
    }
  });
});

app.get("/getting/:id", (req, res) => {
  const { id } = req.params;
  con.query("SELECT * FROM register WHERE id = ?",id, (error, result) => {
    if (error) {
      res.json({success:false,error:error});
      // res.send({error:error});
      console.log(error);
    } else {
      // res.send({result:result});
      res.json({success:true ,result: result});
      console.log(result);
    }
  });
});

app.put("/putting/:id", (req, res) => {
  const { id } = req.params;
  const { Name,Email,Password } = req.body;
  con.query("UPDATE register SET Name = ?, Email = ?, Password = ? WHERE id = ?",[Name, Email, Password, id], (error, result) => {
    if (error) {
      res.send({error:error});
    } else {
      res.send({result:result});
    }
  });
});



app.get("/get", (req, res) => {
  con.query("SELECT * FROM Tables", (error, result) => {
    if (error) {
      res.send({error:error});
    } else {
      res.send({result:result});
    }
  });
});

app.listen(8004, () => {
  console.log("server running 8004");
});
