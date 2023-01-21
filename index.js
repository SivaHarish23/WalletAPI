const { Client } = require('pg')

const client = new Client({
    host: "sanjay.cqlap8amzsmz.ap-northeast-1.rds.amazonaws.com",
    user: "tillde",
    port: 5432,
    password: "xerneas12",
    database: "sanjdb"
})
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT || 3500, () => {
    console.log("Server is now listening at post 3500");
})

client.connect(function (err) {
    if (err) throw err;
});

app.get("/", (req, res) => res.json('My WalletAPI is running'));

//GET
app.get("/students", (req, res) => {
    client.query(`Select * from wallet`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    })
    client.end;
})

//GET by id
app.get("/students/:rollno", (req, res) => {
    client.query(`Select * from wallet where rollno=${req.params.rollno}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

//POST
app.post('/addStudents', (req, res) => {
    const user = req.body;
    // console.log(user.ID);
    // console.log(user.Balance);
    // console.log(user.RollNo);
    //INSERT INTO public.wallet(rollno) VALUES ('20EE122');
    let insertQuery = `insert into wallet("rollno") values('${user.rollno}')`
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Roll no Insertion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})


//PUT
app.put('/balance', (req, res) => {
    let user = req.body;
    //UPDATE public.wallet SET balance=100 WHERE rollno = '20EE702';
    let updateQuery = `update wallet set balance = '${user.balance}' where rollno = '${user.rollno}'`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Balance Update was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})