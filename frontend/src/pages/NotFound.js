import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={goHome}>Go to homepage</button>
    </div>
  );
}

export default NotFound;
