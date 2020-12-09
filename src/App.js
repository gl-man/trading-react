import React, { useCallback, useState } from "react";

import api from "services/api";
import { SymbolSearchBox, SearchAppBar, Profile } from "components";

export default function App() {
  const [profile, setProfile] = useState(null);

  const handleSelect = useCallback((symbol) => {
    api
      .get(`/profile/${symbol}`)
      .then((data) => {
        if (!data || !Array.isArray(data) || !data.length) {
          throw Error(
            "No Data or Invalid data: " + JSON.stringify(data, 2, null)
          );
        }
        setProfile(data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <React.Fragment>
      <SearchAppBar>
        <SymbolSearchBox label="Search" onSelect={handleSelect} />
      </SearchAppBar>
      <Profile data={profile} />
    </React.Fragment>
  );
}
