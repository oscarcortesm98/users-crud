import express from "express";
import db from "./utils/database.js";
import User from "./models/users.model.js";
import "dotenv/config";

User;

const PORT = process.env.PORT ?? 8000;

// Probar conexión con base de datos

db.authenticate()
.then(() => {
    console.log('Conexión correcta');
})
.catch((error) => console.log(error));
//

db.sync() // <- SI LA TABLA NO EXISTE, SE CREARA AUTOMATICAMENTE
.then(() => console.log('Base de datos sincronizada'))
.catch(error => console.log('Error'));

const app = express();

app.use(express.json());  // <- IMPORTANTE PARA PODER LEER EL JSON

// Health check

app.get('/', (req, res)=> {
    res.send('Ok')
})

//

/* --- CREATE USER --- */

app.post('/users', async(req, res) => {
    try {
        const { body } = req;
        // INSERT INTO users VALUES ('username', 'email', 'password')
        const user = await User.create(body);
        res.status(201).json(user);
    }
    catch(error) {
        res.status(400).json(error);
    }
  });
  
  /* ------------------- */


  /* --- FIND USERS --- */

  app.get('/users', async (req, res) => {
    try {
        // SELECT * FROM (TABLE)
      const users = await User.findAll();
      res.json(users);
    }
    catch (error) {
        res.status(400).json(error);
    }
  });

  /* ------------------ */


  /* --- FIND USERS BY --- */

  app.get('/users/:id', async (req, res) => {
    try {
        // SELECT * FROM (TABLE) WHERE (PARAM)
      const { id } = req.params;
      const user = await User.findByPk(id);
      res.json(user);
    }
    catch (error) {
      res.status(400).json(error);
    }
  })

  /* --------------------- */


  /* --- UPDATE USER --- */
  
  app.put('/users/:id', async (req, res) => {
    try {
        // UPDATE (TABLE) SET (DATA) WHERE (PARAM)
        const { id } = req.params;
        const { body } = req;
        const user = await User.update(body, { // <- INFORMACION A ACTUALIZAR
            where: { id: id } // <- INFORMACION NUEVA
        });
        res.json(user);
      }
      catch (error) {
        res.status(400).json(error);
      }
  });

  /* ------------------- */


  /* --- DELETE USER --- */

  app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({
            where: { id }
        });
        res.status(204).end()
    }
    catch (error) {
        res.status(400).json(error);
    }
  })

app.listen(PORT, () => {
    console.log(`Running server in port ${PORT}`);
})