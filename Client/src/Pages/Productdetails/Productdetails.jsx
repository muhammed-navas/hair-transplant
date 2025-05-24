import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './productPage.scss';
import { ContextApi } from '../../componets/Contextapi/Context';


export const ProductPage = () => {

  const { handleAddToCart,products, fetchProducts } = useContext(ContextApi);
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();

  const REACT_APP_API_DEFAULT = "https://trifolix-hair-transplant-3.onrender.com"


  useEffect(() => {
    const fetchData = async () => {
      if (!products.length) {
        await fetchProducts();
      }
      
      const product = products.find((item) => item._id === id);
      if (product) {
        setProductDetails(product);
      }
    };

    fetchData();
  }, [products, id, fetchProducts]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <div className="left-section">
        <div className="product-image">
          <img src={productDetails?.image} alt={productDetails?.name} />
        </div>
        <div className="product-info">
          <h1>{productDetails?.name}</h1>
          <p>{productDetails?.description}</p>
          <p className="product-price">${productDetails?.price}</p>
          <button onClick={()=>handleAddToCart(productDetails?._id)} className="add-to-cart-btn">Add To Your Cart</button>
        </div>
      </div>
      <div className="right-section">
        <p>
          {productDetails?.details}
        </p>
      </div>
    </div>
  );
};
