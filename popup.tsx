"use client"

import { useCompletion } from "ai/react"
import { useState } from "react"

import "./style.css"

function IndexPopup() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    try {
      setIsLoading(true)
      const data = await fetch("http://localhost:3000/api/generate-text", {
        method: "POST",
        body: JSON.stringify({ input })
      })
      const jsonResponse = await data.json()
      setResult(jsonResponse.data)
      console.log("json response--->", jsonResponse.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  // const {
  //   completion,
  //   input,
  //   stop,
  //   isLoading,
  //   handleInputChange,
  //   handleSubmit
  // } = useCompletion({ api: "http://localhost:3000/api/generate-text" })

  return (
    <div className="w-[500px] h-[500px] bg-black flex flex-col justify-between items-center py-10">
      <h1 className="bg-gradient-to-tr from-rose-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent text-5xl font-bold">
        Curiodom
      </h1>
      <div className="pt-10 justify-between space-y-4">
        {isLoading ? (
          <div className="text-center text-white text-xl">
            <img
              src="https://media.tenor.com/RVvnVPK-6dcAAAAC/reload-cat.gif"
              className="w-[80px] h-[80px]"
            />
          </div>
        ) : (
          <output className="w-full h-[250px] rounded-xl text-xl bg-transparent text-white">
            {/* {completion} */}
            {result}
          </output>
        )}
        <div className="flex space-x-4 h-[50px]">
          {/* <form onSubmit={handleSubmit} className="flex space-x-4 h-[50px]"> */}
          <input
            type="text"
            placeholder="type here.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onChange={handleInputChange}
            className="w-full text-xl rounded-xl"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white text-xl px-4 py-2 rounded-xl"
            onClick={handleClick}>
            Generate
          </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
