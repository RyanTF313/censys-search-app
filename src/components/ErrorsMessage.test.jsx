import { describe, it, expect } from "vitest";
import renderer from "react-test-renderer";
import ErrorsMessage from "./ErrorsMessage";

describe("ErrorsMessage Banner test", () => {
  it("no error", () => {
    const component = renderer.create(<ErrorsMessage errors={{}} />);

    const result = component.toJSON();
    expect(result).toBeDefined();
    expect(result.children).not.toBeInstanceOf(Array);
    expect(result).not.toBeInstanceOf(Array);
  });
  it("has error", () => {
    const component = renderer.create(
      <ErrorsMessage errors={{ error: true, message: "No params given" }} />
    );

    const result = component.toJSON();
    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result).not.toBeInstanceOf(Array);
  });
  it("has incorrect fields in errors prop", () => {
    const component = renderer.create(
      <ErrorsMessage errors={{ error: true, fake: "No params given" }} />
    );

    const result = component.toJSON();
    expect(result).toBeDefined();
    expect(result.children).not.toBeInstanceOf(Array);
    expect(result).not.toBeInstanceOf(Array);
  });
  it("has all fields in errors prop", () => {
    const component = renderer.create(
      <ErrorsMessage
        errors={{ error: true, code: 200, message: "Successful", status: 200 }}
      />
    );

    const result = component.toJSON();
    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result.children.length).toBe(3);
    expect(result).not.toBeInstanceOf(Array);
  });
  it("has code fields in errors prop", () => {
    const component = renderer.create(
      <ErrorsMessage errors={{ error: true, code: "No params given" }} />
    );

    const result = component.toJSON();
    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result.children.length).toBe(1);
    expect(result).not.toBeInstanceOf(Array);
  });
  it("has message fields in errors prop", () => {
    const component = renderer.create(
      <ErrorsMessage errors={{ error: true, message: "No params given" }} />
    );

    const result = component.toJSON();
    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result.children.length).toBe(1);
    expect(result).not.toBeInstanceOf(Array);
  });
  it("has status fields in errors prop", () => {
    const component = renderer.create(
      <ErrorsMessage errors={{ error: true, status: "No params given" }} />
    );

    const result = component.toJSON();
    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result.children.length).toBe(1);
    expect(result).not.toBeInstanceOf(Array);
  });
});
