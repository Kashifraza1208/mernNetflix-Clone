import "./Movie.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useState } from "react";
import { useContext } from "react";

import storage from "../../firebase";
import { updateMovie } from "../../context/movieContext/apiCalls";

const Movie = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(MovieContext);

  const location = useLocation();
  console.log(location);
  const movie = location.state?.movie;

  const [movieUpdate, setMovieUpdate] = useState({
    title: movie.title,
    genre: movie.genre,
    year: movie.year,
    limit: movie.limit,
    isSeries: movie.isSeries,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieUpdate((preMovieUpdate) => ({
      ...preMovieUpdate,
      [name]: value,
    }));
  };

  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // ... (other code)

  const handleTrailerChange = (e) => {
    if (e.target.files[0]) {
      setSelectedTrailer(e.target.files[0]);
    }
  };

  const handleVideoChange = (e) => {
    if (e.target.files[0]) {
      setSelectedVideo(e.target.files[0]);
    }
  };

  const handleImgChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Upload files to Firebase storage
    if (selectedImage) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${selectedImage.name}`);
      await imageRef.put(selectedImage);
      const imageUrl = await imageRef.getDownloadURL();

      // Update the movie with the new image URL
      setMovieUpdate((prevMovie) => ({
        ...prevMovie,
        img: imageUrl,
      }));
    }

    // Upload selected trailer to Firebase storage
    if (selectedTrailer) {
      const storageRef = storage.ref();
      const trailerRef = storageRef.child(`trailers/${selectedTrailer.name}`);
      await trailerRef.put(selectedTrailer);
      const trailerUrl = await trailerRef.getDownloadURL();

      // Update the movie with the new trailer URL
      setMovieUpdate((prevMovie) => ({
        ...prevMovie,
        trailer: trailerUrl,
      }));
    }

    // Upload selected video to Firebase storage
    if (selectedVideo) {
      const storageRef = storage.ref();
      const videoRef = storageRef.child(`videos/${selectedVideo.name}`);
      await videoRef.put(selectedVideo);
      const videoUrl = await videoRef.getDownloadURL();

      // Update the movie with the new video URL
      setMovieUpdate((prevMovie) => ({
        ...prevMovie,
        video: videoUrl,
      }));
    }

    updateMovie(movie._id, movieUpdate, dispatch);
    navigate("/movies");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            {movie && <img src={movie.img} alt="" className="productInfoImg" />}
            {movie && <span className="productName">{movie.title}</span>}
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              {movie && <span className="productInfoValue">{movie._id}</span>}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              {movie && <span className="productInfoValue">{movie.genre}</span>}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              {movie && <span className="productInfoValue">{movie.year}</span>}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              {movie && <span className="productInfoValue">{movie.limit}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              name="title"
              value={movieUpdate.title}
              onChange={handleInputChange}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={movieUpdate.genre}
              onChange={handleInputChange}
            />
            <label>Year</label>
            <input
              type="text"
              name="year"
              value={movieUpdate.year}
              onChange={handleInputChange}
            />
            <label>Limit</label>
            <input
              type="Number"
              name="limit"
              value={movieUpdate.limit}
              onChange={handleInputChange}
            />
            <label>Is Series?</label>
            <select
              name="isSeries"
              id="isSeries"
              value={movieUpdate.isSeries}
              onChange={handleInputChange}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
            <label>Trailer</label>
            <input type="file" name="trailer" onChange={handleTrailerChange} />
            <label>Video</label>
            <input type="file" name="video" onChange={handleVideoChange} />
          </div>

          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleImgChange}
              />
            </div>
            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Movie;
