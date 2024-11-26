import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const IngredientList = forwardRef((props, ref) => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchIngredients = async () => {
        try {
        const response = await fetch("http://localhost:5000/ingredients");
        if (!response.ok) {
            throw new Error("Failed to fetch ingredients");
        }
        const data = await response.json();
        setIngredients(data);
        } catch (error) {
        console.error("Error fetching ingredients:", error);
        } finally {
        setLoading(false);
        }
    };


  useImperativeHandle(ref, () => ({
    fetchIngredients,
}));

useEffect(() => {
    fetchIngredients(); // Initial fetch
}, []);

  if (loading) {
    return <p>Loading ingredients...</p>;
  }

  return (
    <div>
      <h2>Ingredients List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Measurement</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.ingredient}>
              <td>{ingredient.ingredient}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.measurement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default IngredientList;