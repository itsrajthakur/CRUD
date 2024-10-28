import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/home', (request, response) => {
    let fName = request.body.FName;
    let lName = request.body.LName;

    response.json({ "Name": fName + " " + lName });
});

app.post('/add', (request, response) => {
    let a = request.body.a * 1;
    let b = request.body.b * 1;
    response.send(`Addition of ${a} + ${b} = ${a + b}`);
});

app.use((request, response) => {
    response.send("Page not found!");
})

app.listen(3000, () => {
    console.log("Server Started.......")
});


//Get - data dread
//Post - send data
//Delete - delete data
//Put - update data