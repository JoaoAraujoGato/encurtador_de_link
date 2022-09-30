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
    }

}