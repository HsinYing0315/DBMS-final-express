const express = require("express")
const cors = require("cors")
const app = express()

const itemRouter = require("./routes/item.route.ts")
const userRouter = require("./routes/user.route.ts")


const port = 3307
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
	res.status(200).send({
		msg: "this is working"
	})
})

app.use("/api/item", itemRouter)
app.use("/api/user", userRouter)

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})

