const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cors = require('cors'); 

const app = express();
const port = 3000;

  app.use(cors({
    origin: 'http://localhost:19006',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

app.use(bodyParser.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "111019As",
  database: "acanner",
};

app.post("/registro", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      tipo_documento,
      fecha_nacimiento,
      correo,
      pregunta_seguridad,
      id_usuario,
      ficha,
      password,
      respuesta_seguridad,
    } = req.body;

    const passwordEncriptado = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO usuario 
      (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo_documento, fecha_nacimiento, 
      correo, pregunta_seguridad, id_usuario, ficha, password, respuesta_seguridad, rol) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await connection.execute(sql, [
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      tipo_documento,
      fecha_nacimiento,
      correo,
      pregunta_seguridad,
      id_usuario,
      ficha,
      passwordEncriptado,
      respuesta_seguridad,
      2,
    ]);

    connection.end();
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    res.status(500).json({ error: "Error al insertar el registro" });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});