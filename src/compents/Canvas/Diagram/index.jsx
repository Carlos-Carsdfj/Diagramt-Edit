import { useState, useContext } from 'react'
import { useEffect } from 'react'
import * as go from 'gojs'
import { goJsContext } from '../../../context/gojsContext'
import DiagramWrapper from './Wrapper'
import Modal from '../../Modal/index'
import shortLinks from '../../../services/shortLink'
import useCreateSvg from '../../../hooks/useCreateSvg'
const Diagram = () => {
  const { svgPrint } = useCreateSvg()
  const { diagram } = useContext(goJsContext)
  const initDiagram = {
    modelData: {
      canRelink: true,
    },
    selectedKey: null,
    skipsDiagramUpdate: false,
  }

  const [stateDiagram, setStateDiagram] = useState(initDiagram)
  const [showModal, setShowModal] = useState({ isShow: false, data: '' })
  useEffect(() => {
    const { search } = window.location
    if (search.length > 2) {
      try {
        const urlParams = new URLSearchParams(search)
        const shape = window.atob(urlParams.get('link'))
        diagram.model = go.Model.fromJson(shape)
      } catch (error) {
        alert('invalid url')
      }
    }
  }, [])
  const handleDiagramEvent = (e) => {
    const name = e.name
    if (name == 'ChangedSelection') {
      const sel = e.subject.first()
      if (sel) {
        setStateDiagram((prev) => {
          return { ...prev, selectedKey: sel.key }
        })
      } else {
        setStateDiagram((prev) => {
          return { ...prev, selectedKey: null }
        })
      }
    }
  }
  const handleModelChange = (obj) => {
    if (diagram.isModified) {
      const hashSvg = window.btoa(diagram.model.toJson())
      const { search } = window.location
      const urlParams = new URLSearchParams(search)
      const diagramParams = urlParams.get('diagram')
      const emailParams = urlParams.get('email')
      window.history.replaceState(
        null,
        null,
        `/?link=${hashSvg}&email=${emailParams ? emailParams : 'anonymous'}${
          diagramParams ? '&diagram=' + diagramParams : ''
        }`
      )
      diagram.isModified = false
    }
  }
  const toShare = async () => {
    const destination = window.location.href
    const link = await shortLinks(destination)
    if (link?.message) {
      console.log('link error :', link.message)
    } else {
      setShowModal({
        isShow: true,
        data: link,
      })
    }
  }

  const printDiagram = () => {
    let svgWindow = window.open()
    if (!svgWindow) return
    const svg = svgPrint()
    svgWindow.document.body.appendChild(svg)
    setTimeout(() => svgWindow.print(), 1)
  }
  const handleCloseModal = () => {
    setShowModal({
      isShow: false,
      data: '',
    })
  }

  return (
    <>
      <div className='mx-auto w-full bg-slate-100 h-[500px] m-0' role='panel'>
        <div className='w-full h-full relative'>
          <div className='absolute top-0 left-0 w-full  pt-1  flex flex-row-reverse z-10 '>
            <button
              type='button'
              className='btn-to-share text-white bg-gradient-to-r from-violet-500 via-vilet-600 to-violet-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              onClick={toShare}
            >
              to share{' '}
            </button>
            <button
              type='button'
              className='btn-to-print   text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              onClick={printDiagram}
            >
              print a svg{' '}
            </button>
          </div>
          <DiagramWrapper
            modelData={stateDiagram.modelData}
            skipsDiagramUpdate={stateDiagram.skipsDiagramUpdate}
            onDiagramEvent={handleDiagramEvent}
            onModelChange={handleModelChange}
          />
          {stateDiagram.selectedKey !== null && (
            <p>Selected key: {stateDiagram.selectedKey}</p>
          )}
        </div>
      </div>
      {showModal?.isShow && (
        <Modal toCloseModal={handleCloseModal} dataToShow={showModal.data} />
      )}
    </>
  )
}
export default Diagram
