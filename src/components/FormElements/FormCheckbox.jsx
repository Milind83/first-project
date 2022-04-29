import React from "react";
import { FormGroup, Label } from "reactstrap";
import PropTypes from 'prop-types'


const FormCheckbox = ({ 
    name,
    id,
    type,
    placeholder,
    onChange,
    className,
    value,
    errors,
    children,
    label,
    refValue,
    defaultValue,
...props
}) =>{
    console.log(errors);
    return(
        <div className="custom-control custom-checkbox">
        <input
          ref={refValue}
          type={type}
          className={className}
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
        />
        <Label className="custom-control-label" htmlFor={id}>
         {label}
        </Label>
        {errors && (
          <span id="fv-com-error" className="invalid">
            This field is required
          </span>
        )}
      </div>
   
    )
};

FormCheckbox.defaultProps = {
    type: "checkbox",
    className: "form-control custom-control-input"
}

FormCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['checkbox']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
}

export default FormCheckbox;