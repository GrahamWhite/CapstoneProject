import {useState, useEffect} from 'react';

/*
  Original code provided by James King on Upmostly
  https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks

  input: fun <function>, milliseconds <number>, condition <Boolean>
  output: void
*/
export const useInterval = (fun, milliseconds=1000, condition=true) => {
  useEffect(() => {
    const interval = setInterval(() => {
      fun();
    }, milliseconds);
    return () => clearInterval(interval);
  }, [condition]);
};

/* 
  original code provided by benawad on Github
  https://github.com/benawad/react-hooks-examples/blob/2_api_useEffect/src/App.js

  input:  url <String>
  output: data <Object>, loading <Boolean> 
*/
export const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    const [item] = data.results;
    setData(item);
    setLoading(false);
  }, []);

  return { data, loading };
};