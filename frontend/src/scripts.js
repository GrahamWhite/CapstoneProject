export function GetJSON(url) {
  return fetch(url)
    .then(response => {
      return response.json().then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
    });
}