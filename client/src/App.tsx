import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

const App = (): React.ReactElement => {
  const [response, setResponse] = useState<string>("Hi!");

  useEffect(() => {
    (async () => {
      const res = await axios.get('/hello');
      setResponse(res.data as string);
    })();
  }, []);
  
  return (
    <div>
      <header className="App-header">
        {response}
      </header>
    </div>
  );
}

export default App;
