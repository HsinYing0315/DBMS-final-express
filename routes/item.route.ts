const itemExpress = require("express")
const router = itemExpress.Router()
const { addItem, getItems, updItem, delItem } = require("../model/item.model")

router.post("/", async (req, res) => {
    const data = req.body
	try {
		await addItem(data)
		res.status(201).send({
			msg: data,
		})
	} catch (error) {
		res.status(500).send({
			msg: "Internal Server Error"
		})
	}
})
router.get("/", async (req, res) => {
    try {
        const items = await getItems()
        res.status(200).send({
            data: items
        })
    } catch (error){
        res.status(500).send({
			msg: "Internal Server Error"
		})
    }

})
router.patch("/:id", async (req, res) => {
    const data = req.body
    try {
        await updItem(req.params.id, data)
        res.status(200).send({
            msg: "item updated"
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            msg: "Internal Server Error"
        })
    }
})
router.delete("/:id", async (req, res) => {
    try {
        await delItem(req.params.id)
        res.status(200).send({
            msg: "item deleted"
        })
    } catch (err) {
        res.status(500).send({
            msg: "Internal Server Error"
        })
    }
})

module.exports = router