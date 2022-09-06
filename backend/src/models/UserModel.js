const { v4: uuidv4 } = require('uuid');
const connection = require("../database/connection");

module.exports = {
    async create(user) {
        const userId = uuidv4();
        user.userId = userId;

        await connection("user").insert(user);
        return userId;
    },

    // Listar usuarios
    async index(){
        const result = await connection("user").select("*");
        return result;
    },

    // Busca de um usuario por um campo
    async getByFields(fields) {
        const result = await connection("user")
            .where(fields)
            .select("*")
            .first();
        return result;
    },

    // Busca de um usuario pelo seu id
    async getById(userId){
        const result = await connection("user")
            .where({ userId: userId })
            .select("*")
            .first();
        return result;
    },

    // Atualiza um usuario pelo seu id
    async updateById(userId, user){
        const result = await connection("user").where({ userId }).update(user);
        return result;
    },

    // Deleta um usuario pelo seu id
    async deleteById(userId){
        const result = await connection("user").where({ userId }).delete();
        return result;
    },
}