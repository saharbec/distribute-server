const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'saharbech',
    host: 'localhost',
    database: 'api',
    port: 5432
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createUser = async (request, response) => {
    const { name, email, password } = request.body;
    hashedPassword = await bcrypt.hash(password, 8);

    pool.query(
        'INSERT INTO users (name, email,password) VALUES ($1, $2, $3) RETURNING id',
        [name, email, hashedPassword],
        (error, results) => {
            if (error) {
                throw error;
            }
            try {
                const id = results.rows[0].id;
                const payload = {
                    user: {
                        id
                    }
                };
                jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                    if (err) throw err;
                    response.status(200).json({ msg: `User created with ID: ${id}`, token });
                });
            } catch (err) {
                console.log(err);
            }
        }
    );
};

const updateUser = async (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email, password } = request.body;
    password = await bcrypt.hash(password, 8);

    pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
        [name, email, password, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results.rows);
            response.status(201).json({ msg: `User modified with ID: ${results.rows[0].id}` });
        }
    );
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    try {
        // See if user exists
        pool.query('SELECT * FROM users WHERE email = $1', [email], async (error, results) => {
            if (error) throw error;
            const user = results.rows[0];
            if (!user) {
                return res.status(404).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.error('Invalid Credentials');
                res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ msg: `User ID: ${user.id} logged in`, token });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getOneUser = (req, res) => {
    try {
        const { id } = req.user;
        pool.query('SELECT * FROM users WHERE id = $1', [id], async (error, results) => {
            const user = await results.rows[0];
            delete user.password;
            res.json(user);
        });
    } catch (err) {
        console.error(err.message);
        res.status(404).json({ msg: 'User not found' });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    getOneUser
};
