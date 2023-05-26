import { Request, Response, NextFunction } from "express";
import { CustomRequest, Data, UserJWT } from "../interface";
import JwtUtility from "../utilities/jwt";



class AuthMiddleware {
  authorize(req: CustomRequest, res: Response, next: NextFunction) {
    const header: any = req.header("Authorization");
    if (!header) {
      return res.status(401).send({ message: "No bearer token provided" });
    }
    const token = header.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .send({ message: "Access Denied: No token provided" });
    try {
      req.user = JwtUtility.validateToken(token, process.env.JWT_SECRET as string) as UserJWT;
      next();
    } catch (err) {
      res.status(400).send({ message: "Invalid token" });
    }
  }

  checkParams(req: CustomRequest, res: Response, next: NextFunction) {
    const reference = req.query.reference
    if(!reference){
      return res.status(400).send({ message: "No reference to validate transaction" });
    }
    next();
  }
}

export default new AuthMiddleware();