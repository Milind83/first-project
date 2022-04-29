import React, { useState, useEffect, useContext } from "react";
import {
    Icon,
    Row,
    Col,
    Button,
    RSelect,
  } from "../../components/Component";
  import { Form } from "reactstrap";
  import { useForm } from "react-hook-form";
 

const TableHead = ({searchHandler, searchFieldData, seachFeildType, reloadHandler}) =>{
    const [tablesm, updateTableSm] = useState(false);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const [state, setState] = useState(searchFieldData)
    // const [name, setName]=useState("");
    // const[id, setId] = useState("");
    // const[email, setEmail] = useState("");
    // const[userType, setUserType] = useState("");

      const toggle = () => setonSearch(!onSearch);

      const handleSearch = () => {
        console.log(state);
        const formData = {
          name: state.fullName,
          id:state.id,
          email: state.email,
          userType: state.userType
        }
        
        searchHandler(state);
      }

      const keys = Object.keys(searchFieldData);
      const values = Object.values(searchFieldData);
      
      const onChangeHandler = (evt) =>{
        console.log(evt);
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }

      const OnRefreshHandler = () =>{
        setState(searchFieldData);
        reloadHandler();
      }

    return(
        <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
               <div className="card-tools"></div>
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <a
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle();
                        }}
                        className="btn btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </a>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    <li>
                      <div className="toggle-wrap">
                        <Button
                          className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
                          onClick={() => updateTableSm(true)}
                        >
                          <Icon name="menu-right"></Icon>
                        </Button>
                        <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <Button className="btn-icon btn-trigger toggle" onClick={() => updateTableSm(false)}>
                                <Icon name="arrow-left"></Icon>
                              </Button>
                            </li>
                         
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`card-search search-wrap ${!onSearch && "active"}`}>
             
                <div className="card-body">
                  <Row >

                   
                  <Col md="1">
                    <Button
                      className="search-back btn-icon toggle-search active"
                      onClick={() => {
                        setSearchText("");
                        toggle();
                      }}
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    </Col>

                    {
                      keys.map((field, i)=>{
                      
                        if(seachFeildType[field].tag === "input"){
                          return(
                            <Col md="2">
                            <input
                              type="text"
                              name={field}
                              className="form-control"
                              placeholder={field}
                              onChange={onChangeHandler}
                              value={state.field}
                              //onChange={(e) => onFilterChange(e)}
                            />
                            </Col> 
                          )
                        }
                         if(seachFeildType[field].tag === "dropdown"){
                         return(
                          <Col md="2">
                          <select name={field} class="form-control form-select" onChange={onChangeHandler}>
                          <option value="">Select</option>
                            {
                              seachFeildType[field].options.map((item)=>{
                                 return <option value={item.value}>{item.label}</option>
                              })
                            }
                             
                          </select>
                          </Col> 
                         )
                         
                        }
                      
                      })
                    }
                   
                  
                    <Col md="1">
                     <Button onClick={handleSearch} className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                    </Col>
                    <Col md="1">
                     <Button onClick={OnRefreshHandler} className="search-submit btn-icon">
                      <Icon name="reload"></Icon>
                    </Button>
                    </Col>
                  </Row>
                </div>
              
              </div>
            </div>
    );
}

export default TableHead;