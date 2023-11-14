import { describe, it, expect } from "vitest";
import renderer from "react-test-renderer";
import HostResultsList from "../HostResultsList";

describe("HostResultsList", () => {
  it("Renders with empty results", () => {
    const component = renderer.create(<HostResultsList  results={[]}/>);

    const result = component.toJSON();

    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result.children[0]).toBe('No Results found');
    expect(result.children.length).toBe(1);
  });

  it("Renders with results", () => {
    const mockResult = {
      ip: "0.0.0.0",
      services: [],
    };
    const component = renderer.create(<HostResultsList  results={[mockResult]}/>);

    const result = component.toJSON();

    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result.children[0].type).toBe('div');
    expect(result.children.length).toBe(1);
    expect(result.children[0].props.className).toBe('HostResult');
    expect(result.children[0].children.length).toBe(2);
  });
});
