const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const serviceAccount = require('./betamigo-proyecto-firebase-adminsdk-f7lts-321c4453ab.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.status(200).send(userRecord);
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).send(error);
  }
});



// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email);
    res.status(200).send(userRecord);
  } catch (error) {
    console.error('Error iniciando sesión:', error);
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor <link>Node.js</link> corriendo en el puerto ${PORT}`);
});
