const express = require("express")
const router = express.Router()
const { getItems } = require("../model/item.model")

router.get("/", async (req, res) => {
    const result = await getItems()

	res.status(200).send({
		msg: result
	})
})
module.exports = router