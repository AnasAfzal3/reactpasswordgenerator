import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  let [length, setLength] = useState(6);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [CharAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  let passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let passworStore = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "123456789";
    if (CharAllowed) str += "!@#$%^&*";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      console.log(char);
      passworStore += str.charAt(char);
    }
    setPassword(passworStore);
    setIsCopied(false);
  }, [length, numberAllowed, CharAllowed, setPassword]);
  const copyText = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
    // Show toast notification on copy
    setIsCopied(true);

    // Hide the popup after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, CharAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 py-8 text-orange-500 bg-gray-800">
        <h1 className="text-4xl text-center text-white">Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-5">
          <input
            type="text"
            className="outline-none mx-auto w-full text-center py-2 px-3"
            defaultValue={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className={`${
              isCopied ? "bg-green-500" : "bg-blue-700 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded relative`}
            onClick={copyText}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              defaultValue={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="font-black">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="font-black">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={CharAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="font-black">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
