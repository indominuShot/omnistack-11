const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        const {name, city, uf, email, whatsapp} = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id, 
            email, 
            name,
            city,
            uf,
            whatsapp
        })
        
        return res.json({id});
    },

    async list(req, res){
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    }
}