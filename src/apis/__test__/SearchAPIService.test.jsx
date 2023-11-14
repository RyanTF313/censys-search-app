import { describe, it, expect, vi } from "vitest";
import {
  SearchAPIService,
  validate,
  isObjectEmpty,
  getFields,
} from "../SearchAPIService";
import axios from "axios";
const {
  VITE_CENSYS_API_URL: apiUrl,
  VITE_CENSYS_SEARCH_ENDPOINT: endpoint,
  VITE_CENSYS_API_ID: apiID,
  VITE_CENSYS_API_SECRET: apiSecret,
} = import.meta.env;

describe("SearchAPIService", () => {
  describe("isObjectEmpty", () => {
    it("has no param", () => {
      expect(isObjectEmpty()).toBe(true);
    });
    it("has empty object", () => {
      expect(isObjectEmpty({})).toBe(true);
    });
    it("has fields in object", () => {
      expect(isObjectEmpty({ test: true })).toBe(false);
    });
  });
  describe("getFields", () => {
    it("has no param", () => {
      expect(getFields()).toBe("");
    });
    it("has empty string", () => {
      expect(getFields("")).toBe("");
    });
    it("has fields string in param", () => {
      expect(getFields("services.service_name: HTTP")).toStrictEqual([
        "services.service_name",
      ]);
    });
  });
  describe("validate", () => {
    it("has no param", () => {
      expect(validate().valid).toBe(false);
    });
    it("has one empty object", () => {
      expect(validate({}).valid).toBe(false);
    });
    it("has two empty objects", () => {
      expect(validate({}).valid).toBe(false);
    });
    it("has one param in object", () => {
      expect(validate({ test: true }).valid).toBe(false);
    });
    it("has two param in object", () => {
      expect(validate({ test: true }).valid).toBe(false);
    });
    it("has two param in object", () => {
      expect(validate({ test: true }, { test: true }).valid).toBe(true);
    });
  });
  describe("SearchAPIService", () => {
    vi.mock("axios");
    it("has invalid params passed in search", async () => {
      const mockParams = {};
      const mockCreds = { test: true };

      const hostResponseMock = [{ ip: 1 }, { ip: 2 }];

      axios.get.mockResolvedValue({
        data: hostResponseMock,
      });

      const host = await SearchAPIService.search(mockParams, mockCreds);

      expect(axios.get).not.toHaveBeenCalledWith(apiUrl);
      expect(host.valid).toBe(false);
      expect(host.message).toBe("No params given");
    });
    it("has invalid creds passed in search", async () => {
      const mockParams = { test: true };
      const mockCreds = {};

      const hostResponseMock = [{ ip: 1 }, { ip: 2 }];

      axios.get.mockResolvedValue({
        data: hostResponseMock,
      });

      const host = await SearchAPIService.search(mockParams, mockCreds);

      expect(axios.get).not.toHaveBeenCalledWith(apiUrl);
      expect(host.valid).toBe(false);
      expect(host.message).toBe("No creds given");
    });
    it("has invalid creds and params passed in search", async () => {
      const mockParams = {};
      const mockCreds = {};
      const hostResponseMock = [{ ip: 1 }, { ip: 2 }];

      axios.get.mockResolvedValue({
        data: hostResponseMock,
      });

      const host = await SearchAPIService.search(mockParams, mockCreds);

      expect(axios.get).not.toHaveBeenCalledWith(apiUrl);
      expect(host.valid).toBe(false);
      expect(host.message).toBe("No params given");
    });
    it("has successful request", async () => {
      const mockParams = {
        q: "",
        field: "",
        per_page: 50,
        virtual_host: "EXCLUDE",
        sort: "RELEVANCE",
        cursor: "",
      };
      const mockCreds = import.meta.env;

      const hostResponseMock = {
        status: 200,
        data: {
          code: 200,
          status: "OK",
          result: {
            query: "",
            total: 355866795,
            duration: 3946,
            hits: [],
          },
          links: {
            prev: "prevCursorToken",
            next: "nextCursorToken",
          },
        },
      };

      axios.get.mockResolvedValue(hostResponseMock);

      const res = await SearchAPIService.search(mockParams, mockCreds);

      expect(axios.get).not.toHaveBeenCalledWith(apiUrl);
      expect(res.valid).toBe(undefined);
      expect(res.message).toBe(undefined);
      expect(res).toBe(hostResponseMock.data.result);
    });
    it("has failed request", async () => {
      const mockParams = {
        q: "",
        field: "",
        per_page: 50,
        virtual_host: "EXCLUDE",
        sort: "RELEVANCE",
        cursor: "",
      };
      const mockCreds = import.meta.env;

      const hostResponseMock = {
        "code": 400,
        "status": "Bad Request",
        "error": "Invalid search. Your query could not be parsed"
      };

      axios.get.mockResolvedValue(hostResponseMock);

      const res = await SearchAPIService.search(mockParams, mockCreds);

      expect(axios.get).not.toHaveBeenCalledWith(apiUrl);
      expect(res.valid).toBe(undefined);
      expect(res.message).toBe(undefined);
      expect(res).toBe(hostResponseMock);
    });
  });
});
