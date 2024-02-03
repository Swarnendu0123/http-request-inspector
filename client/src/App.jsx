import './App.css'
import HomeRoute from './components/Home.component'
import UrlGnerator from './components/UrlGnerator.component'

function App() {

  return (
    <div className="text-white bg-black">
      <h1 className='mb-5 text-4xl font-bold'>HTTP Request Inspector </h1>
      <UrlGnerator />
      <HomeRoute />
    </div>
  )
}

export default App
