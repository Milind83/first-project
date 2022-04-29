import React from "react";
import { FormGroup, Label } from "reactstrap";
import PropTypes from 'prop-types'


const FormInput = ({ 
    name,
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
        <FormGroup>
        <Label className="form-label" htmlFor={name}>
          {label}<span style={{color: "#f3245f"}}> {refValue && "*"}</span>
        </Label>
        <div className="form-control-wrap">
          <textarea
            ref={refValue}
            type={type}
            id={name}
            name={name}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            defaultValue={defaultValue}
          />
          {errors && errors?.type === "required" && <span className="invalid">This is required</span>}
         
        </div>
      </FormGroup>
    )
};

FormInput.defaultProps = {
    type: "textarea",
    className: "form-control"
}

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['textarea']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
}

export default FormInput;