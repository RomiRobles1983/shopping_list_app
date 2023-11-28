import React, { useState, useEffect } from "react";
import TopButton from "../Components/TopButton";
import OpenListsRequest from "./api/OpenListsRequest"
import { Link, useHistory } from "react-router-dom"; 
import "../Style-sheets/Home.css";

function Home() {
  const [lists, setLists] = useState([]);
  const [isOpenListClicked, setIsOpenListClicked] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await OpenListsRequest();
        console.log('Lists received in Home.js:', data);
        setLists(data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);

  const handleOpenListClick = () => {
    setIsOpenListClicked(true);
  };
  const handleCreateListClick = () => {
    // Navega a la ruta "/create-list" al hacer clic en el botón
    history.push('/create-list');
  };

  return (
    <div className="Home">
      <div className='top-buttons-container'>
        <TopButton
          isCreateListButton={true}
          buttonText="CREATE LIST"
          onClick={handleCreateListClick} 
        />

        <TopButton
          isCreateListButton={false}
          buttonText="OPEN LIST"
          onClick={handleOpenListClick}
        />
      </div>

      {isOpenListClicked && (
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
  