const express = require("express")
const {
	getItems,
} = require("./model/item.model")
const app = express()


const port = 1224
app.use(express.json())


app.get("/", (req, res) => {
	res.status(200).send({
		msg: "this is working"
	})
})

app.get("/item", async (req, res) => {
	console.log("get item")

	try {
		const item = await getItems()
		if (item.length === 0) {
			res.status(404).send({
				msg: "No item found"
			})
			return
		}
		res.status(200).send({
			item: item
		})
	} catch (error) {
		res.status(500).send({
			msg: "Internal Server Error"
		})
	}
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})

