import axios, { AxiosInstance } from "axios";

class AxiosUtility {
  static AxiosHandler: AxiosInstance = axios.create({
      baseURL: process.env.AXIOSBASEURL,
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACKSECRET}`,
      },
  })
}

export default AxiosUtility;