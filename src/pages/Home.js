import React from 'react';
import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizontalScollCard from '../components/HorizontalScollCard';
import useFetch from '../hooks/useFetch';  // ✅ correct name

const Home = () => {
  const trendingData = useSelector(state => state.movieoData.bannerData);

  const { data: nowPlayingData } = useFetch('/movie/now_playing');
  const { data: topRatedData } = useFetch('/movie/top_rated');
  const { data: popularMovieData } = useFetch('/movie/popular');

  return (
    <div>
      <BannerHome />
      <HorizontalScollCard data={trendingData} heading={"Trending"} trending={true} />
      <HorizontalScollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"} />
      <HorizontalScollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"} />
      <HorizontalScollCard data={popularMovieData} heading={"Popular Movies"} media_type={"movie"} />
    </div>
  );
};

export default Home;