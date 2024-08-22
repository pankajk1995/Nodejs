const express = require("express");
let lastId = 0;
const fs = require("fs");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/product", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

// POST method to add a product
// app.post("/addproduct", (req, res) => {
//     fs.readFile("./db.json", "utf-8", (err, data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             const newdata = JSON.parse(data);
//             newdata.push({
//                 ...req.body,
//                 id: ++lastId // Increment the ID and assign it
//             });
//             fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send("Product added successfully");
//                 }
//             });
//         }
//     });
// });



app.post("/addproduct", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const newdata = JSON.parse(data);
            
            // Determine the last used ID or start from 1 if no products exist
            let lastId = newdata.length > 0 ? Math.max(...newdata.map(product => product.id)) : 0;
            
            // If the ID is provided and already exists, increment the ID
            let newId = req.body.id || lastId + 1;
            while (newdata.some(product => product.id === newId)) {
                newId++;
            }
            
            // Push the new product with the determined ID
            newdata.push({
                ...req.body,
                id: newId
            });

            fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Product added successfully");
                }
            });
        }
    });
});


// PATCH method to update a particular field
app.patch("/editproduct/:id", (req, res) => {
    const { id } = req.params;
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const productdata = JSON.parse(data);
            const index = productdata.findIndex((el) => el.id == id);
            if (index !== -1) {
                productdata[index] = { ...productdata[index], ...req.body };
                fs.writeFile("./db.json", JSON.stringify(productdata), (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Data edited successfully");
                    }
                });
            } else {
                res.send("Data not found");
            }
        }
    });
});

// DELETE method to delete a product by ID
app.delete("/deleteproduct/:id", (req, res) => {
    const { id } = req.params;
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let productdata = JSON.parse(data);
            const newdata = productdata.filter((el) => el.id != id);// its return aaray
            if (productdata.length !== newdata.length) {
                fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Product deleted successfully");
                    }
                });
            } else {
                res.send("Product not found");
            }
        }
    });
});


// Put method 

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const productdata = JSON.parse(data);
            const index = productdata.findIndex((el) => el.id == id);
            if (index !== -1) {
                productdata[index] = { ...id, ...req.body };
                fs.writeFile("./db.json", JSON.stringify(productdata), (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Data edited successfully");
                    }
                });
            } else {
                res.send("Data not found");
            }
        }
    });
});
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
