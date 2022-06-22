import "./App.css";

import { useState, useEffect } from "react";
import Card from "./Components/Card";

function App() {
  const [data, setData] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const url = "https://images-api.nasa.gov/search?q=moon";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Fetching failed");
        }
        const json = await res.json();
        setData(json.collection.items);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  // console.log(data && data.length && data[0].links[0].href);
  console.log(data);
  return (
    <div className="App">
      {loading && <h1>Loading...</h1>}
      <div className="card-list">
        {data &&
          data.length &&
          data
            .map((item) => {
              return item.links?.filter((link: { render: string }) => {
                return link.render === "image";
              });
            })
            .map((img) => {
              if (img === undefined) {
                return null;
              }
              return <Card src={img[0]?.href} />;
            })}
      </div>
    </div>
  );
}

export default App;
// data.map((item) =>
// item.links?.filter((img: { render: string; href: string }) => {
//   if (img.render === "image") {
//     console.log("FOUND");
//   }
//   return null;
// })
// )
