import Search from "../Search";
import { SearchAPIService } from "../../apis/SearchAPIService";
import { ErrorContext } from "../../context/ErrorsContext";
import { ResultsContext } from "../../context/ResultsContext";
import { PaginationContext } from "../../context/PaginationContext";
import { RequestParamBuilderContext } from "../../context/RequestParamBuilderContext";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, act } from "@testing-library/react";
import renderer from "react-test-renderer";

describe("Search", () => {
  vi.mock("../../apis/SearchAPIService");
  const mockInputValue = "";
  const mockSetInputValue = vi.fn();
  const errorsMock = {};
  const setErrorsMock = vi.fn();
  const resultsMock = [];
  const setResultsMock = vi.fn();
  const setPrevMock = vi.fn();
  const setNextMock = vi.fn();
  const paramsMock = {};
  const setParamsMock = vi.fn();

  const search = (
    <ErrorContext.Provider
      value={{ errors: errorsMock, setErrors: setErrorsMock }}
    >
      <ResultsContext.Provider
        value={{ results: resultsMock, setResults: setResultsMock }}
      >
        <PaginationContext.Provider
          value={{ setPrev: setPrevMock, setNext: setNextMock }}
        >
          <RequestParamBuilderContext.Provider
            value={{ params: paramsMock, setParams: setParamsMock }}
          >
            <Search
              inputValue={mockInputValue}
              setInputValue={mockSetInputValue}
            />
          </RequestParamBuilderContext.Provider>
        </PaginationContext.Provider>
      </ResultsContext.Provider>
    </ErrorContext.Provider>
  );


  it("Renders", () => {
    const mockInputValue = "";
    const mockSetInputValue = vi.fn();
    const component = renderer.create(
      <Search inputValue={mockInputValue} setInputValue={mockSetInputValue} />
    );

    const result = component.toJSON();

    expect(result).toBeDefined();
    expect(result.children).toBeInstanceOf(Array);
    expect(result.children[0].type).toBe("form");
    expect(result.children[0].children.length).toBe(2);
  });

  it("input works", () => {
    const { getByPlaceholderText } = render(search);

    const searchInput = getByPlaceholderText(
      "Search an IP address, name, protocol or field: value"
    );
    act(() => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });
    expect(mockSetInputValue).toBeCalled(1);
    expect(setParamsMock).toBeCalled(1);
    expect(setErrorsMock).toBeCalled(1);
  });
  it("button works", async () => {
    const hostResponseMock = {
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
    };

    const { getByText } = render(search);

    const searchBtn = getByText("Search");

    await act(() => {
      SearchAPIService.search.mockResolvedValue(hostResponseMock);
      fireEvent.click(searchBtn);
    });

    expect(SearchAPIService.search).toHaveBeenCalled();
    expect(setParamsMock).toHaveBeenCalled();
    expect(setErrorsMock).toHaveBeenCalled();
    expect(setPrevMock).toHaveBeenCalled();
    expect(setNextMock).toHaveBeenCalled();
    expect(setResultsMock).toHaveBeenCalled();
  });
  it("button works with error response", async () => {
    const hostResponseMock = { valid: false, message: "No params given" };

    const { getByText } = render(search);

    const searchBtn = getByText("Search");

    await act(() => {
      SearchAPIService.search.mockResolvedValue(hostResponseMock);
      fireEvent.click(searchBtn);
    });

    expect(SearchAPIService.search).toHaveBeenCalled();
    expect(setParamsMock).toHaveBeenCalled();
    expect(setErrorsMock).toBeCalledTimes(4);
    expect(setPrevMock).toBeCalledTimes(1);
    expect(setNextMock).toBeCalledTimes(1);
    expect(setResultsMock).toBeCalledTimes(1);
  });
});
