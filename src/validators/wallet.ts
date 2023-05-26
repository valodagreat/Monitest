import Joi from "joi";

class WalletValidator {
    static transfer() {
        return Joi.object({
          accountNumber: Joi.number().min(10).required(),
          amount: Joi.number().min(1).required(),
        });
    }

    static fund() {
        return Joi.object({
          amount: Joi.number().min(1).required(),
        });
    }
}

export default WalletValidator;