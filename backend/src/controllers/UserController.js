const UserModel = require("../models/UserModel");
const Firebase = require("../utils/Firebase");

module.exports = {
    async create(request, response){
        try{
            const user = request.body;

            const uid = await Firebase.createNewUser(user.email, user.password);
            user.firebaseId = uid;
            
            delete user.password; 
            
            const result = await UserModel.create(user);
            return response.status(200).json({ userId: result });
        } catch (err) {
            console.log("User creation failed: " + err);
            return response.status(500).json({
                Notification: "Internal server error while trying to create User",
            });
        }
    },

    async getById(request, response){
        try {
            const { userId } = request.params;
            const result = await UserModel.getById(userId);
            
            return response.status(200).json(result);
        } catch (err) {
            console.log("User getBId failed: " + err);
            return response.status(500).json({
                Notification : "Internal server error while trying to get User",
            });
        }
    },

    async index(request, response){
        const user = await UserModel.index();
        return response.json(user);
    },

    async update(request, response){
        try {
            const { userId } = request.params;
            const user = request.body;
            
            await UserModel.updateById(userId, user);

            return response.status(200).json({ notification: "User update sucesfully" });
        } catch (err) {
            console.log("User update failed: " + err);
            return response.status(500).json({
                Notification : "Internal server error while trying to update User",
            });
        }
    },

    async delete(request, response){
        try {
            const { userId } = request.params;
            const result = await UserModel.deleteById(userId);

            if (result === 0) 
                return response.status(400).json({ notification: "userId not found"});

            return response.status(200).json({ notification: "User deleted sucesfully" });
        } catch (err) {
            console.log("User delete failed: " + err);
            return response.status(500).json({
                Notification : "Internal server error while trying to get User",
            });
        }
    }
}