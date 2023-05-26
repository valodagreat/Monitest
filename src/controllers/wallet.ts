import { Request, Response } from "express";
import { CustomRequest } from "../interface";
import WalletService from "../services/wallet";

class WalletController {

    /**
     * @author Valentine
     * @method  GET - getMyWallet
     * @desc Feature: gets user wallet
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} Json data
     */
     async getMyWallet(req: CustomRequest, res: Response): Promise<void> {
        try {
            if(req.user){
                const wallet = await WalletService.getMyWallet(req.user._id);
                res.status(200).send({ message: null, data: wallet });
            }
        } catch (err: any) {
            const status = err.status ? err.status : 400;
            res.status(status).send({ message: err.message, data: null });
        }
     }

     /**
     * @author Valentine
     * @method  POST - transfer
     * @desc Feature: performs in-app transfer
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} Json data
     */
     async transfer(req: CustomRequest, res: Response): Promise<any> {
        try {
          if(req.user){
            const userId = req.user._id;
            await WalletService.transfer(userId, req.body);
            res
                .status(200)
                .send({ message: "transfer is being processed", data: null });
          }
        } catch (err: any) {
          const status = err.status ? err.status : 400;
          res.status(status).send({ message: err.message, data: null });
        }
      }

      /**
     * @author Valentine
     * @method  POST - fund
     * @desc Feature: Initiates transaction from paystack
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} Json data
     */
     async fund(req: CustomRequest, res: Response): Promise<any> {
      try {
        if(req.user){
          const userId = req.user._id;
          const data = await WalletService.fund(userId, req.body.amount);
          // res.redirect(data?.checkoutUrl);
          res
              .status(200)
              .send({ message: "transfer is being processed", data });
        }
      } catch (err: any) {
        const status = err.status ? err.status : 400;
        res.status(status).send({ message: err.message, data: null });
      }
    }

    /**
     * @author Valentine
     * @method  GET - verifyPayment
     * @desc Feature: validates payment after being received
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} Json data
     */
     async verifyPayment(req: CustomRequest, res: Response): Promise<void> {
      try {
          const wallet = await  WalletService.verifyPayment(req.query.reference as string);
          res.status(200).send({ message: null, data: wallet });
      } catch (err: any) {
          const status = err.status ? err.status : 400;
          res.status(status).send({ message: err.message, data: null });
      }
   }
}

export default WalletController;