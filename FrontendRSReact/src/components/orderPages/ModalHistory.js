import React, { useEffect } from "react";
import { MdHandshake } from "react-icons/md";

const ModalHistory = ({ history }) => {
  useEffect(() => {
    console.log("modal history", window.historyModal.open);
    if (!window.historyModal.open) {
      window.historyModal.showModal();
    }
  }, [history]);

  if (history) {
    return <div>Hello modal</div>;
  }

  const filterSameHistory = (history) => {
    // filter 100% same history
    let filteredHistory = [];
    for (let i = 0; i < history.length; i++) {
      let isSame = false;
      for (let j = 0; j < filteredHistory.length; j++) {
        if (history[i].id === filteredHistory[j].id) {
          isSame = true;
          break;
        }
      }
      if (!isSame) {
        filteredHistory.push(history[i]);
      }
    }
    console.log("filteredHistory", filteredHistory);
    return filteredHistory;
  };

  return (
    <dialog id="historyModal" className="modal">
      <div className="modal-box max-w-3xl">
        {/* Header */}
        <form>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MdHandshake className="text-2xl text-primary-1" />
              <h3 className="text-xl font-bold">History</h3>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </div>
        </form>
        <div className="modal-body">
          <p>See your History</p>
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
              {filterSameHistory.map((e, i) => (
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
        <div className="modal-footer">
          <p>See Your history Order</p>
        </div>
      </div>
    </dialog>
  );
};

export default ModalHistory;
