import React, { useEffect } from "react";
import { MdHandshake, MdHistory } from "react-icons/md";

const ModalHistory = ({ history }) => {
  useEffect(() => {
    console.log("modal history", window.historyModal.open);
    if (!window.historyModal.open) {
      window.historyModal.showModal();
    }
  }, [history]);

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
              {history?.map((e, i) => (
                <tr key={e.id}>
                  <td>{i}</td>
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
