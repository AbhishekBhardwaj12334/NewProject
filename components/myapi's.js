import axios from "axios";
export const myAxionGetRequest = async () => {
  const res = await axios ({
    method: 'GET',
    url:'https://cilioapimgmt.azure-api.net/mobile/profile/user/2/profile',
  })
  headers = {
    'Ocp-Apim-Subscription-Key':'8861dd1b63444e7c8ee5c647c1528149',
    'Content-Type': 'application/json'
  }
  return res;
  
}

// export const myFetchAPIRequest = async() => {
//   const response = await fetch ('https://jsonplaceholder.typicode.com/posts');
//   const resJson = await response.json();
//   return resJson;
// }
// //Putting a pre existing key into an API
// // export const myFetchPostRequest = async() => {
// //   const response = await fetch ('https://jsonplaceholder.typicode.com/posts?_limit=10' ,{
// //     method: 'POST',
// //     body: JSON.stringify({
// //       title:'foo',
// //       body:'bar',
// //       userId:1,
// //     }),
// //     headers: {
// //       'Content-type': 'application/json; charset=UTF-8',
// //     },
// //   });
// //   const resJson = await response.json();
// //   return resJson;
// // }
// export const myFetchPostRequest = async(data) => {
//   const response = await fetch ('https://jsonplaceholder.typicode.com/posts?_limit=10' ,{
//     method: 'POST',
//     body: JSON.stringify(data),//Getting a user entered data into an API
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   });
//   const resJson = await response.json();
//   return resJson;
// }

// export const myFetchPutRequest = async(id , data) => {
//   const response = await fetch ('https://jsonplaceholder.typicode.com/posts/' + id ,{
//     method: 'PUT',
//     body: JSON.stringify(data),//Getting a user entered data int0 an API
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   });
//   const resJson = await response.json();
//   return resJson;
// }
// export const myFetchPatchRequest = async(id , data) => {
//   const response = await fetch ('https://jsonplaceholder.typicode.com/posts/' + id ,{
//     method: 'PATCH',
//     body: JSON.stringify(data),//Getting a user entered data into an API
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   });
//   const resJson = await response.json();
//   return resJson;
// }