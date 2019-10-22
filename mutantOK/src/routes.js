import express from 'express';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db2.js');
const db = lowdb(adapter);

db.defaults({
    users: []
}).write()

const routes = express.Router();

const users = db.get('users');
const websites = db.get('users').map('website');
const name = db.get('users').map('name').sort();
const email = db.get('users').map('email').sort();
const company = db.get('users').map('company').map('name').sort();
//const address = db.get('users').map('address').map('suite');
const address = db.get('users').filter((user) => {
    return user.address['suite'].includes("Suite");
}).map(u => { return u.address.suite });


routes.get('/users', (req, res) => {
    return res.json(users);
});

routes.get('/users/websites', (req, res) => {
    return res.json(websites);
});

routes.get('/users/data', (req, res) => {
    return res.json({ name, email, company });
});

routes.get('/users/address-suite', (req, res) => {
    return res.json(address);
});

export default routes;