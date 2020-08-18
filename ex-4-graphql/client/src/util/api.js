export const baseUrl = 'http://localhost:3301/graphql';
export const graphQLFetch = (query, token) => 
  fetch(baseUrl, {
    body: JSON.stringify(query), 
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }, 
    method: 'POST'
  });
  