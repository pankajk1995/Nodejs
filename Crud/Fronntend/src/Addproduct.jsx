import React, { useState } from 'react'
import axios from "axios"

const initialstate={
    image:"",
    category:"",
    description:"",
    price:"",
    title:""
}
const Addproduct = () => {
    const [formdata,setformdata]=useState(initialstate)
    const {image,category,description,price,title}=formdata

    const handlechange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()

        axios.post("http://localhost:8080/addproduct",formdata).then(
            (res)=>{
                console.log(res)
                alert("data added succes")
            }
        ).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input  type="text" name='image' value={image} onChange={(e)=>handlechange(e)} placeholder='image'/><br/>
        <input type="text" name='title' value={title}  onChange={(e)=>handlechange(e)}  placeholder='title'/><br/>
        <select name="category" id="" value={category}  onChange={(e)=>handlechange(e)} placeholder='title' ><br/>
            <option value={""}>select your category</option><br/><br/>
            <option value={"Women"}>Women</option><br/>
            <option value={"Jewwlalry"}>Jewwlalry</option>
            <option value={"Electronics"}>Electronics</option>
            <option value={"Men"}>Men</option>
        </select><br/>
        <input type="text" name='price' value={price}  onChange={(e)=>handlechange(e)}  placeholder='price'/><br/>
        <input type="text" name='description' value={description}   onChange={(e)=>handlechange(e)}  placeholder='description'/><br/><br/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default Addproduct
