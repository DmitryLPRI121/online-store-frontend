// import axios from 'axios';
// import { store } from '../../ReduxStore/store';

// // const apiUrl = process.env.REACT_APP_API_URL;

// const ProductService = {
//     getLatestProducts: async () => {
//         let result: any[] = [];
//         const headers = {
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': '69420'
//         };
//         await axios.get(`https://674f-85-143-92-50.ngrok-free.app/Products/Latest`, {headers, timeout: 5000})
//             .then((res) => {
//                 if (res.data) {
//                     result = res.data || [];
//                     console.log(result);
//                 }
//                 // console.log(res)
//                 // console.log(res.data)
//                 // console.log(res.data.accessToken)
//             }).catch(error => {
//                 console.log(error)
//             }).finally( () => {
//                 // store.dispatch({
//                 //     type: 'DATA_LOADING_STATE',
//                 //     payload: false
//                 // })
//             });     
//         return result;
//     },
//     getProducts: async (page: number = 1) => {
//         let result: any[] = [];
//         const headers = {
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': '69420'
//         };
//         await axios.get(`https://674f-85-143-92-50.ngrok-free.app/Products?page=${page}`, {headers, timeout: 5000})
//             .then((res) => {
//                 if (res.data) {
//                     result = res.data.data || [];
//                     // console.log(result);
//                 }
//                 // console.log(res)
//                 // console.log(res.data)
//                 // console.log(res.data.accessToken)
//             }).catch(error => {
//                 console.log(error)
//             }).finally( () => {
//                 // store.dispatch({
//                 //     type: 'DATA_LOADING_STATE',
//                 //     payload: false
//                 // })
//             });     
//         return result;
//     },
//     getProductsByCategory: async (id: number | undefined) => {
//         let result: any[] = [];
//         const headers = {
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': '69420'
//         };
//         await axios.get(`https://674f-85-143-92-50.ngrok-free.app/Products/byCategory?categoryId=${id}`, {headers, timeout: 5000})
//             .then((res) => {
//                 if (res.data) {
//                     result = res.data.data || [];
//                     console.log(result);
//                 }
//                 // console.log(result);
//                 // console.log(res.data)
//                 // console.log(res.data.accessToken)
//             }).catch(error => {
//                 console.log(error)
//             }).finally( () => {
//                 // store.dispatch({
//                 //     type: 'DATA_LOADING_STATE',
//                 //     payload: false
//                 // })
//             });     
//         return result;
//     },
//     getProductById: async (id: number | undefined) => {
//         let result: any[] = [];
//         const headers = {
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': '69420'
//         };
//         await axios.get(`https://674f-85-143-92-50.ngrok-free.app/Products/${id}`, {headers, timeout: 5000})
//             .then((res) => {
//                 if (res.data) {
//                     result = res.data || [];
//                     console.log(result);
//                 }
//                 // console.log(result);
//                 // console.log(res.data)
//                 // console.log(res.data.accessToken)
//             }).catch(error => {
//                 console.log(error)
//             }).finally( () => {
//                 // store.dispatch({
//                 //     type: 'DATA_LOADING_STATE',
//                 //     payload: false
//                 // })
//             });     
//         return result;
//     }
// }

export {};