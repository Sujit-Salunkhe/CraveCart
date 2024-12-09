import {useEffect} from 'react'
import axios from 'axios'
const PostRequest = ({location,setRestaurants,image}) => {
      useEffect(() => {
    if (location) {
      axios.post("http://localhost:5000/location", { location,image })
        .then((result) => {
            const results = result.data
            setRestaurants(results)
        })
        .catch((err) => {
          console.log("error")
          console.log(err);
        });
    }
  }, [location])
}

export default PostRequest;
