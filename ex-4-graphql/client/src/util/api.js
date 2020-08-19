export const baseUrl = 'http://localhost:3301';
export const graphQLUrl = `${baseUrl}/graphql`;
export const imageUrl = `${baseUrl}/image-upload`;

export const graphQLFetch = (query, token) => 
  fetch(graphQLUrl, {
    body: JSON.stringify(query), 
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }, 
    method: 'POST'
  });
