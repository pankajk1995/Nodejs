import axios from 'axios';
import React, { useState } from 'react';

function Editproduct() {
    const [showForm, setShowForm] = useState(false);
    const [Updateprice, setUpdateprice] = useState('');

    const handleUpdate = () => {
        setShowForm(true);
    };

    const HandleSubmit = (e) => {
        e.preventDefault();

        const updateData = {
            price: Updateprice,
        };
        console.log(updateData);

        axios.patch('http://localhost:8080/editproduct/:id',
            { 
                edited_field: "price", // Changed from "email" to "price"
                price: Updateprice // Send the price in the payload
            },
          
        )
        .then((response) => {
            console.log("Response:", response.data);
            alert("Product updated successfully!");
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        setShowForm(false);
    };

    return (
        <div>
            <div className='cart2'>
               
                <h2>{Updateprice}</h2>
            </div>

            <button style={{ marginLeft: '40px' }} onClick={handleUpdate}>Update</button>
            {showForm && (
                <div className='form'>
                    <h1>Update Product Data</h1>
                    <form onSubmit={HandleSubmit}>
                        <input 
                            type="text" 
                            className='formInput' 
                            onChange={(e) => setUpdateprice(e.target.value)} 
                            value={Updateprice} 
                            placeholder='Enter price' 
                        />
                        <button type='submit'>Update</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Editproduct;
