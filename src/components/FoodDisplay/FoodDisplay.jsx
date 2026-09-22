import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { BASE_URL } from "../../api/Axios"; 
import PropTypes from 'prop-types';

const FoodDisplay = ({category, searchText}) => {

    const {foodList} = useContext(StoreContext);

    const filteredFoods = foodList.filter(food => (
        (category === 'All' || food.category === category) &&
        food.name.toLowerCase().includes(searchText.toLowerCase())
    ));
    

  return (
    <div className="container">
        <div className="row">
            {filteredFoods.length > 0 ? (
                filteredFoods.map((food, index) => (
                    <FoodItem 
                        key={index} 
                        name={food.name} 
                        description={food.description}
                        id={food.id}
                        imageUrl={`${BASE_URL}${food.imageUrl}`}
                        price={food.price} 
                    />
                ))
            ) : (
                <div className="text-center mt-4">
                    <h4>No food found.</h4>
                </div>
            )}
        </div>
    </div>
  )
}
FoodDisplay.propTypes = {
  category: PropTypes.string,
  searchText: PropTypes.string,
};

export default FoodDisplay;