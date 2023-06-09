import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CommingSoon = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2500);
  }, []);

  return (
    <div style={{padding: '80px'}}>
      <h1>Coming soon.</h1>
      <p>Redirecting to home page...</p>

      {/* <h1>Update</h1>
      <p>THIS FUNCTION WILL BE COMING SOON.</p>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={toggleDropdown}
        >
          Dropdown link
        </button>

        <div className={`dropdown-menu${isOpen ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Action
          </a>
          <a className="dropdown-item" href="#">
            Another action
          </a>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default CommingSoon;
