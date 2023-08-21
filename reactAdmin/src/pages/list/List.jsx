import { useState } from "react";
import "./List.css";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/apiCalls";
import { useNavigate } from "react-router-dom";

const List = () => {
  const location = useLocation();
  const list = location.state?.list;

  const navigate = useNavigate();
  //this is the intitain value i am setting
  const [updatelist, setUpdateList] = useState({
    title: list?.title,
    type: list?.type,
    genre: list?.genre,
  });

  const { dispatch } = useContext(ListContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateList((prevUpdateList) => ({
      ...prevUpdateList,
      [name]: value,
    }));
  };

  const handleUpdateList = (e) => {
    e.preventDefault();
    updateList(list._id, updatelist, dispatch);
    navigate("/lists");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            {list && <span className="productName">{list.title}</span>}
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              {list && <span className="productInfoValue">{list._id}</span>}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              {list && <span className="productInfoValue">{list.genre}</span>}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              {list && <span className="productInfoValue">{list.type}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              name="title"
              value={updatelist.title}
              onChange={handleChangeInput}
            />
            <label>Type</label>
            <input
              type="text"
              name="type"
              value={updatelist.type}
              onChange={handleChangeInput}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={updatelist.genre}
              onChange={handleChangeInput}
            />
          </div>
          <div className="productFormRight">
            <button
              className="productButton"
              type="submit"
              onClick={handleUpdateList}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default List;
