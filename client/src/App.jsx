import './App.css'
import HomeRoute from './components/Home.component'
import UrlGnerator from './components/UrlGnerator.component'

function App() {

  return (
    <>
      <h1 className='mb-5 text-4xl'>Welcome to Request Analyser </h1>
      <UrlGnerator />
      <HomeRoute />
    </>
  )
}

export default App
