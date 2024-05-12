import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavigationBar from './components/NavigationBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1> Abrigo centro vida</h1>
      <NavigationBar />
    </div>
  );
}

export default App
