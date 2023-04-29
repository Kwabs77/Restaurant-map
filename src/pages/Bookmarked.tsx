import React, { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Bookmarked: React.FC = () => {
  const context = useContext(Context);
  const { setAllList, setSelectedList, allList, selectedList } = context;

  console.log(selectedList.length);

  let number = selectedList.length;

  const handleRemove = (map: any) => {
    setSelectedList(selectedList.filter((list: any) => list.todo !== map.todo));
    toast.success("Removed from bookmark");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("signUp");
    toast.success("Logout Successful");
  };

  return (
    <div className="bookContainer">
      <div className="tab">
        <div className="fixed">
          <div className="flex">
            <h2>Sidebar</h2>
            <Link to="/">
              <button onClick={handleLogout}>LogOut</button>
            </Link>
          </div>
          <hr />
          <Link to="/home">
            <button>
              {" "}
              <span className="span">
                <AiOutlineHome size={25} />
              </span>
              Home Page
            </button>
          </Link>
          <br />
          <hr />
          <Link to="/bookmark">
            <button>
              {" "}
              <span className="span1">
                <BsFillJournalBookmarkFill size={25} />
              </span>
              Bookedmarked Restaurant <span className="number"> {number}</span>
            </button>
          </Link>
          <hr />
        </div>
      </div>
      <div className="bookmarkList">
        <div className="listRectangle">
          <h2> Bookmarked List</h2>
        </div>
        {selectedList.map((list: any) => (
          <div key={list.index}>
            {" "}
            {
              <iframe
                width="770"
                height="580"
                src={`https://lookerstudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22${list.todo}%22%7D`}
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            }
            <br />
            {
              <div className="rectangle">
                {list.todo}{" "}
                {
                  <div>
                    <button
                      className="red"
                      onClick={() => {
                        handleRemove(list);
                      }}
                    >
                      {" "}
                      Remove
                    </button>
                  </div>
                }
              </div>
            }
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};
