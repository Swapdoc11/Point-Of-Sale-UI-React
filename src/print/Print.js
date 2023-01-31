import React from "react";
export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmt } = props;
  return (
    <div ref={ref}><br />
    <br />
    <br />
      <div className="container">
        <div style={{ textAlign: "center", padding:'20px'}}>
          <h2>Jadhav Readymade</h2>
          <h5>Wadi Kh. Nandura Road, Jalgaon Jamod, Dist Buldhana, 443402</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>SL.</th>
                <th>Product Name</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Total Amt</th>
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
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total Amount Rs. {totalAmt} </h4>
          <br />
          <br />
          <br />
          <br />
          <h6>
            
            <i>**** Thank You For Visiting ****</i>
          </h6>
        </div>
      </div>
    </div>
  );
});
