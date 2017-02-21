import React, { Component, PropTypes } from 'react'
import { divIcon } from 'leaflet'
import { FeatureGroup } from 'react-leaflet'
import along from 'turf-along'

import ControlPoint from './ControlPoint'

export default class ControlPointsLayer extends Component {
  static propTypes = {
    stops: PropTypes.array,
    handlePatternEdit: PropTypes.func,
    polyline: PropTypes.object,
    handleControlPointDragEnd: PropTypes.func,
    onDrag: PropTypes.func,
    removeControlPoint: PropTypes.func
  }
  getPrevious (index, controlPoints, pattern) {
    const prevControlPoint = controlPoints[index - 1]
    return prevControlPoint
      ? prevControlPoint.point
      : along(pattern.shape, 0, 'meters')
  }
  getNext (index, controlPoints) {
    const nextControlPoint = controlPoints[index + 1]
    if (nextControlPoint) {
      return nextControlPoint.point
    } else {
      return null
    }
  }
  render () {
    const {
      stops,
      activePattern,
      editSettings,
      controlPoints
    } = this.props
    return (
      <FeatureGroup ref='controlPoints' key='controlPoints'>
        {stops && activePattern && activePattern.shape && editSettings.editGeometry && controlPoints
          ? controlPoints.map((cp, index) => {
            // don't include controlPoint on end of segment (for now) or hidden controlPoints
            if (cp.stopId && editSettings.snapToStops) {
              return null
            }
            const position = cp.point
            const color = cp.permanent ? '#000' : '#888'
            const iconType = cp.stopId ? 'fa-square' : 'fa-times'
            if (!position || !position.geometry || !position.geometry.coordinates) {
              return null
            }
            const icon = divIcon({
              className: '',
              html: `<i class="fa ${iconType}" style="color: ${color}"/>`
            })
            return (
              <ControlPoint
                position={[position.geometry.coordinates[1], position.geometry.coordinates[0]]}
                icon={icon}
                key={`controlPoint-${index}`}
                index={index}
                permanent={cp.permanent}
                previous={this.getPrevious(index, controlPoints, activePattern)}
                next={this.getNext(index, controlPoints)}
                {...this.props}
              />
            )
          })
          : null
        }
      </FeatureGroup>
    )
  }
}
