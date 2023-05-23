const userExpress = require("express")
const userRouter = userExpress.Router()

const { registerUser, getUser, editPhone, editRating } = require("../model/user.model")

userRouter.post("/", async (req, res) => {
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
userRouter.get("/:uid", async (req, res) => {
    console.log("user get")

    const user = await getUser(req.params.uid)

    res.status(200).send({
        data: user
    })
})
userRouter.patch("/:uid", async (req, res) => {
    const phone = req.body.phone
    const rating = req.body.rating
	
	try {
        if(phone){
            await editPhone(req.params.uid, phone)
            res.status(201).send({
                msg: "phone edited",
            })

            console.log("phone edited")
        }
        if(rating){
            await editRating(req.params.uid, rating)
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

module.exports = userRouter
