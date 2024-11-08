import './App.css'
import {useState,useEffect,useCallback, useRef} from 'react'

export default function App() {

  // length is for how many times to run loop

  let[length,setLength]= useState(5)
  let[num,setNum]= useState(false)
  let[char,setChar]= useState(false)
  let[pass,setPass]= useState("")
  // passWordGen variable is passed as a reference in input field
  let passWordGen = useRef(null)

  // to optimize functions i.e to store functions in a cache memory that are going to run again and again.
  let passGen = useCallback(()=>{

    let password = ''
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(num){
      string = string + '0123456789'
    }
    if(char){
      string = string + '!@#$%^&*-_+=[]{}~`'
    }
    for (let i = 0; i < length; i++) {
      // 1 is to avoid 0 
      // let gen = Math.floor(Math.random() * string.length )
      let gen = Math.floor(Math.random() * string.length + 1)
      password = password + string.charAt(gen)

    }
    setPass(password)

  },[length,num,char,setPass])
  // [length,num,char,setPass] this variables will store in a cache memory

  let copyText = useCallback(()=>{
    // show selected text to copy
    passWordGen.current?.select() 
    passWordGen.current?.setSelectionRange(0,10)
    window.navigator.clipboard.writeText(pass)}
    ,[pass])

  useEffect(()=>{passGen()},[length,num,char,setPass,passGen])

    return (
    <>

    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL7ZEJWBNvCR2WkuZW845sFInVqSSMHA9Zw&s')`,
        }}
      >
      <div className=' w-full max-w-2xl mx-auto shadow-md rounded-lg px-15 py-9 my-60 bg-gray-800 text-yellow-500 pl-6 pr-6' >
        <h1 className='text-4xl text-center text-white py-2 '>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4 py-6 px-6'>
          <input type="text" value={pass} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passWordGen} />
          <button onClick={copyText} className='outline-none bg-green-500 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

      
        <div className='flex text-sm gap-x-2 ml-10 py-5'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={5} max={100} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
            <label >Length {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={num} id='numberInput' onChange={()=>{setNum((prev)=>!prev)}} />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={num} id='characterInput' onChange={()=>{setChar((prev)=>!prev)}} />
            <label htmlFor="characterInput">Character</label>
          </div>
          
        </div>
      </div>
    </div>
    
    </>
  )
}