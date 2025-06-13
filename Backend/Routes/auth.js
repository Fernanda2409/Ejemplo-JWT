const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('mysql2');
require('dotenv').config();

// Ruta de registro
router.post('/register', async (req, res) => {
    const {
        nombre,
        segundo_nombre,
        apellido_paterno,
        apellido_materno,
        email,
        password,
        confirmar_password
    } = req.body;

    // Validar que las contraseñas coincidan
    if (password !== confirmar_password) {
        return res.status(400).send('Las contraseñas no coinciden');
    }

    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuarios
            (nombre, segundo_nombre, apellido_paterno, apellido_materno, email, password)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [nombre, segundo_nombre, apellido_paterno, apellido_materno, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error('Error al registrar al usuario:', err);
                    return res.status(500).send('Error al registrar');
                }

                console.log('Usuario registrado con ID:', result.insertId);
                res.status(200).send('Usuario registrado correctamente');
            }
        );
    } catch (error) {
        console.error('Error en el servidor al registrar:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.error('Error en la consulta del login:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (result.length === 0) {
            return res.status(401).send('Correo no registrado');
        }

        const user = result[0];

        // Verificar contraseña
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).send('Contraseña incorrecta');
        }

        // Generar token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Token generado para:', user.email);
        res.json({ token });
    });
});

module.exports = router;
