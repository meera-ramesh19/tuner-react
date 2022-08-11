import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;

const SongDetails = () => {
  const [song, setSong] = useState([]);

  let navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API}/api/songs/${id}`)
      .then((response) => setSong(response.data.payload))
      .catch(() => navigate('/not-found'));
    // .catch((error) => console.error("catch", error));
  }, [id, navigate]);

  const handleDelete = () => {
    axios
      .delete(`${API}/api/songs/${id}`)
      .then(() => {
        navigate(`/songs`);
      })
      .catch((e) => console.error(e));
  };

  return (
    <article>
      {/* <div className='Song-Details' > */}
      <div style={{ backgroundColor: '#00beb2', padding: '2rem' }}>
        <h3>
          {song.is_favorite ? (
            <span>&#11088;</span>
          ) : (
            <span className='X'> &#10060;</span>
          )}
          {song.name}- By {song.artist}
        </h3>
        <h5>{song.album}</h5>
        <h6>Time:{(song.time / 60).toFixed(2).replace('.', ':')}</h6>
      </div>
      <div className='showNavigation'>
        <div>
          {' '}
          <Link to={`/songs`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {' '}
          <Link to={`/songs/${id}/edit`}>
            {/* //edited song.id to id */}
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {' '}
          <Link to={`/songs`}>
            <button onClick={handleDelete}>Delete</button>
          </Link>
        </div>
      </div>
      {/* </div> */}
    </article>
  );
};

export default SongDetails;
