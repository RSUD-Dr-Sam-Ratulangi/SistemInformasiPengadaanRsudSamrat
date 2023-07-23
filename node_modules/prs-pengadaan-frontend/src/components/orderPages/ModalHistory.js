import React, { useState, useEffect } from "react";
import { MdHandshake, MdHistory } from "react-icons/md";

const ModalHistory = ({ history, onClose }) => {
  const [newHistory, setNewHistory] = useState(null);

  useEffect(() => {
    const newNewHistory = [];
    history.forEach(item => {
      item.bidItems.forEach(bidItem => {
        newNewHistory.push({
          ...bidItem,
          status: item.status,
          orderDate: item.orderDate
        });
      });
    });

    const removedDuplicates = removeHistoryDuplicateValue(newNewHistory);

    setNewHistory(removedDuplicates);

    console.log("modal history", window.historyModal.open);
    if (!window.historyModal.open) {
      window.historyModal.showModal();
    }
  }, [history]);

  function removeHistoryDuplicateValue(arrayOfHistory) {
    return arrayOfHistory.filter((obj, index, self) => {
      return index === self.findIndex(o => 
        o.id === obj.id 
      );
    });
  }

  // convert this time "2023-06-28T20:14:53" to text "2 hours ago"
  const timeAgo = (time) => {
    const now = new Date();
    const then = new Date(time);
    const seconds = Math.round((now - then) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);

    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (weeks < 4) {
      return `${weeks} weeks ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  };

  console.log("history", history);

  return (
    <dialog id="historyModal" className="modal">
      <div className="max-w-3xl modal-box">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MdHistory className="text-2xl text-primary-1" />
            <h3 className="text-xl font-bold">History</h3>
          </div>
          <button
            onClick={onClose}
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Bid Price</th>
                <th>Price Change</th>
                <th>Status</th>
                <th>Messages</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {newHistory && newHistory.map((e, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{e.productName}</td>
                  <td>{e.bidPrice}</td>
                  <td>{e.bidPriceChange}</td>
                  <td>{e.status}</td>
                  <td>{e.message}</td>
                  <td>{timeAgo(e.orderDate)}</td>
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
