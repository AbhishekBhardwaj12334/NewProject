// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../components/redux/userDataSlice'

// const UserDataFetcher = ({ userId, onDataFetched }) => {
//   const [loading, setLoading] = useState(true);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const apiUrl = `https://cilioapimgmt.azure-api.net/mobile/profile/user/${userId}/profile`;
//       const subscriptionKey = "8861dd1b63444e7c8ee5c647c1528149";

//       try {
//         const response = await axios.get(apiUrl, {
//           headers: {
//             'Ocp-Apim-Subscription-Key': subscriptionKey,
//             'Content-Type': 'application/json'
//           },
//         });

//         if (response.status === 200) {
//           setUserData(response.data);
//           onDataFetched(response.data);
//         } else {
//           console.log('Error Fetching Data. Status Code:', response.status);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);

//         // Log the full error details
//         console.error('Error details:', error.message, error.response);

//         // Set userData to a default value or handle errors as needed
//         setUserData({});
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId, onDataFetched]);

//   return { userData, loading };
// };

// export default UserDataFetcher;
