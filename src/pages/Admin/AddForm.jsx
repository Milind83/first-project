import React, { useEffect} from "react";
import { Row, Col, FormGroup, Label, Form, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Icon } from "../../components/Component";
import classNames from "classnames";
import FormInput from "../../components/FormElements/FormInput";
import FormButton from '../../components/FormElements/FormButton';
import FormDropdown from "../../components/FormElements/FormDropdown";
import { connect } from "react-redux";
import { addUser, editUser } from '../../redux/user/action'
import LoadingSpinner from "../../components/Loader/Loader";
import AlertMessage from "../../components/SharedComponents/AlertMessage";
import { useHistory } from "react-router-dom";
//import { Form, FormGroup, Spinner, Alert } from "reactstrap";

const FormValidationComponent = ({ alter, id , addUser, editUser, loading, error, responseData,isEdit,userId,userData, props}) => {

  const history = useHistory();
  const { errors, register, handleSubmit, setValue, reset} = useForm();
  
  const onFormSubmit = async(data) => {
   
   if(isEdit){
     
    const requestData = {
      userType: data.user_type,
      fullName: data.name,
      email: data.email,
      loginName: data.login_name,
      addedBy:1,
      modifiedBy:1,
      status:1
   }
    await editUser(userId, requestData);
   }else{
    const requestData = {
      userType: data.user_type,
      fullName: data.name,
      email: data.email,
      password: data.password,
       varifyPassword: data.verify_password,
      loginName: data.login_name,
      addedBy:1,
      modifiedBy:1,
      status:1
   }
    await addUser(requestData);
   }

   if(responseData?.error === false){
    reset();
    history.push("/admin-user-list");
  }
  
  };

  useEffect(() => {
    if(responseData?.error === false){
      reset();
      history.push("/admin-user-list");
    }
}, [responseData?.error])

  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  const options = [
  {
      value: "admin",
      label: "admin"
  },
  {
    value: "upload",
    label: "upload"
  }
]

  return (
    <React.Fragment>
           { loading &&   <LoadingSpinner data-testid='Loading-test'/>}
           {error !== "" && (
             <AlertMessage isError={true} message={error} />
            )}
          {responseData?.message && (
             <AlertMessage isError={false} message={responseData?.message == 'undefined' ? "Smething went wrong please try again" : responseData?.message} />
              
            )}
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
         
        <Row className="g-gs">
        <Col md="6"  >
              <FormDropdown
                name="user_type"
                label="User Type"
                options={options}
                onChange={(e)=> setFormData({ ...formData, user_type: e.value })}
                refValue={register({ required: true })}
                defaultValue={isEdit ? userData?.results?.data[0]?.userType : ""}
                errors={errors.user_type}
               />
              
          </Col>
          <Col md="6">
              <FormInput
                name="name"
                label="Full Name"
                placeholder="full Name"
                errors={errors.name}
                refValue={register({ required: true })}
                defaultValue={isEdit ? userData?.results?.data[0]?.fullName : ""}
               />
          </Col>
          <Col md="6">
          <FormInput
                name="login_name"
                label="Login Name"
                placeholder="Login Name"
                errors={errors.login_name}
                refValue={register({ required: true })}
                defaultValue={isEdit ? userData?.results?.data[0]?.loginName : ""}
               />
       
          </Col>

          <Col md="6">
            {
              isEdit ? (
                <FormInput
                name="password"
                label="Password"
                placeholder="Password"
                errors={errors.password}
               />
              ):(
                <FormInput
                name="password"
                label="Password"
                placeholder="Password"
                errors={errors.password}
                refValue={register({ required: true })}
                
               />
              )
            }
          </Col>

          <Col md="6">
            {
              isEdit ? (
              <FormInput
                name="verify_password"
                label="Verify Password"
                placeholder="Verify Password"
                errors={errors.verify_password}
               // refValue={!isEdit ? register({ required: true }) : ""}
                //defaultValue="Namrata"
               />
              ):(
              <FormInput
                name="verify_password"
                label="Verify Password"
                placeholder="Verify Password"
                errors={errors.verify_password}
                refValue={register({ required: true })}
                //defaultValue="Namrata"
               />
              )
            }
          </Col>
          <Col md="6">
          <FormInput
                name="email"
                label="Email"
                placeholder="Email"
                errors={errors.email}
                refValue={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  defaultValue={isEdit ? userData?.results?.data[0]?.email : ""}
               />
          </Col>
          <Col md="12">
        <FormButton
        text="Save" />
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    responseData: state.user.addResponse,
    loading: state.user.loading,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    addUser: (data) => dispatch(addUser(data)),
    editUser: (id, data) => dispatch(editUser(id, data))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FormValidationComponent);
