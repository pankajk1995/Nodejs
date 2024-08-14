import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Product() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingProductId, setEditingProductId] = useState(null);
    const [newPrice, setNewPrice] = useState('');
// Get Data
    const fetchProducts = () => {
        axios.get("http://localhost:8080/product")
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
                setLoading(false);
            });
    };
// Edit Price
    const handleEdit = (id, currentPrice) => {
        setEditingProductId(id);
        setNewPrice(currentPrice);
    };

    const handlePriceChange = (e) => {
        setNewPrice(e.target.value);
    };

    const handleUpdate = () => {
        axios.patch(`http://localhost:8080/editproduct/${editingProductId}`, { price: newPrice })
            .then((res) => {
                alert("Price updated successfully.");
                console.log(res);
                // Update the local state with the new price
                setData(data.map(product => 
                    product.id === editingProductId ? { ...product, price: newPrice } : product
                ));
                setEditingProductId(null);
                setNewPrice('');
            })
            .catch((err) => {
                console.log(err);
                alert("Something went wrong while updating the price.");
            });
    };
//Delete Data
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://localhost:8080/deleteproduct/${id}`)
                .then((res) => {
                    alert("Product deleted successfully.");
                    console.log(res);
                    // Update the local state by filtering out the deleted product
                    setData(data.filter(product => product.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                    alert("Something went wrong while deleting the product.");
                });
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "4px",
        }}>
            {data.map((el) => (
                <div key={el.id}>
                    <img src={el.image} alt={el.title} width={200} height={200} />
                    <h3>{el.title}</h3>
                    <h3>Price: $ {el.price}</h3>
                    <p>{el.description}</p>
                    <h4>{el.category}</h4>
                    {editingProductId === el.id ? (
                        <div>
                            <input 
                                type="number" 
                                value={newPrice} 
                                onChange={handlePriceChange} 
                                placeholder="Enter new price" 
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingProductId(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => handleEdit(el.id, el.price)}>Edit Price</button>
                            <button onClick={() => handleDelete(el.id)} style={{ marginLeft: '10px' }}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Product;
