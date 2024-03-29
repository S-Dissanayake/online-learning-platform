import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Carousel from '../Components/Carousel/Carousel'
import NewCollections from '../Components/NewCollections/NewCollections'
import FeedbackCorner from '../Components/FeedbackCorner/FeedbackCorner'

function Home() {
    const [newcourses, setNewCourses] = useState([]);

    const fetchInfo = () => {        
        axios.get('http://localhost:8800/api/course/getAllCoursesList')
        .then(res => {
          if(res.data.error) {
            alert("Error on get Latest Courses")
          } else if(res.data) {
            setNewCourses(res.data.result);
            } else {
                alert("Error on get Latest Courses")
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
            <NewCollections data={newcourses}/>
            <FeedbackCorner/>      
        </div>
    )
}
export default Home