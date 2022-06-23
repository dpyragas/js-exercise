import { useState } from "react";
import "./App.css";

import Card from "./Components/Card";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useFetch(searchTerm);

  const imageGallery =
    data &&
    data.length > 0 &&
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
      });
  return (
    <div className="App">
      <h1>NASA Image search</h1>
      <div>
        <label style={{ paddingRight: "1rem" }}>
          Search for image:
          <input
            data-testid="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      <button
        disabled={!searchTerm ? true : false}
        style={{ marginTop: "1rem" }}
        id="reset-search-button"
        onClick={() => setSearchTerm("")}
      >
        Reset Search
      </button>

      <h3 data-testid="found-images-number">
        Found {imageGallery ? imageGallery.length : "0"} images.
      </h3>
      {loading && <h1>Loading...</h1>}
      {error && <h2>ERROR: {error}</h2>}
      <div className="card-list">{imageGallery}</div>
    </div>
  );
}

export default App;
