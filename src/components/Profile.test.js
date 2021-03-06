import React from "react";
import { render, cleanup } from "@testing-library/react";

import Profile from "components/Profile";

describe("Component: Profile", () => {
  afterEach(cleanup);

  it("check if component initialized", () => {
    const { container, getByText } = render(<Profile data={mockData} />);
    const component = container.firstChild;
    const changesComponent = getByText(
      new RegExp(mockData.changes.toString(), "i")
    );

    expect(component).toBeTruthy();
    expect(component).toBeInTheDocument();
    expect(changesComponent).toBeTruthy();
    expect(changesComponent).toBeInTheDocument();
  });

  it("check if 'changes' color is red when 'changes' is negative", async () => {
    mockData.changes = -123456789.01;
    const { getByText } = render(<Profile data={mockData} />);
    const changesComponent = getByText("(-123456789.01)");

    expect(changesComponent).toBeInTheDocument();
    expect(changesComponent).toHaveStyle(`color: ${red}`);
  });

  it("check if 'changes' color is green when 'changes' is positive", async () => {
    mockData.changes = 123456789.01;
    const { getByText } = render(<Profile data={mockData} />);
    const changesComponent = getByText("(+123456789.01)");

    expect(changesComponent).toBeInTheDocument();
    expect(changesComponent).toHaveStyle(`color: ${green}`);
  });

  it("check if 'price' is formatted", async () => {
    mockData.price = 99999999.01;
    const { getByText } = render(<Profile data={mockData} />);
    const priceComponent = getByText("$99,999,999.01");

    expect(priceComponent).toBeInTheDocument();
  });
});

const red = "#dc004e";
const green = "#4caf50";
const mockData = {
  symbol: "AAPL",
  price: 121.78,
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
