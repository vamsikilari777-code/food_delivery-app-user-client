import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/foodService";
import {
  addToCart,
  getCartData,
  removeQtyFromCart,
} from "../service/cartService";
import PropTypes from "prop-types";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({children}) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");

  const increaseQty = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
    await addToCart(foodId, token);
  };

  const decreaseQty = async (foodId) => {
    setQuantities((prev) => ({...prev,[foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
    }));
    await removeQtyFromCart(foodId, token);
  };

  const removeFromCart = (foodId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantitites = { ...prevQuantities };
      delete updatedQuantitites[foodId];
      return updatedQuantitites;
    });
  };

const loadCartData = async (token) => {
  try {
    const items = await getCartData(token);
    setQuantities(items || {});   
  } catch (err) {
    console.error(err);
    setQuantities({});            
  }
};

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
  };

  useEffect(() => {
  async function loadData() {
    const data = await fetchFoodList();
    setFoodList(data);

    const savedToken = localStorage.getItem("token");

   if (savedToken && savedToken !== "null") {
      setToken(savedToken);
      await loadCartData(savedToken);
    }
  }
  loadData();
}, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
