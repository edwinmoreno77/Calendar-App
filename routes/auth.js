/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

//routes
router.post('/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    createUser
);

router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    loginUser
);

router.get('/renew', renewToken);



module.exports = router;