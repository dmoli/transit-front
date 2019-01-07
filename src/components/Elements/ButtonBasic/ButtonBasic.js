import React from 'react';
import PropTypes from 'prop-types';

/**
 * Elemento Input de texto básico
 */
const ButtonBasic = ({ ...props }) => (
  <button
    type={props.type}
    disabled={props.disabled}
    className={props.className}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

ButtonBasic.defaultProps = {
  type: 'submit',
  state: 'default',
  disabled: false,
  onClick: () => {},
};

ButtonBasic.propTypes = {
  /** estilos */
  className: PropTypes.string.isRequired,
  /** tipo de botón */
  type: PropTypes.string,
  /** estado desactivado */
  disabled: PropTypes.bool,
  /** click */
  onClick: PropTypes.func,
  /** elemento a mostrar */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default ButtonBasic;
