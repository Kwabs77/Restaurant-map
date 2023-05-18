import React, { useContext, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillJournalBookmarkFill, BsFillForwardFill } from "react-icons/bs";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";

export const Bookmarked: React.FC = () => {
  const context = useContext(Context);
  const { setAllList, setSelectedList, allList, selectedList } = context;

//  console.log(selectedList.length);

  let number = selectedList.length;

  const handleRemove = (map: any) => {
    setSelectedList(selectedList.filter((list: any) => list.todo !== map.todo));
    toast.success("Removed from bookmark");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("signUp");
    toast.success("Logout Successful");
  };

  const [close, setClose] = useState(true);
  const handleSideBar = () => {
    setClose(!close);
  };

  return (
    <div className="bookContainer">
      <div className="arrow" onClick={handleSideBar}>
      {close ? <BsFillForwardFill /> : <IoMdArrowRoundBack size={17} />}
      </div>
      <div className={close ? "tab" : "phone-tab"}>
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
          <button>
            <div className="arrow" onClick={handleSideBar}>
              <IoMdArrowRoundBack size={17} />
            </div>
          </button>
        </div>
      </div>
      <div className={close?  "bookmarkList" : 'bookmarkList phoneDark'}>
        <div className="listRectangle">
          <h2>
            {" "}
            {number !== 0 ? "Bookmarked List" : "No Restaurant Bookmarked"}
          </h2>
        </div>
        {selectedList.map((list: any) => (
          <div key={list.index} >
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
