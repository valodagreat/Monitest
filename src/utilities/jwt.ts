import { sign, verify } from "jsonwebtoken";
import { Types } from 'mongoose';

class JwtUtility {
    static generateToken(id: Types.ObjectId) {
      return sign({ _id: id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIREII,
      });
    }
  
    static validateToken(token: string, config: string) {
      return verify(token, config);
    }
}
  
export default JwtUtility;