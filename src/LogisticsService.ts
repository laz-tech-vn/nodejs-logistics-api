import LazopClient from "./LazopClient";

class LogisticsService {
  private lazopClient: LazopClient;
  constructor(appKey: string, secretKey: string, baseUrl: string) {
    this.lazopClient = new LazopClient(appKey, secretKey, baseUrl);
  }
  /**
   * create package
   * @param $params
   * @return mixed
   * @document https://open.lazada.com/apps/doc/api?path=%2Flogistics%2Fepis%2Fpackages
   */
  public async createPackage(params: any) {
    return this.lazopClient.request("/logistics/epis/packages", params);
  }

  /**
   * Mapping seller account to open platform account
   * @param $params
   * @return mixed
   * @document https://open.lazada.com/apps/doc/api?path=%2Flogistics%2Fepis%2Fcustomers%2Fexternal_relationships_bundle
   */
  public async mappingSellerAccount(params: any) {
    return this.lazopClient.request(
      "/logistics/epis/customers/external_relationships_bundle",
      params,
    );
  }

  /**
   * Create warehouse
   * @param $params
   * @return mixed
   * @document https://open.lazada.com/apps/doc/api?path=%2Flogistics%2Fepis%2Fcustomers%2Fwarehouses
   */
  public async createWarehouse(params: any) {
    return this.lazopClient.request(
      "/logistics/epis/customers/warehouses",
      params,
    );
  }

  /**
   * Print AWB
   * @param $params
   * @return mixed
   * @document https://open.lazada.com/apps/doc/api?path=%2Flogistics%2Fepis%2Fpackages%2Fawb
   */
  public async printAwb(params: any) {
    return this.lazopClient.request(
      "/logistics/epis/packages/awb",
      params,
      "GET",
    );
  }

  /**
   * cancel package
   * @param $params
   * @return mixed
   * @document https://open.lazada.com/apps/doc/api?path=%2Flogistics%2Fepis%2Fpackages%2Fcancel
   */
  public async cancelPackage(params: any) {
    return this.lazopClient.request("/logistics/epis/packages/cancel", params);
  }

  /**
   * Get Delivery options
   * @param $params
   * @return mixed
   * @document https://open.lazada.com/apps/doc/api?path=%2Flogistics%2Fepis%2Fservice%2Fdelivery_options
   */
  public async getDeliveryOptions(params: any) {
    return this.lazopClient.request(
      "/logistics/epis/service/delivery_options",
      params,
      "GET",
    );
  }
  /**
   * Estimate shipping fee
   * @param $params
   * @return mixed
   * @document https://open.lazada.com/apps/doc/api?path=%2Flogistics%2Fepis%2Festimate_shipping_fee
   */
  public async estimateShippingFee(params: any) {
    return this.lazopClient.request(
      "/logistics/epis/estimate_shipping_fee",
      params,
      "GET",
    );
  }

  /**
   * PackageConsignment
   * @param $params
   * @return mixed
   * @document https://open.lazada.com/apps/doc/api?path=%2Flogistics%2Fepis%2Fpackages%2Fconsign
   */
  public async packageConsignment(params: any) {
    return this.lazopClient.request("/logistics/epis/packages/consign", params);
  }

  /**
   * PackageInfoUpdate
   * @param $params
   * @return mixed
   * @document https://open.lazada.com/apps/doc/api?path=%2Flogistics%2Fepis%2Fpackages%2Fupdate
   */
  public async packageInfoUpdate(params: any) {
    return this.lazopClient.request("/logistics/epis/packages/update", params);
  }
  /**
   * Package Ready To Shipped
   * @param $params
   * @return mixed
   * @document https://open.lazada.com/apps/doc/api?path=%2Flogistics%2Fepis%2Fpackages%2Frts
   */
  public async packageReadyToShipped(params: any) {
    return this.lazopClient.request("/logistics/epis/packages/rts", params);
  }
}
export default LogisticsService;
