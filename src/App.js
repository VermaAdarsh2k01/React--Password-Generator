import './App.css';
import { useState , useCallback , useEffect } from 'react';

function App() {

  const [length , setLength] = useState(8)
  const [numAllowed , setNumAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)

  const [password ,setPassword] = useState("")

  const passwordGenerator = useCallback( ()=> {
    let pass=""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) string += "0123456789"
    if (charAllowed) string += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()* string.length + 1 )
      pass += string.charAt(char)
    }
    setPassword(pass)

  } , [length , numAllowed , charAllowed , setPassword])


  useEffect( ()=>{ 
  passwordGenerator()
},[length ,numAllowed ,charAllowed , ])


  return (
  <div className='bg-gray-900 w-screen h-screen flex justify-center items-center'>
      <div className='w-[40vw] h-[60vh] text-center shadow-md rounded-lg px-4 py-4 text-white bg-gray-700 flex flex-col gap-10 max-sm:w-[100vw] font-black'>
        Password Generator
        <div className='flex overflow-hidden  text-black mt-5'>
          <input 
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 rounded-xl mt-4 font-normal'
            placeholder='Password'
            readOnly
          />
        </div>
        <div className='flex flex-col items-center justify-center gap-7 text-sm mt-10'>
          <div className='flex flex-col justify-centeritems-center gap-x-1 font-normal'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer '
              onChange={ (e)=> {setLength(e.target.value)}}
            />
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1 font-normal'>
            <input
              type='checkbox'
              defaultChecked={numAllowed}
              onChange={ () => {
                setNumAllowed((prev) => !prev) 
                }
              }
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1 font-normal">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label>Characters</label>
      </div>

        </div>
      </div>
      
  </div>
  );
}

export default App;
