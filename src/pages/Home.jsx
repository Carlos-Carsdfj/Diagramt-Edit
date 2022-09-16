import Diagram from '../compents/Canvas/Diagram'
function Home() {
  return (
    <div className='container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center text-center'>
      <h1 className='my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left'>
        DIAGRAM EDITOR
      </h1>
      <div className='w-full xl:w-4/5  overflow-hidden p-4 lg:p-4 '>
        <Diagram />
      </div>
    </div>
  )
}

export default Home
