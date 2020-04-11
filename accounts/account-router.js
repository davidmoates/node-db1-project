const express = require("express")
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
      const accounts = await db.select("*").from("accounts")
      res.json(accounts)
  } catch (e) {
    next(e)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const account = await db.first("*").from("accounts").where("id", req.params.id).limit(1)
    res.json(account)
()  } catch (e) {
    next(e)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    }

    // await db.insert(payload).into("accounts")
    const [id] = await db("accounts").insert(payload)
    const newAccount = await db("accounts").where("id", id).first()
    res.json(newAccount)

  } catch (e) {
    next(e)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    }

    await db("accounts").where("id", req.params.id).update(payload)
    const account = await db("accounts").where("id", req.params.id).first()

    res.json(account)

  } catch (e) {
    next(e)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts").where("id", req.params.id).del()
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = router
