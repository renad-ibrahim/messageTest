const router = require("express").Router()
const isAuth = require('../middleware/isAuth');

const { createMessage, getMessage } = require("../controller/messageController")


router.get("/:chatId", getMessage);
router.post("/", isAuth, createMessage);

module.exports = router
