import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const IngredientList = forwardRef((props, ref) => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ingredients
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

  // Delete ingredient
  const deleteIngredient = async (ingredientName) => {
    try {
      const response = await fetch(`http://localhost:5000/ingredients/${ingredientName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIngredients((prevIngredients) =>
          prevIngredients.filter((item) => item.ingredient !== ingredientName)
        );
        console.log(`Deleted ingredient: ${ingredientName}`);
      } else {
        console.error("Failed to delete ingredient");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Expose fetchIngredients to parent component
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.ingredient}>
              <td>{ingredient.ingredient}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.measurement}</td>
              <td>
                <button
                  onClick={() => deleteIngredient(ingredient.ingredient)}
                  style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default IngredientList;
