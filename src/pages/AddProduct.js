import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormdata] = useState({
    name: "",
    rate: "",
  });
  const [dependency,setDependency] = useState(false)
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    await axios
      .post("/products/addProduct", formData)
      .then((resp) => {
        console.log(resp);
        setDependency(!dependency)
      })
      .catch((err) => {
        console.log(err);
      });
    
  };
  const handleRemove = async (productId) => {
   
    await axios
      .delete(`/products/deleteProduct/${productId}`)
      .then((resp) => {
        console.log(resp);
        setDependency(!dependency)
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/products/allProducts");
      setProducts(res.data);
    };
    fetchProducts();
  }, [dependency]);

  return (
    <MainLayout>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-5">
          <h3>Add Product</h3>
            Name
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
            />
            Rate
            <input
              type="number"
              name="rate"
              onChange={handleChange}
              className="form-control"
            />
            <br />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
          <div className="col-sm-5">
            <h3>Products List</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>SL.</th>
                  <th>Name</th>
                  <th>Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.rate} </td>
                    <td>
                      <input
                        type="button"
                        className="btn btn-danger btn-sm"
                        value="Remove"
                        onClick={()=>handleRemove(product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default AddProduct;
