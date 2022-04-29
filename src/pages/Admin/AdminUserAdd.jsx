import React, {useState, useEffect} from "react";
import {
  Block,
  BlockDes,
  PreviewCard,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BackTo,
} from "../../components/Component";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import AddForm from  "./AddForm";
import { connect } from 'react-redux'
import { getUserById } from '../../redux/user/action';

import {useParams,
} from "react-router-dom";

const FormValidation = ({getUserById, userDataa}) => {
  const { userId } = useParams();
  const [isEdit, setIsEdit] = useState(typeof userId !== 'undefined' ? true : false);
  useEffect(async()=>{
    if(typeof userId !== 'undefined'){
      await getUserById(userId);
    }
  },[isEdit]);


  return (
    <React.Fragment>
      <Head title="Form Validation"></Head>
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">{ isEdit ? "Edit Admin User" : "Add Admin User"}
                </BlockTitle>
              <BlockDes>
                <p>FIELD WITH (<span style={{color: "#f3245f"}}>*</span>) ARE MANDATORY </p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <AddForm id="form-2" alter isEdit={isEdit} userId={userId} userData={userDataa} />
          
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userDataa: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserById: (id) => dispatch(getUserById(id)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(FormValidation);
