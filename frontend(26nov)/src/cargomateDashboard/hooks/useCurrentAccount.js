import { useEffect, useState } from "react";
import API from "../api/axios";

// Read the authenticated server-side identity, never a demo/sample name.
export default function useCurrentAccount() {
  const [account, setAccount] = useState(null);
  useEffect(() => {
    let active = true;
    API.get("/auth/me")
      .then(({data}) => { if (active) setAccount(data?.user || data?.data?.user || null); })
      .catch(() => { if (active) setAccount(null); });
    return () => {active = false;};
  }, []);
  return account;
}
