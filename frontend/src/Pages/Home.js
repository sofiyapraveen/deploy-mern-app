// import React, { useEffect, useState } from 'react'
// import { Navigate, useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import {ToastContainer} from 'react-toastify';

// const Home = () => {
//     const [loggedInUser,setLoggedInUser]=useState('');
//     const Navigate=useNavigate();
//     useEffect(()=>{
//         setLoggedInUser(localStorage.getItem('loggedInUser'))
//     },[])

//     const handleLogout = (e)=>{
//         localStorage.removeItem('token');
//         localStorage.removeItem('loggedInUser');
//         handleSuccess('User Loggedout');
//         setTimeout(()=>{
//             Navigate('/login');
//         }, 1000)

//     }

//     const fetchProducts=async()=>{
//         try{
//             const url="http://localhost:8080/products";
//             const headers={
//                 headers:{
//                 'Authorization': localStorage.getItem('token')
//             }
//         }
//             const response=await fetch(url,);
//             const result=await response.json();
//             console.log(result);

//         } catch(err){
//             handleError(err);
//         }
//     }

//     useEffect(()=>{
//         fetchProducts()
//     },[])
//   return (
//     <div>
//       <h1>{loggedInUser}</h1>
//       <button onClick={handleLogout}>Logout</button>

//       <ToastContainer />
//     </div>
//   )
// }

// export default Home;


import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]); // product data ke liye state
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
 // yaha token bhejna hai
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();
      console.log("Products:", result);
      setProducts(result); // state me set
    } catch (err) {
      handleError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
<div>
      <h2>Products List:</h2>
      <ul>
        {products.length > 0 ? (
          products.map((item, index) => (
            <li key={index}>{item.name} - {item.price}</li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
</div>
      <ToastContainer />
    </div>
  );
};

export default Home;
