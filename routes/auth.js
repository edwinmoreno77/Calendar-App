/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');

const router = Router();

//routes
router.post('/register', (req, res) => {
    res.json({
        ok: true,
        message: 'Hello World'
    });
});


module.exports = router;