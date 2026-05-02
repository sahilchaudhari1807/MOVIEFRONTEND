import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import Divider from "../components/Divider";
const ActoreDetailPage = () => {
  const { id } = useParams();
 
  // ✅ Fetch actor details (same hook you already use)
  const { data: actor } = useFetchDetails(`/person/${id}`);

  if (!actor) return <p className="text-white p-5">Loading...</p>;

  return (
    

    <div className="text-white p-5 ">
      {/* Actor Image */}
      <img
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
            : "/no-image.png"
        }
        alt={actor.name}
        className="rounded-lg mx-auto md:mx-0 block w-40 sm;w-52 md:w-60"
      />

      {/* Actor Info */}
      <h1 className="text-2xl font-bold mt-4">{actor.name}</h1>
      <Divider/>
      <p><b>Known For:</b> {actor.known_for_department}</p>
      <p><b>Birthday:</b> {actor.birthday || "N/A"}</p>
      <p><b>Place of Birth:</b> {actor.place_of_birth || "N/A"}</p>
      <Divider/>
      {/* Biography */}
      <p className="mt-4">
        {actor.biography || "No biography available."}
      </p>
    </div>
  );
};

export default ActoreDetailPage;