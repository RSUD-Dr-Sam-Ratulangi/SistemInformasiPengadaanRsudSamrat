import axios from "axios";
import {
    FaTrash,
    FaArrowCircleUp,
  } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Vendors = () => {
  const [data, setData] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0); // Initialize page with a value

  useEffect(() => {
    axios
      .get("http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors", {
        params: {
          page,
          size,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const handleDelte = (vendoruuid) => {
    axios.delete(`http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors/${vendoruuid}`)
    .then(() => {
        console.log("Berhasil");
    }).catch(err => console.log(err))
  }

  return (
    <div>
    <button class="btn btn-primary">ProccessReview</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Vendor Name</th>
            <th scope="col">No telp</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.phoneNumber}</td>
              <td>{e.address}</td>
              <td>
              <button className="button btn-primary"><FaArrowCircleUp/></button>
              <button className="button btn-primary" onClick={() => handleDelte(e.vendoruuid)}><FaTrash/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="button btn-primary" onClick={() => setPage(page - 1)} disabled={page===0}>Previous Page</button> {/* Button to increment page */}
      <button type="button" className="button btn-primary" onClick={() => setPage(page + 1)} disabled={data.length===0}>Next Page</button> {/* Button to increment page */}
    </div>
  );
};

export default Vendors;
