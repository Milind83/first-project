import React from "react";
import { FormGroup, Label } from "reactstrap";
import PropTypes from 'prop-types'
import { RSelect } from '../../components/Component'


const FormDropdown = ({ 
    name,
    options,
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
    console.log("error");
    console.log(defaultValue);
    return(

      <FormGroup>
      <Label className="form-label" htmlFor="fv-topics">
      {label}<span style={{color: "#f3245f"}}> {refValue && "*"}</span>   
      </Label>
      <div className="form-control-wrap">
        <div className="form-control-select">
          <select
            ref={refValue}
            className={className}
            id={name}
            name={name}
            defaultValue={defaultValue}
            //placeholder={placeholder}
          >
             <option label="Select a topic" value=""></option>
            {
              options.map((item)=>{
                return(
                  <option key={item.value} value={item.value}>{item.label}</option>
                )
              })
            }
          
          </select>
          {errors  && <span className="invalid">This field is required</span>}
        </div>
      </div>
    </FormGroup>
    )
};

FormDropdown.defaultProps = {
    className: "form-control form-select"
}

FormDropdown.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
}

export default FormDropdown;