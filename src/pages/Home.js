import React from 'react'
import BannerHome from '../components/BannerHome'
import {useSelector} from 'react-redux'
import Card from '../components/Card'
import HorizontalScollCard from '../components/HorizontalScollCard';
import axios from 'axios'
import {useEffect,useState} from 'react'
import usefetch from '../hooks/useFetch'

const Home = () => {
    const trendingData = useSelector(state => state.movieoData.bannerData)

    const { data : nowPlayingData } = usefetch('/movie/now_playing')
    const { data : topRatedData } = usefetch('/movie/top_rated')
    const { data : popularMovieData } = usefetch('/movie/popular')

  return (
    <div>
        <BannerHome/>
        <HorizontalScollCard data={trendingData} heading={"Trending"} trending={true}/>
        <HorizontalScollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
        <HorizontalScollCard data={topRatedData} heading={"Top Rated Movies"}  media_type={"movie"}/>
        <HorizontalScollCard data={popularMovieData} heading={"Popular Movies"}  media_type={"movie"}/>

     </div>
  )
}

export default Home