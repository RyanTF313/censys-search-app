import { describe, it, expect } from "vitest";
import { group, groupServices } from "./../group";

describe("grouping functions", () => {
  const mockResult = {
    ip: "0.0.0.0",
    services: [
      { service_name: "test1" },
      { service_name: "test1" },
      { service_name: "test2" },
      { service_name: "test3" },
    ],
  };

  const mockResultGrouping = {
    "0.0.0.0": [
      {
        test1: 2,
        test2: 1,
        test3: 1,
      },
    ],
  };

  it("group", () => {
    expect(group([mockResult])).toStrictEqual(mockResultGrouping);
  });
  it("groupServices", () => {
    expect(groupServices(mockResult.services)).toStrictEqual(mockResultGrouping['0.0.0.0'][0]);
  });
});
