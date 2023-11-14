import { describe, it, expect } from "vitest";
import renderer from "react-test-renderer";
import SearchResult from "../SearchResult";

describe("SearchResult component", () => {
  it("component renders empty div", () => {
    const component = renderer.create(<SearchResult />);

    const result = component.toJSON();

    expect(result.type).toBe("div");
    expect(result.props.className).toBe("Results");
    expect(result.children).toBe(null);
  });

  it("component renders no results message and pagination", () => {
    const component = renderer.create(<SearchResult results={[]} />);

    const result = component.toJSON();

    expect(result.type).toBe("div");
    expect(result.props.className).toBe("Results");
    expect(result.children.length).toBe(2);
    expect(
      result.children.find((child) => (child.props.className = "ResultsList"))
    ).toBeTruthy();
    expect(
      result.children.find((child) => (child.props.className = "ResultsList"))
        .children[0]
    ).toBe("No Results found");
    expect(
      result.children.find((child) => (child.props.className = "Pagination"))
    ).toBeTruthy();
  });

  it("component renders no results message and pagination", () => {
    const component = renderer.create(<SearchResult results={[{ip: '0.0.0.0', services: []}]} />);

    const result = component.toJSON();

    expect(result.type).toBe("div");
    expect(result.props.className).toBe("Results");
    expect(result.children.length).toBe(2);
    expect(
      result.children.find((child) => (child.props.className = "ResultsList"))
    ).toBeTruthy();
    expect(
      result.children.find((child) => (child.props.className = "ResultsList"))
        .children.find(child => child.props.className = 'HostResult')
    ).toBeTruthy();
    expect(
      result.children.find((child) => (child.props.className = "Pagination"))
    ).toBeTruthy();
  });
});
