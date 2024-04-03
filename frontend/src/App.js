import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [notification, setNotification] = useState(null);

  const API_URL = "https://password-generator-server-gamma.vercel.app";

  const generatePassword = async () => {
    try {
      const response = await axios.post(API_URL + '/api/generate-password', {
        length,
        includeUppercase,
        includeNumbers,
        includeSymbols,
      }, {
        'content-type': "application/json; charset=utf-8"
      });
      setPassword(response.data.password);
    } catch (error) {
      console.error('Error generating password:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setNotification('The password has been copied to your clipboard');
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center py-3">Secure Password Generator</h1>
      <div className="mb-4 flex justify-center items-center">
        <label htmlFor="length" className="mr-2">Password Length:</label>
        <input
          type="number"
          id="length"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 w-20"
        />
      </div>
      <div className="mb-6 flex justify-center">
        <label className="mr-4 flex items-center">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            className="mr-2"
          />
          Include Uppercase
        </label>
        <label className="mr-4 flex items-center">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />
          Include Numbers
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            className="mr-2"
          />
          Include Symbols
        </label>
      </div>
      <button
        onClick={generatePassword}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors block mx-auto"
      >
        Generate Password
      </button>
      {password && (
        <div className="mt-6 flex flex-col justify-center items-center">
          <label htmlFor="generated-password" className="mb-2">Generated Password:</label>
          <p
            className="border border-gray-300 rounded px-2 py-1 cursor-pointer text-wrap"
            id="generated-password"
            onClick={copyToClipboard}
          >
            {password}
          </p>
        </div>
      )}
      {notification && (
        <div className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md text-center">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;
