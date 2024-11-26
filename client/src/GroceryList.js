import React, { useState , useEffect, useRef } from 'react';
import IngredientList from "./IngredientList";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const GroceryList = () => {
    const [ingredient, setIngredient] = useState('');
    const [quantity, setQuantity] = useState('');
    const [measurement, setMeasurement] = useState('');
    const [groceries, setGroceries] = useState([]);

    // Add item with quantity and measurement to the list

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Prepare the data
        const newIngredient = {
          ingredient,
          quantity: parseInt(quantity), // Ensure quantity is a number
          measurement,
        };
    
        try {
          // Send POST request to the server
          const response = await fetch("http://localhost:5000/add-ingredient", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newIngredient),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Ingredient added:", data);
            // Clear form fields
            setIngredient("");
            setQuantity("");
            setMeasurement("");
          } else {
            console.error("Failed to add ingredient");
            alert("Error adding ingredient. Please try again.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

    // Remove item from the list
    const removeGrocery = (index) => {
        setGroceries(groceries.filter((_, i) => i !== index));
    };

    const ingredientListRef = useRef(null);

    // Refresh the ingredient list every 0.25 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (ingredientListRef.current) {
                ingredientListRef.current.fetchIngredients();
            }
        }, 250);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);    

    return (
        <div style={styles.container}>
            <h1>Grocery List</h1>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    placeholder="Enter ingredient item"
                    style={styles.input}
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                    style={styles.quantityInput}
                />
                <input
                    type="text"
                    value={measurement}
                    onChange={(e) => setMeasurement(e.target.value)}
                    placeholder="Measurement (e.g., kg, lbs)"
                    style={styles.measurementInput}
                />
            </div>
            <Router>
                <div style={styles.inputContainer}>
                    <nav>
                        <button onClick={handleSubmit} style={styles.addButton}>
                            Add
                        </button>
                        <Link to="/ingredients"> View</Link>
                    </nav>

                    <Routes>
                    <Route path="/ingredients" element={<IngredientList ref={ingredientListRef} />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
    },
    inputContainer: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
    },
    input: {
        padding: '10px',
        width: '35%',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    quantityInput: {
        padding: '10px',
        width: '15%',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    measurementInput: {
        padding: '10px',
        width: '20%',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    addButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
    },
    listItem: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    removeButton: {
        padding: '5px 10px',
        fontSize: '14px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default GroceryList;