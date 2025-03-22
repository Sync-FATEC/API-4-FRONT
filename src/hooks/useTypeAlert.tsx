// import { useState, useEffect } from "react";
// import api from "../api/api";

// export const useListTypeAlert = () => {
//     const [typeAlertList, setTypeAlertList] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await api.get(API_URL);
//                 setTypeAlertList(response.data);
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     return { typeAlertList, loading, error };
// };

// export const useReadTypeAlert = () => {
//     const [typeAlert, setTypeAlert] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const fetchData = async (id: string) => {
//         setLoading(true);
//         try {
//             const response = await api.get();
//             setTypeAlert(response.data);
//         } catch (err) {
//             setError(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { typeAlert, loading, error, fetchData };
// };

// export const useCreateTypeAlert = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const create = async (newData: any) => {
//         setLoading(true);
//         try {
//             const response = await api.post();
//             return response.data;
//         } catch (err) {
//             setError(err);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { create, loading, error };
// };

// export const useUpdateTypeAlert = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const update = async (id: string, updatedData: any) => {
//         setLoading(true);
//         try {
//             const response = await api.put();
//             return response.data;
//         } catch (err) {
//             setError(err);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { update, loading, error };
// };

// export const useDeleteTypeAlert = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const remove = async (id: string) => {
//         setLoading(true);
//         try {
//             await api.delete();
//         } catch (err) {
//             setError(err);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { remove, loading, error };
// };
