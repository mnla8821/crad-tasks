import { useEffect, useState } from "react";
import "./Add.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const notify = () => toast.success("Create A New Item");
  const notifyDelete = () => toast.success("You Delete Item");
  const notifyConfirm = () => toast.success("You Update Item");
  const [item, setItem] = useState("");
  const [isSohw, setIsShow] = useState(false);
  const [itemPopUp, setItemPopUp] = useState("");
  const [itemIndex, setIndex] = useState();
  const [accept, setAccept] = useState(false);
  let [items, setItems] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(item);
    if (item.length == 0 || item.length > 8) {
      setAccept(true);
    } else {
      setItems((prev) => [...prev, item]);
      notify();
      setAccept(false);
    }
    console.log(items);
    setItem("");
  };
  const handleDelete = (e) => {
    console.log(e);
    const deleteItem = items.filter((_, index) => index !== e);
    setItems(deleteItem);
  };
  const handleUpdate = (item, index) => {
    setItemPopUp(item);
    setIndex(index);
  };
  const handelConfirm = (upatedItem, index) => {
    items.map((_, indexo) => {
      if (indexo === index) {
        items[index] = upatedItem;
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid parent">
        <div className="row box">
          <h1>grocery bud</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              value={item}
              placeholder="Add Item"
              onChange={(e) => {
                setItem(e.target.value);
              }}
            />
            <button>Add Item</button>
          </form>
          {accept == true ? (
            <p className="msg">Item Shoulf be At least 7 Char</p>
          ) : (
            ""
          )}
          <div className="all-items">
            {items &&
              items.map((itemo, index) => (
                <div className="item">
                  <p>{itemo}</p>

                  <div
                    className="btn update"
                    onClick={() => {
                      setIsShow(true);
                      handleUpdate(itemo, index);
                    }}
                  >
                    Update
                  </div>
                  <div
                    className="btn"
                    onClick={() => {
                      handleDelete(index);
                      notifyDelete();
                    }}
                  >
                    Delete
                  </div>
                </div>
              ))}
          </div>
        </div>
        {isSohw == true ? (
          <div className="pop-up">
            <h2>Update</h2>
            <div className="pop">
              <input
                type="text"
                value={itemPopUp}
                onChange={(e) => setItemPopUp(e.target.value)}
              />
              <div
                className="btn ss"
                onClick={() => {
                  setIsShow(false);
                  notifyConfirm();
                  handelConfirm(itemPopUp, itemIndex);
                }}
              >
                Confirm
              </div>
            </div>
          </div>
        ) : (
          " "
        )}
      </div>
    </>
  );
};

export default Add;
