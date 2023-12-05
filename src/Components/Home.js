import React, { useState, useEffect } from "react";
import TopButton from "../Components/TopButton";
import openLists from "./api/OpenListsRequest";
import { Link, useHistory } from "react-router-dom"; 
import "../Style-sheets/Home.css";

function Home() {
  const [lists, setLists] = useState([]); 
  const [isOpenListClicked, setIsOpenListClicked] = useState(false);  // useState to manage the state of lists and isOpenListClicked.
  const history = useHistory(); // useHistory to access the React Router browsing history object.


//  Handles the opening of the lists stored in the database according to the api in OpenListRequest.js
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await openLists();
        console.log('Lists received in Home.js:', data);
        setLists(data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);



  const handleOpenListClick = () => { // Handles the buttons: setIsOpenListClicked as TRUE setIsOpenListClicked , when the OPEN LIST button is clicked.
    setIsOpenListClicked(true);
  };


  const handleCreateListClick = () => {//  Handles the buttons: send to the path "/create-list". when the CREATE LIST button is clicked.
    history.push('/create-list');
  };


  return (
    <div className="Home">
      <div className='top-buttons-container'>
        <TopButton
          isCreateListButton={true} // Render the Top Button Component with the necessary props to create the "CREATE LIST" button.
          buttonText="CREATE LIST"
          onClick={handleCreateListClick} 
        />

        <TopButton
          isCreateListButton={false} //Render the Top Button Component with the necessary props to create the "OPEN LIST" button.
          buttonText="OPEN LIST"
          onClick={handleOpenListClick}
        />
      </div>


      {isOpenListClicked && ( //Manages the opening of the names of the lists saved in the database from a mapping using the name property.
        <div className='lists-names-buttons-container'>
          {lists.map((list) => (
            <Link key={list._id} to={`/open-list/${list.name}`}>
              <button className='lists-names-buttons'>
                {list.name}
              </button>
            </Link>
          ))}
          </div>
        )}
      </div>
  
    );
  }
  
  export default Home;
  