import { useEffect, useState } from 'react'
import './App.css'

// Assume you have a Loading component ready
function Loading() {
  return (
    <div className="w-[40vh] h-[40vh] bg-gray-700 rounded-lg animate-pulse m-[2vh] flex flex-col justify-center items-center">
      <div className="bg-gray-500 w-[20vh] h-[20vh] rounded-full mb-4"></div>
      <div className="h-4 bg-gray-500 w-1/2 mb-2 rounded"></div>
      <div className="h-3 bg-gray-500 w-1/3 rounded"></div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const IMAGE_URL = "https://robohash.org/"
  const DATA_URL = "https://jsonplaceholder.typicode.com/users"

  const [robo, setRobo] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [value, setValue] = useState("");
  const [filterData, setFilter] = useState(robo);

  useEffect(() => {
    async function getRobo() {
      setIsloading(true);
      try {
        const res = await fetch(DATA_URL);
        const data = await res.json();
        console.log(data);

        setRobo(data);
      }
      catch (err) {
        console.log(err);
      }
      setIsloading(false);
    }
    getRobo();
  }, [])

  useEffect(() => {
    setFilter(robo);
  }, [robo])

  useEffect(() => {
    const filtereredData = robo.filter((list) => {
      return list.name.toLowerCase().includes(value.toLowerCase());
    })
    setFilter(filtereredData);
  }, [value, robo]);  // Also include `robo` in dependency!

  return (
    <div className='flex flex-col justify-center items-center bg-black min-h-screen'>
      
      <div className='flex justify-center items-center border border-black rounded-lg shadow-lg shadow-white w-[60vh] h-[8vh] m-[5vh]'>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="self-center px-[2vh] outline-0 m-[5vh]"
          placeholder="Enter your Robo Name"
        />
      </div>

      {/* Show loading skeletons */}
      {isloading && (
        <div className='flex flex-wrap justify-center items-center gap-4'>
          <Loading />
          <Loading />
          <Loading />
          <Loading />
        </div>
      )}

      {/* No Data Found */}
      {!isloading && filterData.length === 0 && (
        <h1 className='text-xl text-white'>No Data Found</h1>
      )}

      {/* Show Robo cards */}
      {!isloading && filterData.length > 0 && (
        <div className="flex flex-wrap justify-center items-center">
          {filterData.map((list) => (
            <div key={list.id} className='flex justify-center flex-col bg-black text-white w-[40vh] h-[40vh] m-[2vh] rounded-lg shadow-lg shadow-white'>
              <img src={`https://robohash.org/${list.id}`} alt="roboImg" className='w-[20vh] h-[20vh] self-center' />
              <div className='self-center'>
                <h2>{list.name}</h2>
                <p>{list.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default App
