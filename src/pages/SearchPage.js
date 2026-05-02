/*import axios from 'axios'
import React, {useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Card from '../components/Card'

const SearchPage = () => {
  const location = useLocation()
  const [data,setData] = useState([])
  const [page,setPage] = useState(1)
  const navigate = useNavigate()
  const query = location?.search.slice(3)

    const fetchData = async()=>{
    try{
      const response = await axios.get(`search/multi`,{
        params : {
          query : location?.search.slice(3),
          page : page
        }
      })
      setData((preve)=>{
        return[
           ...preve,
           ...response.data.results
        ]
      })
    }catch (error){
       console.log('error',error)
    }
  }
  useEffect(()=>{
    if(query){
      setPage(1)
    setData([])
    fetchData()
    }
   

  },[location?.search])

    const handleScroll = ()=>{
    if((window.innerHeight + window.scrollY  ) >= document.body.offsetHeight){
      setPage(preve => preve + 1)
    }
  } 
   useEffect(()=>{
    if(query){
fetchData()
    }
      
    },[page])
  
    useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
  },[])
  




  console.log("location")
  return (
    <div className ='py-16'>
    <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
      <input 
       type='text'
       placeholder='search here...'
       onChange={(e)=>navigate(`/search?q=${e.target.value}`)}
       value = {query?.split("%20")?.join("")}
       className='px-4 py-1 w-full bg-white rounded-full text-neutral-900 '
       />
    </div>
       <div className='container mx-auto'>
            <h3 className='capitalize text-lg lg:text-x1 font-semibold my-3'>Search Results </h3>
      <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
        {
          data.map((searchData,index)=>{
            return(
              <Card data={searchData} key={searchData.id+"search"} media_type={searchData.media_type}/>
            )
          })
        }
      </div>

       </div>
    </div>
  )
}

export default SearchPage*/
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const query = location?.search.slice(3);

  // ✅ stable function (fixes dependency warning)
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`search/multi`, {
        params: {
          query: query,
          page: page,
        },
      });

      setData(prev => [...prev, ...response.data.results]);

    } catch (error) {
      console.log('error', error);
    }
  }, [query, page]);

  // ✅ reset when query changes
  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
    }
  }, [query]);

  // ✅ fetch data when query/page changes
  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [fetchData]);

  // ✅ scroll handler (memoized)
  const handleScroll = useCallback(() => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPage(prev => prev + 1);
    }
  }, []);

  // ✅ add + cleanup event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className='py-16'>

      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type='text'
          placeholder='search here...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query?.split("%20").join(" ")}
          className='px-4 py-1 w-full bg-white rounded-full text-neutral-900'
        />
      </div>

      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>
          Search Results
        </h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {
            data.map((searchData, index) => (
              <Card
                key={searchData.id + "search" + index}   // ✅ better key
                data={searchData}
                media_type={searchData.media_type}
              />
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default SearchPage;