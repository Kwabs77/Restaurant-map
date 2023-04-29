import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import Airtable from "airtable";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Home: React.FC = () => {
  interface list {
    index: number;
    todo: string;
  }

  const getLocalStorage = () => {
    let data: any = window.localStorage.getItem("mainList");

    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [restaurant, setRestaurant] = useState<any>("");
  const [list, setList] = useState<any>(getLocalStorage());
  const [locate, setLocate] = useState<any[]>([]);
  const context = useContext(Context);
  const { setAllList, data, setSelectedList, allList, selectedList } = context;
  let number = selectedList.length;

  let record: any = [];

  useEffect(() => {
    window.localStorage.setItem("mainList", JSON.stringify(list));
  }, [list]);

  let base = new Airtable({ apiKey: "key3Eh1zQy7lHNUoW" }).base(
    "appuf4PguTkzP8Bqc"
  );

  useEffect(() => {
    base("Restaurants")
      .select({ view: "Grid view" })
      .eachPage((records: any, fetchNextPage) => {
        //setLocation(records)
        setLocate(records);
        //fetchNextPage();
      });
  }, []);

  const addList = (todo: any) => {
    const newList = {
      index: Math.floor(Math.random() * 100),
      todo: todo,
    };

    setList([newList, ...list]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  //console.log(locate)
  for (let i = 0; i < locate.length; i++) {
    record.push(locate[i].fields.Name);
  }

  //console.log(list);

  const handleBookmark = (map: any) => {
    setSelectedList([map, ...selectedList]);
    setList(list.filter((list: any) => list.todo !== map.todo));
    toast.success("Added to bookmark");
  };

  const handleRemove = (map: any) => {
    setList(list.filter((list: any) => list.todo !== map.todo));
    toast.success("Removed from Search List");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("signUp");
    toast.success("Logout Successful");
  };
  //console.log(selectedList);
  return (
    <div className="containerHome">
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
      <div className="restaurant">
        <div className="formContainer">
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              value={restaurant}
              placeholder="  search restaurant name with autocomplete"
              onChange={(e) => {
                setRestaurant(e.target.value);
              }}
            />
            <button
              className="button"
              type="submit"
              onClick={() => {
                addList(restaurant);
              }}
            >
              Add
            </button>
          </form>
        </div>
        <div className="au">
          <div className="autoComplete">
            {record
              .filter((items: any) => {
                const searchTerm = restaurant.toLowerCase();
                const records = items.toLowerCase();

                return (
                  searchTerm &&
                  records.startsWith(searchTerm) &&
                  records !== searchTerm
                );
              })

              .map((records: any, index: any) => (
                <ul
                  className="autoList"
                  key={index}
                  onClick={() => {
                    setRestaurant(records);
                    addList(records);
                  }}
                >
                  <li>
                    {" "}
                    {records}
                    <hr />{" "}
                  </li>
                </ul>
              ))}
          </div>
        </div>
        <div className="restaurantList">
          {list.map((list: list) => (
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
              {
                <div className="rectangle">
                  {list.todo}{" "}
                  {
                    <div>
                      <button
                        className="normal"
                        onClick={() => {
                          handleBookmark(list);
                        }}
                      >
                        Bookmark
                      </button>
                      <button
                        className="red"
                        onClick={() => {
                          handleRemove(list);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  }
                </div>
              }
              <br />
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
