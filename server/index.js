const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "registrocivil"
});

app.post("/create", (request, res)=>{
    const nombre = request.body.nombre;
    const apellido = request.body.apellido;
    const direccion = request.body.direccion;
    const email = request.body.email;
    const fechaNacimiento = request.body.fechaNacimiento;

    db.query('INSERT INTO CLIENT(nombre, apellido, direccion, email, fechaNacimiento) VALUES (?,?,?,?,?)', [nombre, apellido, direccion, email,fechaNacimiento],
            (err, result)=>{
                if(err){
                    console.log(err);
                } else {
                    res.send("Cliente Registrado")
                }
            });
});

app.get("/get/clients", (request, res)=>{
    db.query('SELECT * FROM CLIENT',
            (err, result)=>{
                if(err){
                    console.log(err);
                } else {
                    res.send(result)
                }
            });
});

app.put("/put/client", (request, res)=>{
    const id = request.body.id;
    const nombre = request.body.nombre;
    const apellido = request.body.apellido;
    const direccion = request.body.direccion;
    const email = request.body.email;
    const fechaNacimiento = request.body.fechaNacimiento;
    db.query('UPDATE CLIENT SET nombre=?, apellido=?, direccion=?, email=?, fechaNacimiento=? WHERE id=?', [nombre, apellido, direccion, email, fechaNacimiento, id],
            (err, result)=>{
                if(err){
                    console.log(err);
                } else {
                    res.send("Cliente Actualizado")
                }
            });
});

app.delete("/delete/client/:id", (request, res)=>{
    const id = request.params.id;

    db.query('DELETE FROM CLIENT WHERE id=?', id,
            (err, result)=>{
                if(err){
                    console.log(err);
                } else {
                    res.send(result)
                }
            });
});

app.listen(3001, ()=>{
    console.log("Running app 3001")
})