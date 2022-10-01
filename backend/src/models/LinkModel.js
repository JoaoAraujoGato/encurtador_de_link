const { v4: uuidv4 } = require('uuid');
const connection = require("../database/connection");

module.exports = {
    async create(link) {
        const linkId = uuidv4();
        link.linkId = linkId;

        await connection("link").insert(link);
        return linkId;
    },

    // Listar usuarios
    async index(){
        const result = await connection("link").select("*");
        return result;
    },

    // Busca de um usuario por um campo
    async getByFields(fields) {
        const result = await connection("link")
            .where(fields)
            .select("*")
            .first();
        return result;
    },

    // Busca de um usuario pelo seu id
    async getById(linkId){
        const result = await connection("link")
            .where({ linkId: linkId })
            .select("*")
            .first();
        return result;
    },

    // Atualiza um usuario pelo seu id
    async updateById(linkId, link){
        const result = await connection("link").where({ linkId }).update(link);
        return result;
    },

    // Deleta um usuario pelo seu id
    async deleteById(linkId){
        const result = await connection("link").where({ linkId }).delete();
        return result;
    },
}