import LogisticsService from "../LogisticsService";
import { describe, test, expect, beforeEach, it } from "@jest/globals";

// load env variables from .env file
require("dotenv").config();
// process env variables
const { APP_KEY, SECRET_KEY, BASE_URL } = process.env as Record<string, string>;

describe("LogisticsService", () => {
  let logisticsService: LogisticsService;
  let packageCode: string;

  beforeEach(() => {
    logisticsService = new LogisticsService(APP_KEY, SECRET_KEY, BASE_URL);
  });

  it("should create a package", async () => {
    const timestamp = new Date().getTime();
    const externalOrderId = "TEST" + timestamp + "VNT";

    const response = await logisticsService.createPackage({
      dangerousGood: "false",
      shipper: {
        externalSellerId: "Q123",
        platformName: "Ice_cream",
        externalWarehouseCode: "WH02",
      },
      dimWeight: {
        length: "10",
        width: "10",
        weight: "100",
        height: "5",
      },
      origin: {
        address: {
          details: "Test quận 2",
          id: "R7346817",
        },
        phone: "0366452565",
        name: "Kho mặc định",
        email: "teat@gmail.com",
        geoLocation: {
          latitude: "21.027764",
          longitude: "105.834160",
        },
      },
      destination: {
        address: {
          details: "Phường Mai dịch",
          id: "R80199163",
          type: "home",
        },
        phone: "0366452565",
        name: "huy huy",
        email: "teat@gmail.com",
        geoLocation: {
          latitude: "21.027764",
          longitude: "105.834160",
        },
      },
      payment: {
        totalAmount: "234535",
        currency: "VND",
        paymentType: "COD",
        insuranceAmount: "0",
      },
      externalOrderId,
      platformOrderCreationTime: timestamp,
      packageType: "Sales_order",
      deliveryOption: "standard",
      items: [
        {
          unitPrice: "200000",
          quantity: "1",
          name: "Áo thun nam thời trang",
          id: "10887094399",
          sku: "SP701",
          paidPrice: "200000",
          category: "Áo thun nam",
          dimWeight: {
            length: "10",
            width: "10",
            weight: "100",
            height: "5",
          },
        },
        {
          unitPrice: "34535",
          quantity: "1",
          name: "áo TOP Nam đẹp",
          id: "AA66",
          sku: "1",
          paidPrice: "34535",
          category: "Áo thun nam",
          dimWeight: {
            length: "10",
            width: "10",
            weight: "100",
            height: "5",
          },
        },
      ],
      options: {
        directReturnToMerchant: "false",
        forwardPackageCode: "string",
        openBox: true,
        deliveryNote: "string",
        vasFdStorageOption: false,
        vasPartialDeliveryOption: false,
        orderSource: "string",
      },
    });
    // response.success = true
    expect(response).toHaveProperty("success");
    // response.data.packageCode = "string"
    expect(response.data).toHaveProperty("packageCode");
    packageCode = response.data.packageCode;
  });

  it("should print AWB", async () => {
    const response = await logisticsService.printAwb({
      packageCode: packageCode,
      type: "pdf",
    });
    // response.success = true
    expect(response).toHaveProperty("success");
    // response.data.awb = "string"
    expect(response.data).toHaveProperty("url");
  });

  it("should cancel package", async () => {
    const response = await logisticsService.cancelPackage({
      packageCode: packageCode,
      reason: "reason test",
    });
    // response.success = true
    expect(response).toHaveProperty("success");
  });
});
