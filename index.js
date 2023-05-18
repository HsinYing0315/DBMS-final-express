const express = require("express")
const {
	getItems,
} = require("./model/item.model")
const { getUser, registerUser, editPhone, editRating } = require("./model/user.model")
const app = express()


const port = 3307
app.use(express.json())


app.get("/", (req, res) => {
	res.status(200).send({
		msg: "this is working"
	})
})

app.get("/item", async (req, res) => {
	console.log("get all items")

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

app.get("/user", async (req, res) => {
	console.log("get user")
    const uid = req.body.uid
    if(!uid) {
		res.status(400).send({
			msg: "Need a uid"
		})
		return
	}

	try {
		const user = await getUser(uid)
		if (!user) {
			res.status(404).send({
				msg: "user not found"
			})
			return
		}
		res.status(200).send({
			user: user
		})
	} catch (error) {
		res.status(500).send({
			msg: "Internal Server Error"
		})
	}
})

app.post("/user", async (req, res) => {
    console.log("new user")

	const uid = req.body.uid
	if (!uid) {
		res.status(400).send({
			msg: "Need a uid"
		})
		return
	}
	try {
		await registerUser(uid)
		res.status(201).send({
			msg: "User registered",
		})
	} catch (error) {
		res.status(500).send({
			msg: "Internal Server Error"
		})
	}
})
app.patch("/user", async (req, res) => {
	const uid = req.body.uid
    const phone = req.body.phone
    const rating = req.body.rating
	if (!uid) {
		res.status(400).send({
			msg: "Need an uid"
		})
		return
	}
	try {
        if(phone){
            await editPhone(uid, phone)
            res.status(201).send({
                msg: "phone edited",
            })

            console.log("phone edited")
        }
        if(rating){
            await editRating(uid, rating)
            res.status(201).send({
                msg: "rating edited",
            })

            console.log("rating edited")
        }
	} catch (error) {
		res.status(500).send({
			msg: "Internal Server Error"
		})
	}
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})

