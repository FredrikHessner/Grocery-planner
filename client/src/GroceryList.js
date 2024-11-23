import React, { useState } from 'react';

const GroceryList = () => {
    const [grocery, setGrocery] = useState('');
    const [quantity, setQuantity] = useState('');
    const [measurement, setMeasurement] = useState('');
    const [groceries, setGroceries] = useState([]);

    // Add item with quantity and measurement to the list
    const addGrocery = () => {
        if (
            grocery.trim() !== '' &&
            quantity.trim() !== '' &&
            measurement.trim() !== '' &&
            !isNaN(quantity)
        ) {
            setGroceries([
                ...groceries,
                { name: grocery.trim(), quantity: parseInt(quantity, 10), measurement: measurement.trim() },
            ]);
            setGrocery('');
            setQuantity('');
            setMeasurement('');
        }
    };

    // Remove item from the list
    const removeGrocery = (index) => {
        setGroceries(groceries.filter((_, i) => i !== index));
    };

    return (
        <div style={styles.container}>
            <h1>Grocery List</h1>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={grocery}
                    onChange={(e) => setGrocery(e.target.value)}
                    placeholder="Enter grocery item"
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
                <button onClick={addGrocery} style={styles.addButton}>
                    Add
                </button>
            </div>
            <ul style={styles.list}>
                {groceries.map((item, index) => (
                    <li key={index} style={styles.listItem}>
                        <span>
                            {item.name} - {item.quantity} {item.measurement}
                        </span>
                        <button onClick={() => removeGrocery(index)} style={styles.removeButton}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
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