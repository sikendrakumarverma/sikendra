const userModels = require("../models/userModels")

const createUser = async function (req, res) {
    try {
        let data = req.body
        const createdData = await userModels.create(data)
        return res.status(201).send({ status: true, message: "success", data: createdData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })

    }
}

module.exports = { createUser }