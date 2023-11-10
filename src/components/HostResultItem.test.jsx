import { describe, it, expect } from "vitest";
import renderer from "react-test-renderer";
import HostResultItem from "./HostResultItem";

describe("HostResultItem test", () => {
  it("Renders", () => {
    const mockResult = {
      ip: "0.0.0.0",
      services: [],
    };
    const component = renderer.create(<HostResultItem result={mockResult} />);

    const result = component.toJSON();

    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result.children[0].children[0]).toBe(mockResult.ip);
    expect(result.children.length).toBe(2);
    expect(result).not.toBeInstanceOf(Array);
  });

  it("Renders with out ip address", () => {
    const mockResult = {
      services: [],
    };
    const component = renderer.create(<HostResultItem result={mockResult} />);

    const result = component.toJSON();
    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result.children[0]).toBe('No IP Address');
    expect(result.children.length).toBe(1);
    expect(result).not.toBeInstanceOf(Array);
  });
});
