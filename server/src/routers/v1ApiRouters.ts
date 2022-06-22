import { Request, Response, Router } from "express";
import auth from "../middleware/authz.middleware";
import { Authentication } from '../module/authentication/router'
import NewsFeed from "../module/newsfeed/router";
const v1ApiRouter = Router();

v1ApiRouter.use("/", (req: Request, res: Response, next) => {
    // res.status(200).json({
    //     success: "true",
    //     data: "Api v1",
    // });
    next()
});

v1ApiRouter.use("/authentication", Authentication);
v1ApiRouter.use("/newsfeed", auth,NewsFeed);

export default v1ApiRouter;