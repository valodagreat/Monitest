import axios,{ AxiosInstance } from "axios";
import { IResponseData } from "../interface";
import ErrorMiddleware from "../middlewares/error";
// import AxiosUtility from "../utilities/axios";

class PaystackService {

    async initializePayment(email: string, amount: number ) {
        try {
            const { data } = await axios.post<IResponseData>(
                "https://api.paystack.co/transaction/initialize",
                {
                  email: email,
                  amount: amount * 100,
                  callback_url: process.env.CALLBACK_URL
                },
                {
                    headers: {
                      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Replace with your Paystack secret key
                      'Content-Type': 'application/json',
                    },
                  }
              );
              return {
                checkoutUrl: data.data["authorization_url"],
              };
        }catch (error) {
            console.error('Error initiating funding:', error);
            ErrorMiddleware.errorHandler("Failed to initiate funding", 500);
        }
      }

      async validatePayment(reference: string ) {
        try {
            const { data } = await axios.get<IResponseData>(
                `https://api.paystack.co/transaction/verify/${reference}`,
                {
                    headers: {
                      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Replace with your Paystack secret key
                      'Content-Type': 'application/json',
                    },
                  }
              );
              return {
                data: data.data,
              };
        }catch (error) {
            console.error('Error validating payment:', error);
            ErrorMiddleware.errorHandler("Failed to validate payment", 500);
        }
      }
    
}

export default new PaystackService();