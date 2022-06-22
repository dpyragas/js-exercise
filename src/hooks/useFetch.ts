import { useState, useEffect } from "react";

export const useFetch = (searchTerm: string) => {
  const [data, setData] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `https://images-api.nasa.gov/search?q=${searchTerm}`;
    const controller = new AbortController();

    if (!searchTerm) {
      setData([]);
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        setLoading(false);
        setData(json.collection.items);
        setError(null);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.error("Fetch was aborted.");
        } else if (searchTerm === "") {
          setLoading(false);
          setError(null);
        } else {
          setLoading(false);
          setError("Could not fetch data.");
        }
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchTerm]);
  console.log(data);
  return { data, loading, error };
};
