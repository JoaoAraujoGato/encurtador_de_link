const LinkModel = require("../models/LinkModel");
const Firebase = require("../utils/Firebase");

module.exports = {
    async create(request, response){
        try{
            const link = request.body;
            
            const result = await LinkModel.create(link);
            return response.status(200).json({ linkId: result });
        } catch (err) {
            console.log("Link creation failed: " + err);
            return response.status(500).json({
                Notification: "Internal server error while trying to create Link",
            });
        }
    },

    async getById(request, response){
        try {
            const { linkId } = request.params;
            const result = await LinkModel.getById(linkId);
            
            return response.status(200).json(result);
        } catch (err) {
            console.log("Link getBId failed: " + err);
            return response.status(500).json({
                Notification : "Internal server error while trying to get Link",
            });
        }
    },

    async index(request, response){
        const link = await LinkModel.index();
        return response.json(link);
    },

    async update(request, response){
        try {
            const { linkId } = request.params;
            const link = request.body;
            
            await LinkModel.updateById(linkId, link);

            return response.status(200).json({ notification: "Link update sucesfully" });
        } catch (err) {
            console.log("Link update failed: " + err);
            return response.status(500).json({
                Notification : "Internal server error while trying to update Link",
            });
        }
    },

    async delete(request, response){
        try {
            const { linkId } = request.params;
            const result = await LinkModel.deleteById(linkId);

            if (result === 0) 
                return response.status(400).json({ notification: "linkId not found"});

            return response.status(200).json({ notification: "Link deleted sucesfully" });
        } catch (err) {
            console.log("Link delete failed: " + err);
            return response.status(500).json({
                Notification : "Internal server error while trying to get Link",
            });
        }
    }
}