const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");
const verifyToken = require("../middleware/verifyToken")

router.post('/updatescore/:userId',verifyToken, gameController.updateScores);
router.post("/leaderboard",verifyToken, gameController.leaderBoard);



module.exports = router;
