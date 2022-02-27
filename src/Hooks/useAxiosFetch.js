import axios from 'axios'
import { useState, useEffect } from 'react'
const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsloading] = useState(false)

  useEffect(()=>{
    let isMounted = true
    const source = axios.CancelToken.source()
    
    const fetchData = async (url) => {
      setIsloading(true)
      try {
        const response = await axios.get(url, {
          cancelToken: source.token
        })
        if(isMounted){
          setData(response.data)
          setFetchError(null)
        }
      } catch (error) {
        if(isMounted){
          setFetchError(error.message)
          setData([])
        }
      }finally{
        isMounted && setIsloading(false)
      }
    }

    fetchData(dataUrl)

    const cleanUp = () =>{
      isMounted = false
      source.cancel()
    }
    return cleanUp

  },[dataUrl])

  return {data, fetchError, isLoading}
}

export default useAxiosFetch

