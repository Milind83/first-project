import React, { useState, useEffect, useContext } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  PaginationComponent,
  DataTable,
} from "../../components/Component";
//import { UserContext } from "./UserContext";
import { connect } from 'react-redux'
import { fetchUsers,searchAdminUser } from '../../redux/user/action';
import ListPageHead from "../../components/SharedComponents/ListPageHead";
import TableBody from "../../components/SharedComponents/TableBody";
import TableHead from "../../components/SharedComponents/TableHead";
import { useHistory } from "react-router-dom";

const AdminUsersList = ({fetchUsers, userDataa, searchAdminUser}) => {
  const [sm, updateSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [sort, setSortState] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const history = useHistory();

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };
  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };
  
  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);
  // Get current list, pagination
 

  const TableHeadreFeilds = [{
    userId: "ID",
    fullName: "NAME",
    loginName: "LOGIN NAME",
    email: "EMAIL",
    userType: "TYPE",
    dateAdded: "DATE ADDED",
    dateModified: "LAST MODIFIED",
    lastLogin: "LAST LOGIN",
  }];
  let seachFeild = {
    fullName: "",
    id: "",
    email: "",
    userType: ""
  }

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
const list = () =>{
  fetchUsers(indexOfFirstItem,itemPerPage);

}
  useEffect(()=>{
    list();
  },[]);
  useEffect(()=>{
    list();
  },[currentPage]);
 
   const paginate = (pageNumber) => {
     setCurrentPage(pageNumber)
    };

    const editHandler = (editId) =>{
        alert(editId);
        history.push(`/admin-user-edit/${editId}`);
    }

    const searchHandler = async(data) =>{
       await searchAdminUser(data,indexOfFirstItem,itemPerPage);
    }
  

  const seachFeildType = {
    fullName: {
      tag: "input",
      type: "text"
    },
    id: {
      tag: "input",
      type: "number"
    },
    email: {
      tag: "input",
      type: "email"
    },
    userType: {
      tag: "dropdown",
      type: "",
      options: [
        {
            value: "admin",
            label: "admin"
        },
        {
          value: "upload",
          label: "upload"
        }
      ]
    },
  }

  return (
    <React.Fragment>
      <Head title="User List - Compact"></Head>
      <Content>
      <ListPageHead sm={sm} pageTitle="User List" plusURL="/admin-user-add" />
        <Block>
          <DataTable className="card-stretch">
            <TableHead searchHandler={searchHandler}  searchFieldData={seachFeild} seachFeildType={seachFeildType} reloadHandler = {list} />
            <TableBody data={userDataa} tableHeadreFeilds={TableHeadreFeilds} editHandler={editHandler}  />
            <div className="card-inner">
              {userDataa &&  userDataa.data?.rows.length > 0  ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={userDataa.data?.count ? userDataa.data?.count : []}
                  paginate={paginate}
                  currentPage={currentPage}
                 
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No data found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>
      
      </Content>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userDataa: state.user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: (offset,itemPerPage) => dispatch(fetchUsers(offset,itemPerPage)),
    searchAdminUser: (data, indexOfFirstItem,itemPerPage) => dispatch(searchAdminUser(data, indexOfFirstItem,itemPerPage))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminUsersList);
