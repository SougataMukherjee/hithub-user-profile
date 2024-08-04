import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [val, setVal] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const Submit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`https://api.github.com/users/${val}`)
      .then((res) => res.json())
      .then((value) => {
        setData(value);
        setIsLoading(false);
        setVal("");
      })
      .catch(() => {
        setIsLoading(false); // Ensure loading state is reset even if there's an error
      });
  };
  console.log(data);
  return (
    <div className="App">
      <h1>GitHub User Profile</h1>
      <form onSubmit={Submit}>
        <input value={val} onChange={(e) => setVal(e.target.value)} />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Search"
          )}
        </button>
      </form>
      <hr />
      {data.avatar_url && <img src={data.avatar_url} alt="" height="60" />}
      <div>{data.login}</div>
      <div>{data.followers}</div>
      <a href={data.html_url} target="_blank">
        {data.html_url}
      </a>
    </div>
  );
}
