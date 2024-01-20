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
},[length ,numAllowed ,charAllowed , setPassword])


  return (
  <div className='bg-gray-900 w-screen h-screen flex justify-center items-center px-80'>
      <div className='w-full  text-center shadow-md rounded-lg px-4 py-4 text-white bg-gray-700'>
        Password Generator
        <div className='flex overflow-hidden gap-3 text-black'>
          <input 
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 rounded-xl mt-4'
            placeholder='Password'
            readOnly
          />
          <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-lg mt-4'
          >Copy</button>
        </div>
        <div className='flex text-sm justify-evenly mt-5'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={ (e)=> {setLength(e.target.value)}}
            />
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
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
          <div className="flex items-center gap-x-1">
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
