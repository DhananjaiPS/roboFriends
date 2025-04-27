import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const IMAGE_URL = "https://robohash.org/"
  const DATA_URL = "https://jsonplaceholder.typicode.com/users"

  const [robo, setRobo] = useState([]);
  useEffect(() => {
    setIsloading(true);
    async function getRobo() {
      try {
        const res = await fetch(DATA_URL);
        const data = await res.json();
        console.log(data);

        setRobo(data);
      }
      catch (err) {
        console.log(err);
      }

    }
    getRobo();
    setIsloading(false);
  }, [])

  const [value, setValue] = useState("");
  const [filterData, setFilter] = useState(robo);  //dont what to chnage the robo data in case it used so replace with filterData copy
  const [isloading, setIsloading] = useState(false)
  useEffect(() => {
    setFilter(robo);
  }, [robo])                    //api data change filter data change


  useEffect(() => {            //filter 
    const filtereredData = robo.filter((list) => {
      return list.name.toLowerCase().includes(value.toLowerCase());
    })
    setFilter(filtereredData);
  }, [value]);

  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='flex justify-center items-center border border-black rounded-lg shadow-lg shadow-white w-[60vh] h-[8vh]  m-[5vh]'>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="self-center px-[2vh]  outline-0 m-[5vh]"
          placeholder="Enter your Robo Name"
        />
      </div>

      {
        filterData?.length === 0 && <h1 className='text-xl'>No Data Found</h1>
      }

      {
        !isloading && <h1 className='text-xl'>Loading...</h1>
      }

      {
        !isloading && filterData?.length > 0 && filterData.map((list) => {
          return (

            <div key={list.id} className='flex justify-center flex-col bg-black text-white w-[40vh] h-[40vh] m-[2vh] rounded-lg shadow-lg shadow-white'>
              <img src={`https://robohash.org/${list.id}`} alt="roboImg" className='w-[20vh] h-[20vh] self-center' />
              <div className='self-center'>

                <h2>{list.name}</h2>
                <p>{list.email}</p>
              </div>
            </div>

          )
        })
      }


    </div>
  )
}

export default App
