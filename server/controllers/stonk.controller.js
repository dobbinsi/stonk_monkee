const Stonk = require("../models/stonk.model");
const jwt = require("jsonwebtoken");

module.exports = {
    findAllStonks: (req, res) => {
        Stonk.find({})
            .populate("createdBy", "username _id")
            .then((allStonks) => {
                console.log(allStonks);
                res.json(allStonks)
            })
            .catch((err) => {
                console.log("findAllStonks failed...");
                res.json({ message: "Something went wrong in findAllStonks", error: err });
            })
    },

    findAllStonksByUser: (req, res) => {
        Stonk.find({ createdBy: req.params.userId })
            .then((allUserStonks) => {
                console.log(allUserStonks);
                res.json(allUserStonks);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    findOneStonk: (req, res) => {
        Stonk.findOne({ _id: req.params.id })
            .then((oneStonk) => {
                console.log(oneStonk);
                res.json(oneStonk)
            })
            .catch((err) => {
                console.log("findOneStonk failed...");
                res.json({ message: "Something went wrong in findOneStonk", error: err });
            })
    },

    createNewStonk: (req, res) => {
        const newStonkObj = new Stonk(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        })
        newStonkObj.createdBy = decodedJWT.payload.id;
        newStonkObj.save()
            .then((newStonk) => {
                console.log(newStonk);
                res.json(newStonk)
            })
            .catch((err) => {
                console.log("createNewStonk failed...");
                res.status(400).json(err);
            })
    },

    updateStonk: (req, res) => {
        Stonk.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then((updatedStonk) => {
                console.log(updatedStonk);
                res.json(updatedStonk);
            })
            .catch((err) => {
                console.log("updateStonk failed...");
                res.status(400).json(err);
            })
    },

    deleteStonk: (req, res) => {
        Stonk.deleteOne({ _id: req.params.id })
            .then((deletedStonk) => {
                console.log(deletedStonk);
                res.json(deletedStonk)
            })
            .catch((err) => {
                console.log("deleteStonk failed...");
                res.json({ message: "Something went wrong in deleteStonk", error: err });
            })
    },
}

