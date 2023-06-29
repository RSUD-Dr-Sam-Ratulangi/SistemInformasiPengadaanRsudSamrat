import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdCheck, MdHandshake } from "react-icons/md";
import { useSelector } from "react-redux";

const ModalConfirm = ({
  onAccept,
  onSubmit,
  bidPrice,
  setBidPrice,
  selectedOrder,
  selectedOrderItem,
  onClose,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const role = useSelector((state) => state.auth.role);
  const id = useSelector((state) => state.auth.id);
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("modal confirm", window.confirmModal.open);
    if (!window.confirmModal.open) {
      window.confirmModal.showModal();
    }
  }, [selectedOrderItem]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Save the selected file to array
    setSelectedFiles([...selectedFiles, selectedFile]);

    // Reset the input value to allow selecting the same file again
    event.target.value = null;
  };

  const handleUploadFile = () => {
    console.log("selectedOrder inside confirm", selectedOrder);
    axios
      .post("http://rsudsamrat.site:8990/api/v1/notifikasi", {
        sender: role,
        senderId: id,
        receiver: selectedOrder.orderItems[0].product.vendor.name,
        receiverId: selectedOrder.orderItems[0].product.vendor.id,
        message: `Semua produk dalam order id ${selectedOrder.id} telah diterima. Berkas Telah dikirim.`,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <dialog id="confirmModal" className="modal">
      <div className="modal-box max-w-3xl">
        {/* Header */}
        <form>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MdCheck className="text-2xl text-primary-1" />
              <h3 className="text-xl font-bold">Confirm</h3>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-2 ">
          <h2 className="text-3xl font-semibold text-slate-600">
            {/* {selectedOrderItem.product.name} */}
          </h2>
          {selectedFiles && (
            <div>
              {selectedFiles.map((file, index) => (
                <div
                  className="flex justify-start items-center gap-2"
                  key={index}
                >
                  <p key={index}>{file.name}</p>
                  <button
                    className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                    onClick={handleUploadFile}
                  >
                    Upload
                  </button>
                </div>
              ))}
            </div>
          )}
          <div>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              onClick={handleUploadClick}
              className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
              disabled={selectedFiles.length === 1}
            >
              Upload Surat
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor="negotiation-input"
                className="font-semibold text-xl mb-2"
              >
                Message
              </label>
              <textarea
                id="refund-textarea"
                type="number"
                placeholder="Message..."
                className="w-full textarea border-primary-1 focus:outline-primary-1 "
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-action">
          <button
            onClick={onSubmit}
            className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalConfirm;
