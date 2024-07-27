import { Router } from "express";
import { enhance } from "../controller/enhance.controller";

const router = Router();

router.route("/").get((req, res) => {
	res.send(
		"Welcome to the suggestion route. Make a POST request to /enhance to get suggestions."
	);
});

router.route("/enhance").post(enhance);

export default router;
