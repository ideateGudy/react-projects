import ExtensionsList from './components/ExtensionsList'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <div className="max-h-screen w-full mx-auto mt-3 px-6 sm:px-20 lg:px-40 ">
      <Navbar />
      <ExtensionsList />
    </div>
    </>
  )
}

export default App
