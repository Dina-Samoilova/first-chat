export const request = (url: string, method?: RequestInit | undefined) => {
  return fetch(url, method)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      return response.json();
    });
};
