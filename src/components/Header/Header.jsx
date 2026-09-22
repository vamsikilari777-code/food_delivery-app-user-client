import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="p-5 mb-3 bg-light rounded-3 mt-1 header">
      <div className="container-fluid py-5">
        <h1 className="display-6 fw-bold">Order your favorite food {" "}  <b style={{ color: "#1809ef" }}>here</b></h1>
        <p className="col-md-8 fs-4">
          Discover the best food and drinks in your city
        </p>
        <Link to="/explore" className="btn btn-primary">
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Header;
