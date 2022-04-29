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
       <React.Fragment>
          {
            type === "hidden" &&(
          <input
            ref={refValue}
            type={type}
            id={name}
            name={name}
            className={className}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
          />
            )
          }

        {
            type !== "hidden" &&(
              <FormGroup>
             <Label className="form-label" htmlFor={name}>
          {label}<span style={{color: "#f3245f"}}> {refValue && "*"}</span>
        </Label>
        <div className="form-control-wrap">
          <input
            ref={refValue}
            type={type}
            id={name}
            name={name}
            className={className}
            placeholder={placeholder}
            defaultValue={defaultValue}
           
            onChange={onChange}
          />
          {errors && errors.type === "required" && <span className="invalid">This is required</span>}
          {errors && errors.type === "pattern" && (
                  <span className="invalid">{errors.message}</span>
            )}
        </div>
        </FormGroup>
            )
          }
        
      </React.Fragment>
    )
};

FormInput.defaultProps = {
    type: "text",
    className: "form-control"
}

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'password', 'email','hidden']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
}

export default FormInput;