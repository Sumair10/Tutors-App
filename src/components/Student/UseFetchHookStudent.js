import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [student, setStudent] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch data");
          }
          return res.json();
        })
        .then((data) => {
          setStudent(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch abort");
          } else {
            setError(err.message);
            setIsPending(false);
          }
        });
    }, 1000);

    //abort error cleanup
    return () => abortCont.abort();
  }, [url]);
  return { student, isPending, error };
};

export default useFetch;
