import React from "react";

import RouterContext from "./RouterContext";
import HistoryContext from "./HistoryContext";

const useContext = React.useContext;

export function useHistory() {
  return useContext(HistoryContext);
}

export function useLocation() {
  return useContext(RouterContext).location;
}

export function useParams() {
  const match = useContext(RouterContext).match;
  return match ? match.params : {};
}
