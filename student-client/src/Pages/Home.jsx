import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Carousel from '../Components/Carousel/Carousel'
import Popular from '../Components/Popular/Popular'
import NewCollections from '../Components/NewCollections/NewCollections'
import FeedbackCorner from '../Components/FeedbackCorner/FeedbackCorner'

function Home() {
    const [popular, setPopular] = useState([]);
    const [newcollection, setNewCollection] = useState([]);

    const fetchInfo = () => {
        axios.get('http://localhost:8800/getFavoriteProducts')
        .then(res => {
          if(res.data.error) {
            alert("Error on get Favorite Products")
          } else if(res.data) {
            setPopular(res.data);
            } else {
                alert("Error on get Favorite Products")
            }
        })
        .catch(err => console.log(err));
        
        axios.get('http://localhost:8800/getLatestArrivalProducts')
        .then(res => {
          if(res.data.error) {
            alert("Error on get Latest Arrival Products")
          } else if(res.data) {
            setNewCollection(res.data);
            } else {
                alert("Error on get Latest Arrival Products")
            }
        })
        .catch(err => console.log(err));

    }

    useEffect(() => {
        fetchInfo();
    }, [])

    return (
        <div>
            <Carousel/>
            <NewCollections data={newcollection}/>
            <Popular data={popular}/>
            <FeedbackCorner/>      
        </div>
    )
}
export default Home