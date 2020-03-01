import React from 'react'
import PropTypes from 'prop-types'
/**
 * Component that handles the changes on an array
 * For each object inside array prop this component will 
 * render a children with some usefull props
 * like the values correspondent to its position in array,
 * a onValuesChange that is a function that you pass the 
 * all values already updated, a selfDestroy function that 
 * removes it from the array.
 */
const ArrayInput = ({ array, onValueChange, children, ...props }) => {
  const onValueChangeByIndex = index => values => {
    const newValues = [...array]
    newValues[index] = values
    onValueChange(newValues)
  }
  const _removeByIndex = index => () => {
    const newValues = [...array]
    newValues.splice(index, 1)
    onValueChange(newValues)
  } 

  return <React.Fragment>
    {
      array.map((values, index) => children({
        key: index,
        index: index,
        values,
        selfDestroy: _removeByIndex(index),
        onValuesChange: onValueChangeByIndex(index),
        ...props
      }))
    }
  </React.Fragment>
}
ArrayInput.propTypes = {
  array: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired,
  children: PropTypes.element.children.isRequired
}
export default ArrayInput
