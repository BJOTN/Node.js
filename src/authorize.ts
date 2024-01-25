import { Request, Response, NextFunction } from "express";
import passport from "passport";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: any) => {
        if (err || !user) {
            res.status(401).json({ msg: 'error' })
        } else (
            req.user = user,
            next()
        )
    })(req, res, next)
}
export { authorize }