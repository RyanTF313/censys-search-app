import { describe, it, expect } from "vitest";
import renderer from "react-test-renderer";
import Logo from "../Logo";

describe("Logo test", () => {
  it("Renders", () => {
    const component = renderer.create(<Logo />);

    const result = component.toJSON();

    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result.children.length).toBe(1);
    expect(result.children[0].type).toBe('img');
  });
});
