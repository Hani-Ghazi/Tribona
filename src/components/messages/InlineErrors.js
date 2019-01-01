import React from 'react';
import PropsTypes from 'prop-types'

const InlineError = ({text, classes}) => <span className={`text-danger ${classes}`}>{text}</span>;


InlineError.propsTypes = {
  text: PropsTypes.string.isRequired,
  classes: PropsTypes.string
};

export default InlineError;