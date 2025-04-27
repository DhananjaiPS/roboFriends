import { useEffect, useState } from 'react';
import './App.css';

// Loading Skeleton
function Loading() {
  return (
    <div className="w-60 h-72 bg-gray-700 rounded-lg animate-pulse m-4 flex flex-col justify-center items-center">
      <div className="bg-gray-500 w-24 h-24 rounded-full mb-4"></div>
      <div className="h-4 bg-gray-500 w-1/2 mb-2 rounded"></div>
      <div className="h-3 bg-gray-500 w-1/3 rounded"></div>
    </div>
  );
}

function App() {
  const IMAGE_URL = "https://robohash.org/";
  const DATA_URL = "https://jsonplaceholder.typicode.com/users";

  const [robo, setRobo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    async function getRobots() {
      setIsLoading(true);
      try {
        const res = await fetch(DATA_URL);
        const data = await res.json();
        setRobo(data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    }
    getRobots();
  }, []);

  useEffect(() => {
    const filtered = robo.filter(robot =>
      robot.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(filtered);
  }, [value, robo]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-8 items-center">
      <h1 className="text-4xl font-bold text-white mb-8">RoboFriends</h1>

      <div className="w-full max-w-md mb-12">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Robots..."
          className="w-full px-6 py-3 rounded-lg text-black text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {isLoading ? (
        <div className="flex flex-wrap justify-center gap-6">
          {Array.from({ length: 6 }).map((_, idx) => <Loading key={idx} />)}
        </div>
      ) : filterData.length === 0 ? (
        <h2 className="text-2xl text-red-400">No Robots Found 🚫</h2>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filterData.map((robot) => (
            <div
              key={robot.id}
              className="bg-gray-800 text-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300 p-6 flex flex-col items-center"
            >
              <img
                src={`${IMAGE_URL}${robot.id}`}
                alt="Robot Avatar"
                className="w-32 h-32 mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold">{robot.name}</h3>
              <p className="text-gray-400">{robot.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
