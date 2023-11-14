import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, act } from "@testing-library/react";
import renderer from "react-test-renderer";
import Pagination from "../Pagination";
import { SearchAPIService } from "../../apis/SearchAPIService";

import { ResultsContext } from "../../context/ResultsContext";
import { PaginationContext } from "../../context/PaginationContext";
import { RequestParamBuilderContext } from "../../context/RequestParamBuilderContext";

describe("Pagination", () => {
  vi.mock("axios");
  vi.mock("../../apis/SearchAPIService");
  const resultsMock = [];
  const setResultsMock = vi.fn();
  const prevMock = "prevCursorToken";
  const setPrevMock = vi.fn();
  const nextMock = "nextCursorToken";
  const setNextMock = vi.fn();
  const paramsMock = {};
  const setParamsMock = vi.fn();

  const pagination = (
    <ResultsContext.Provider
      value={{ results: resultsMock, setResults: setResultsMock }}
    >
      <PaginationContext.Provider
        value={{ setPrev: setPrevMock, setNext: setNextMock }}
      >
        <RequestParamBuilderContext.Provider
          value={{ params: paramsMock, setParams: setParamsMock }}
        >
          <Pagination />
        </RequestParamBuilderContext.Provider>
      </PaginationContext.Provider>
    </ResultsContext.Provider>
  );

  const hostResponseMock = {
    links: {
      prev: "prevCursorToken",
      next: "nextCursorToken",
    },
  };

  const { container } = render(pagination)
  const nextBtn = container.querySelector('.NextBtn');
  const prevBtn = container.querySelector('.PrevBtn');
  it("Renders", () => {
    expect(nextBtn.textContent).toBe("Next");
    expect(prevBtn.textContent).toBe("Prev");
  });

  it("Next Button works", async () => {
    const { container } = render(pagination)
    await act(() => {
      SearchAPIService.search.mockResolvedValue(hostResponseMock);
      fireEvent.click(container.querySelector('.NextBtn'));
    });

    expect(SearchAPIService.search).toHaveBeenCalled();
    expect(setParamsMock).toHaveBeenCalled();
    expect(setPrevMock).toHaveBeenCalled();
    expect(setNextMock).toHaveBeenCalled();
    expect(setResultsMock).toHaveBeenCalled();
  });
  it("Prev Button works", async () => {
    const { container } = render(pagination)
    await act(() => {
      SearchAPIService.search.mockResolvedValue(hostResponseMock);
      fireEvent.click(container.querySelector('.PrevBtn'));
    });
    expect(SearchAPIService.search).toHaveBeenCalled();
    expect(setParamsMock).toHaveBeenCalled();
    expect(setPrevMock).toHaveBeenCalled();
    expect(setNextMock).toHaveBeenCalled();
    expect(setResultsMock).toHaveBeenCalled();
  });
});
