import { useState, useEffect } from 'react';
import './App.css';

const useImageURL = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando dos solicitudes de imagen simultáneas usando Promise.all
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" }),
      fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" })
    ])
      .then((responses) => {
        // Verificar si ambas solicitudes se completaron con éxito
        return Promise.all(responses.map((response) => {
          if (!response.ok) {
            throw new Error("Server error!!");
          }
          return response.json();
        }));
      })
      .then((data) => {
        setImageURL(data[0].url);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false)); 
  }, []);

  return { imageURL, error, loading };
};

function App() {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered!</p>;


  return (
    imageURL && (
      <>
        <h1>An image</h1>
        <img src={imageURL} alt={"placeholder text"} />
      </>
    )
  );
}

export default App;
