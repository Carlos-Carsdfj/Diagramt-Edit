import { useState, useEffect } from 'react'
import Joyride from 'react-joyride'
const Guide = () => {
  const initStepsIntro = {
    run: false,
    steps: [
      {
        locale: {
          skip: <strong aria-label='skip'>SKIP</strong>,
          next: <strong aria-label='next'>siguiente</strong>,
        },
        placement: 'center',
        content: (
          <h2 className='my-4 text-1xl md:text-2xl text-black  font-bold leading-tight text-center md:text-left'>
            Bienvendio a Un util pero sencillo editor de diagramas
          </h2>
        ),
        target: 'body',
      },
      {
        locale: {
          skip: (
            <strong aria-label='skip' className='text-violet-900'>
              SKIP
            </strong>
          ),
          next: <strong aria-label='next'>siguiente</strong>,
          back: (
            <strong aria-label='next' className='#6d28d9'>
              anterior
            </strong>
          ),
        },
        target: '.diagram-background',
        content: (
          <p className='text-base leading-relaxed text-violet-900 '>
            Esta es tu mesa de trabajo los controles son basicos eintuitivos
            sientete libre de explorar
          </p>
        ),
      },
      {
        locale: {
          skip: (
            <strong aria-label='skip' className='text-violet-900'>
              SKIP
            </strong>
          ),
          next: <strong aria-label='next'>siguiente</strong>,
          back: (
            <strong aria-label='next' className='#6d28d9'>
              anterior
            </strong>
          ),
        },
        target: '.tools-diagram',
        content: (
          <p className='text-base leading-relaxed text-violet-900 '>
            Estas son tus opciones a elegir, arrastralas al diagrama para
            comenzar a usarlas{' '}
          </p>
        ),
      },
      {
        locale: {
          skip: (
            <strong aria-label='skip' className='text-violet-900'>
              SKIP
            </strong>
          ),
          next: <strong aria-label='next'>siguiente</strong>,
          back: (
            <strong aria-label='next' className='#6d28d9'>
              anterior
            </strong>
          ),
        },
        target: '.btn-to-share',
        content: (
          <p className='text-base leading-relaxed text-violet-900 '>
            Una vez terminado puedes compartir tu diagrama con un comodo link
            acortado
          </p>
        ),
      },
      {
        locale: {
          skip: (
            <strong aria-label='skip' className='text-violet-900'>
              SKIP
            </strong>
          ),
          next: <strong aria-label='next'>siguiente</strong>,
          back: (
            <strong aria-label='next' className='#6d28d9'>
              anterior
            </strong>
          ),
          last: <strong aria-label='next'>cerrar</strong>,
        },
        target: '.btn-to-print',
        content: (
          <p className='text-base leading-relaxed text-violet-900 '>
            Tambien puedes exportar tu diagrama como un svg e incluso guardar el
            mismo como pdf
          </p>
        ),
      },
    ],
  }
  const [stepsIntro, setStpsIntro] = useState(() => initStepsIntro)
  useEffect(() => {
    if (!window.localStorage.getItem('wasGuided')) {
      setStpsIntro((prev) => ({ ...prev, run: true }))
    }
  })
  const changeSteps = ({ status }) => {
    if (status === 'finished') {
      window.localStorage.setItem('wasGuided', 'yes')
      setStpsIntro((prev) => ({ ...prev, run: false }))
    }
  }

  return (
    <Joyride
      run={stepsIntro.run}
      steps={stepsIntro.steps}
      callback={changeSteps}
      continuous
      hideCloseButton
      scrollToFirstStep
      showProgress
      showSkipButton
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: ' #6d28d9',
        },
      }}
    />
  )
}
export default Guide
