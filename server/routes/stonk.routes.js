const StonkController = require("../controllers/stonk.controller");

const { authenticate } = require("../config/jwt.config");

module.exports = (app) =>{
    app.get("/api/stonks", StonkController.findAllStonks);
    app.post("/api/stonks/new", authenticate, StonkController.createNewStonk);
    app.get("/api/stonks/:key", StonkController.findOneStonk);
    app.get("/api/user/stonks/:userId", StonkController.findAllStonksByUser);
    app.delete("/api/stonks/:id", StonkController.deleteStonk);
}
