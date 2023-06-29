import React, { useEffect } from "react";
import { MdHandshake, MdHistory } from "react-icons/md";

const ModalHistory = ({ history }) => {
  useEffect(() => {
    console.log("modal history", window.historyModal.open);
    if (!window.historyModal.open) {
      window.historyModal.showModal();
    }
  }, [history]);

  return (
    <dialog id="historyModal" className="modal">
      <div className="modal-box max-w-3xl">
        {/* Header */}
        <form>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MdHistory className="text-2xl text-primary-1" />
              <h3 className="text-xl font-bold">History</h3>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </div>
        </form>
        <div className="modal-body">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Bid Price</th>
                <th>Price Change</th>
                <th>Status</th>
                <th>Messages</th>
              </tr>
            </thead>
            <tbody>
              {history.map((e, i) => (
                <tr key={i}>
                  <td>{e.productName}</td>
                  <td>{e.bidPrice}</td>
                  <td>{e.bidPriceChange}</td>
                  <td>{e.status}</td>
                  <td>{e.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
};

export default ModalHistory;
