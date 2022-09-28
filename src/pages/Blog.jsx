import { useState } from 'react'
import { comments } from '../data'
import { getAllDiagrams } from '../utils/firebase/initServices'
function Blog() {
  const [textToSearch, setTextToSearch] = useState(() => '')

  return (
    <section className='text-center w-full h-screen pt-4'>
      <input
        id='inputSearch'
        type='text'
        className='outline-none  w-1/3'
        value={textToSearch}
        onChange={(e) => setTextToSearch(e.target.value)}
      />
      <div className='w-full h-full flex flex-col  justify-start items-center pt-5'>
        <button onClick={() => getAllDiagrams()}>Leer</button>
        <div className='w-3/5 h-full z-10 relative border-2 border-slate-900/70  bg-transparent shadow-2xl overflow-y-auto shadow-black    rounded-md '>
          {comments.map((info) => (
            <a href={info.url} key={info.title}>
              <article className='flex gap-2 justify-items-stretch my-2     text-left text-white  items-stretch'>
                <img src={info.imgUrl} />
                <div>
                  <h2 className='font-bold text-xl mb-1  text-tras capitalize'>
                    {info.title}
                  </h2>
                  <p className='first-letter:uppercase'>
                    <strong>BY :</strong> {info.user}{' '}
                  </p>
                  <p>
                    <strong>PROBLEM :</strong>
                    {info.problem}
                  </p>
                  <p>
                    <strong>SOLUTION :</strong>
                    {info.solution}
                  </p>
                  <p>
                    <strong>IMPORTANTS :</strong> {info.importanSteps}
                  </p>
                  <p>
                    <strong>ADDITIONAL :</strong>
                    {info.comment}
                  </p>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
