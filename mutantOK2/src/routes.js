import express from 'express';
const routes = express.Router();

import api from './api';

routes.get('/users', (req, res) => {

    api.get('users').then((response) => {
        return res.json(response.data);
    }).catch((err) => {
        return res.json(err);
    })

});

export default routes;