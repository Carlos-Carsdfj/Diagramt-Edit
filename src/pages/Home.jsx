import { useForm } from 'react-hook-form'
import Diagram from '../compents/Canvas/Diagram'
function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {}

  return (
    <div className='container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center text-center'>
      <h1 className='my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left'>
        DIAGRAM EDITOR
      </h1>
      <div className='w-full xl:w-4/5  overflow-hidden p-4 lg:p-4 '>
        <Diagram />
        <div className=' text-left'>
          <form
            className='w-full flex flex-col gap-2 px-2 mt-11'
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor='title'>Diagram Title</label>
            <input
              type='text'
              {...register('Title', { required: true })}
              id='title'
            />
            <label htmlFor='problem'>Problem to resolve</label>
            <textarea
              className='h-[140px] resize-none'
              {...register('Problem', { required: true })}
              id='problem'
            />
            <label htmlFor='solution'>Solution by Diagram </label>
            <textarea
              className='h-[140px] resize-none'
              {...register('Solution', { required: true })}
              id='solution'
            />
            <label htmlFor='comment'>Comment</label>
            <textarea
              className='h-[140px] resize-none'
              {...register('Comment', {})}
              id='comment'
            />
            <input type='submit' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
