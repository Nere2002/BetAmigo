const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const serviceAccount = require('./assets/betamigo-d49f9-firebase-adminsdk-3x0yz-f138652610.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



// app.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const userRecord = await admin.auth().createUser({
//       email,
//       password,
//     });
//     res.status(200).send(userRecord);
//   } catch (error) {
//     console.error('Error registrando usuario:', error);
//     res.status(500).send(error);
//   }
// });
app.post('/register', async (req, res) => {
  try {
    const { email, password, displayName} = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Crear documento de usuario en Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email,
     displayName
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

app.put('/users/profile/imageUrl', async (req, res) => {
  try {
    const userId = req.user.uid; // Obtén el ID del usuario actual (puedes obtenerlo del token de autenticación)
    const { imageUrl } = req.body;

    // Actualiza el perfil del usuario en la base de datos con la nueva URL de la imagen
    await admin.firestore().collection('users').doc(userId).update({
      profileImageUrl: imageUrl
    });

    res.status(200).send({ message: 'URL de imagen actualizado en el perfil del usuario' });
  } catch (error) {
    console.error('Error al guardar URL de imagen en el perfil del usuario:', error);
    res.status(500).send({ error: 'Error al guardar URL de imagen en el perfil del usuario' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
