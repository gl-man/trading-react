import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";

import api from "services/api";
import App from "App.js";

jest.mock("services/api");

describe("Component: App", () => {
  afterEach(cleanup);

  it("check if component initialized", () => {
    const { container, getByTestId } = render(<App />);
    const component = container.firstChild;
    const inputComponent = getByTestId("search-box-input");

    expect(component).toBeTruthy();
    expect(component).toBeInTheDocument();
    expect(inputComponent).toBeTruthy();
  });

  it("check company profile displayed if the suggestion item clicked", async () => {
    const value = "AA";
    const { getByTestId, getByText } = render(<App />);
    const inputComponent = getByTestId("search-box-input");

    api.get.mockResolvedValueOnce(Promise.resolve(mockListData));
    fireEvent.input(inputComponent, { target: { value } });
    fireEvent.change(inputComponent, { target: { value } });
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    const suggestionMenu = getByTestId("search-box-menu");
    expect(suggestionMenu).toBeTruthy();
    expect(suggestionMenu).toBeInTheDocument();
    expect(suggestionMenu.childNodes.length).toBe(mockListData.length);

    api.get.mockResolvedValueOnce(Promise.resolve([mockProfileData]));
    fireEvent.click(suggestionMenu.firstChild);
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2));

    expect(getByText(mockProfileData.companyName)).toBeInTheDocument();
    expect(getByText(mockProfileData.description)).toBeInTheDocument();
    expect(getByText(mockProfileData.ceo)).toBeInTheDocument();
    expect(getByText(mockProfileData.industry)).toBeInTheDocument();
    expect(getByText(mockProfileData.website)).toBeInTheDocument();
  });
});

const mockListData = [
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

const mockProfileData = {
  symbol: "AAPL",
  price: 9999999.1,
  beta: 1.33758,
  volAvg: 128292167,
  mktCap: 2070479110000,
  lastDiv: 1.4224999999999999,
  range: "53.1525-137.98",
  changes: -2.6,
  companyName: "Apple Inc",
  currency: "USD",
  cik: "0000320193",
  isin: "US0378331005",
  cusip: "037833100",
  exchange: "Nasdaq Global Select",
  exchangeShortName: "NASDAQ",
  industry: "Consumer Electronics",
  website: "https://www.apple.com/",
  description:
    "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, HomePod, iPod touch, and other Apple-branded and third-party accessories. It also provides AppleCare support services; cloud services store services; and operates various platforms, including the App Store, that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. In addition, the company offers various services, such as Apple Arcade, a game subscription service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It sells and delivers third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was founded in 1977 and is headquartered in Cupertino, California.",
  ceo: "Mr. Timothy Cook",
  sector: "Technology",
  country: "US",
  fullTimeEmployees: "147000",
  phone: "14089961010",
  address: "1 Apple Park Way",
  city: "Cupertino",
  state: "CALIFORNIA",
  zip: "95014",
  dcfDiff: 89.92,
  dcf: 127.377,
  image: "https://financialmodelingprep.com/image-stock/AAPL.png",
  ipoDate: "1980-12-12",
  defaultImage: false,
};
