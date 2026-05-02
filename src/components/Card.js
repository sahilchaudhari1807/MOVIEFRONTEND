import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector(state => state.movieoData.imageURL)
const [imgError, setImgError] = React.useState(false)
  const mediaType = data.media_type ?? media_type

  // ✅ Detect if it's a review
  const isReview = !!data?.author

  // ✅ IMAGE LOGIC
  let imagePath =
    data?.poster_path ||
    data?.profile_path ||
    data?.author_details?.avatar_path

  let imgUrl = ""

  if (imagePath?.startsWith("/https")) {
    imgUrl = imagePath.slice(1)
  } else if (imagePath) {
    imgUrl = imageURL + imagePath
  } else {
    imgUrl = "/default-avatar.png" // fallback
  }

  // ✅ TEXT DATA
  const title = data?.title || data?.name || data?.author
  const date = data?.release_date || data?.first_air_date || data?.created_at
  const rating = data?.vote_average || data?.author_details?.rating

  return (
    <Link
      to={isReview ? "#" : "/" + mediaType + "/" + data.id}
      className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all'
    >
  {!imgError ? (
  <img
    src={imgUrl}
    alt={title || "image"}
    className="w-full h-full object-cover"
    onError={() => setImgError(true)}
  />
) : (
  <div className="bg-neutral-800 h-full w-full flex justify-center items-center ">
    Image not found
  </div>
)}

      {/* TRENDING */}
      {trending && (
        <div className='absolute top-4 py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60'>
          #{index} Trending
        </div>
      )}

      {/* CONTENT */}
      <div className='absolute bottom-0 h-20 backdrop-blur-3xl w-full bg-black/60 p-2'>
        <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>
          {title}
        </h2>

        <div className='text-sm text-neutral-400 flex justify-between items-center'>
          <p>
            {date ? moment(date).format("MMM Do YYYY") : "N/A"}
          </p>

          <p className='bg-black px-1 rounded-full text-xs text-white'>
Rating: {rating ? Number(rating).toFixed(1) : "N/A"}          </p>
        </div>

        {/* ✅ Show review content preview */}
        {isReview && (
          <p className='text-xs line-clamp-2 mt-1 text-neutral-300'>
            {data?.content}
          </p>
        )}
      </div>
    </Link>
  )
}
export default Card