import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/Payment.css"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Payment = () => {
  const [data, setData] = useState([]);

  useState(() => {
    axios
      .get("http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/orders/payment")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  });

  return (
    <div>
              <div className="mb-3">
            <label htmlFor="sort">Sort By:</label>
            <select
              id="sort"
              className="form-control"
            >
              <option value="orderDate">Order Date</option>
              <option value="orderId">Order ID</option>
            </select>
          </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Order Date</th>
            <th scope="col">Total Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.orderDate}</td>
              <td>Rp {e.totalPrice}</td>
              <td><button className="button btn-primary"><FontAwesomeIcon icon={faInfoCircle}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
