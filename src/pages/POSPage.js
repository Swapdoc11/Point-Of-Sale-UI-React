import axios from "axios";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import MainLayout from "../layout/MainLayout";
import { ComponentToPrint } from "../print/Print";

const POSPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [grossTotal, setGrossTotal] = useState(0);
  const handleAdd = async (product) => {
    //console.log(product);
    let isProductFound = await cart.find((cartProduct) => {
      return cartProduct._id === product._id;
    });
    //console.log(isProductFound);
    if (isProductFound) {
      let newCart = [];
      let newItem;
      cart.forEach((cartItems) => {
        if (cartItems._id === product._id) {
          newItem = {
            ...cartItems,
            qty: cartItems.qty + 1,
            totalAmt: cartItems.rate * (cartItems.qty + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItems);
        }
      });
      setCart(newCart);
    } else {
      let addingProduct = {
        ...product,
        qty: 1,
        totalAmt: product.rate,
      };
      setCart([...cart, addingProduct]);
    }

    toast(`${product.name} added Successfully`);
    setGrossTotal(grossTotal + product.rate);
  };
  const handleRemove = async (product) => {
    const cartProduct = cart.find(
      (itemTotalamt) => itemTotalamt._id === product._id
    );

    const newCart = cart.filter((cartItem) => cartItem._id !== product._id);
    setCart(newCart);
    setGrossTotal(grossTotal - cartProduct.totalAmt);
    toast(`${product.name} removed Successfully`);
  };
  const fetchProducts = async () => {
    const result = await axios.get("/products/allProducts");
    console.log(result.data);
    setProducts(result.data);
  };
  const componentRef = useRef();
  const handlePrintHook = useReactToPrint({
    content:()=>componentRef.current
  })
  const handlePrint = () =>{
    handlePrintHook()
    
  }
  useState(() => {
    fetchProducts();
  }, []);
  return (
    <MainLayout>
      <>
        <div className="row">
          <div className="col-lg-6">
            <h2>All Products</h2>
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
                    <td>{product.name} </td>
                    <td>{product.rate}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleAdd(product)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-sm-5">
            <div style={{display:'none'}}>

          <ComponentToPrint cart={cart} totalAmt={grossTotal} ref={componentRef} />
            </div>
            <h2>Cart</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>SL.</th>
                  <th>Product Name</th>
                  <th>Rate</th>
                  <th>Qty</th>
                  <th>Total Amt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1} </td>
                    <td>{item.name} </td>
                    <td>{item.rate} </td>
                    <td>{item.qty} </td>
                    <td>{item.totalAmt} </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>Total Rs. {grossTotal}</h4>
            {grossTotal !== 0 ? (
              <div>
                <button className="btn btn-primary" onClick={()=>handlePrint()}>Print Recept</button>
              </div>
            ) : (
              <div>
                <h4>Please add Product in Cart</h4>
              </div>
            )}
          </div>
        </div>
      </>
    </MainLayout>
  );
};

export default POSPage;
