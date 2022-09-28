import { useContext } from 'react'
import * as go from 'gojs'
import { goJsContext } from '../context/gojsContext'
const useCreateSvg = () => {
  const { diagram } = useContext(goJsContext)
  const svgPrint = () => {
    const svgDiv = document.createElement('div')
    var printSize = new go.Size(700, 960)
    let bnds = diagram.documentBounds
    let x = bnds.x
    let y = bnds.y
    while (y < bnds.bottom) {
      while (x < bnds.right) {
        let svg = diagram.makeSvg({
          scale: 1.0,
          position: new go.Point(x, y),
          size: printSize,
        })
        svgDiv.appendChild(svg)
        x += printSize.width
      }
      x = bnds.x
      y += printSize.height
    }
    return svgDiv
  }
  const imgPrint = () => {
    return diagram.makeImageData({
      background: '#ede0dd',
      size: new go.Size(500, NaN),
    })
  }
  return { svgPrint, imgPrint }
}

export default useCreateSvg
