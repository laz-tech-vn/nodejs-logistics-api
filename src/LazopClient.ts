import axios from "axios";
import crypto = require("crypto");

class LazopClient {
  private signMethod: string = "sha256";
  // constructor
  constructor(
    private appKey: string,
    private secretKey: string,
    private baseUrl: string,
  ) {
    this.appKey = appKey;
    this.secretKey = secretKey;
    this.baseUrl = baseUrl;
  }

  /**
   * generate sign
   * @param $endpoint
   * @param $params
   * @return string
   */
  private gengerateSign(endpoint: string, params: any) {
    // Generate sign from sorted params + secret key and add to sorted params, system params
    const stringToBeSigned = `${endpoint}${Object.entries(params)
      .map(([key, value]) => `${key}${value}`)
      .join("")}`;
    return crypto
      .createHmac(this.signMethod, this.secretKey)
      .update(stringToBeSigned)
      .digest("hex")
      .toUpperCase();
  }

  /**
   * send request
   * @param $url
   * @param $params
   * @return mixed
   */
  public async request(endpoint: string, params: any, method: string = "POST") {
    const systemParams: any = {
      app_key: this.appKey,
      sign_method: this.signMethod,
      timestamp: new Date().getTime(),
    };
    const sortedParams: any = Object.entries({ ...systemParams, ...params })
      .sort()
      .reduce((obj: any, [key, value]) => {
        obj[key] = typeof value === "object" ? JSON.stringify(value) : value;
        return obj;
      }, {});
    const sign = this.gengerateSign(endpoint, sortedParams);
    systemParams["sign"] = sign;
    sortedParams["sign"] = sign;

    let query = Object.entries(systemParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    if (method === "GET") {
      const paramsString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      query += `&${paramsString}`;
    }

    let requestUrl = `${this.baseUrl}${endpoint}?${query}`;
    try {
      const response = await axios({
        method,
        url: requestUrl,
        data: sortedParams,
      });
      return response.data ?? response;
    } catch (error) {
      return error;
    }
  }
}
export default LazopClient;
