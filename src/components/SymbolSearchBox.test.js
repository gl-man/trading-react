import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";

import api from "services/api";
import SymbolSearchBox from "components/SymbolSearchBox";

jest.mock("services/api");

describe("Component: SymbolSearchBox", () => {
  afterEach(cleanup);

  it("check if component initialized", () => {
    const { container, getByTestId } = render(<SymbolSearchBox />);
    const component = container.firstChild;
    const inputComponent = getByTestId("search-box-input");

    expect(component).toBeTruthy();
    expect(component).toBeInTheDocument();
    expect(inputComponent).toBeTruthy();
  });

  it("check if suggestion displayed when the input value changed", async () => {
    const value = "AA";
    const { getByTestId } = render(<SymbolSearchBox />);
    const inputComponent = getByTestId("search-box-input");

    api.get.mockResolvedValueOnce(Promise.resolve(mockData));
    fireEvent.input(inputComponent, { target: { value } });
    fireEvent.change(inputComponent, { target: { value } });
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    const suggestionMenu = getByTestId("search-box-menu");
    expect(suggestionMenu).toBeTruthy();
    expect(suggestionMenu).toBeInTheDocument();
    expect(suggestionMenu.childNodes.length).toBe(mockData.length);
  });

  it("check if 'onSelect' is called when the item clicked", async () => {
    const value = "AA";
    const onSelect = jest.fn();
    const { getByTestId } = render(<SymbolSearchBox onSelect={onSelect} />);
    const inputComponent = getByTestId("search-box-input");

    api.get.mockResolvedValueOnce(Promise.resolve(mockData));
    fireEvent.input(inputComponent, { target: { value } });
    fireEvent.change(inputComponent, { target: { value } });
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    const suggestionMenu = getByTestId("search-box-menu");
    expect(suggestionMenu).toBeTruthy();
    expect(suggestionMenu).toBeInTheDocument();
    expect(suggestionMenu.childNodes.length).toBe(mockData.length);
    expect(onSelect).toHaveBeenCalledTimes(0);

    fireEvent.click(suggestionMenu.firstChild);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

const mockData = [
  {
    symbol: "SPY",
    name: "SPDR S&P 500",
    price: 366.77,
    exchange: "NYSE Arca",
  },
  {
    symbol: "CMCSA",
    name: "Comcast Corp",
    price: 51.26,
    exchange: "Nasdaq Global Select",
  },
];
