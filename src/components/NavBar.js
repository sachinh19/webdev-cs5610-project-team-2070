import React, {Component} from 'react'
import * as actions from "../actions";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import '../styles/Navbar.css'
import history from "../History";


class NavBar extends Component{
    constructor(props){
        super(props);
    }

    renderLogin() {
        if(this.props.userId !== null){
            return <span id={"logoutLink"}
                         className={"wbdv-link nav-link"}
                         onClick={this.props.logOut}>Logout</span>
        } else {
            return <Link to={`/login`} className={'wbdv-link nav-link'}>
                        Login
                        <span className={"sr-only"}>(current)</span>
                    </Link>
        }
    }

    renderRegisterProfile() {
        if(this.props.userId == null){
            return <Link to={`/register`} className={'wbdv-link nav-link'}>
                Register
                <span className={"sr-only"}>(current)</span>
            </Link>
        } else {
            return <Link to={`/profile`} className={'wbdv-link nav-link'}>
                Profile
                <span className={"sr-only"}>(current)</span>
            </Link>
        }
    }

    render(){
        let newSearchText
        return(
            <header className={"container-fluid"}>
                <nav className={"navbar navbar-expand-md navbar-dark fixed-top bg-dark row"}>
                    <div className={"col-md-2"}>
                        <a className={"navbar-brand"} href={"/"}>
                            <span>
                                Job Search Portal
                            </span>
                        </a>
                    </div>
                    <div className={"col-md-6"}>
                        <form className={"form-inline row"}>
                            <div className={"col-md-9"}>
                                <input className={"form-control wbdv-search-bar input-lg"}
                                       type={"text"} placeholder={"Enter keywords to search Jobs"}
                                       onChange={()=> this.props.searchTextChanged(newSearchText.value)}
                                       ref={node => newSearchText=node}
                                       aria-label={"Search"}/>
                            </div>
                            <div className={"col-md-3"}>
                                <button className={"btn btn-outline-success"}
                                        type={"button"}
                                        onClick={()=>{
                                            this.props.searchJobsByKeyword(this.props.searchText)
                                            history.push('/search');
                                        }}>
                                    <span className={"text-center"}>
                                    Find Jobs
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={"col-md-4"}>
                        <div className={"navbar"} id={"navbarCollapse"}>
                            <ul className={"navbar-nav"}>
                                <li className={"nav-item"}>
                                    <Link to={`/`} className={'wbdv-link nav-link'}>
                                        Home
                                        <span className={"sr-only"}>(current)</span>
                                    </Link>
                                </li>
                                <li className={"nav-item"}>
                                    {this.renderLogin()}
                                </li>
                                <li className={"nav-item"}>
                                    {this.renderRegisterProfile()}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }

}

//     render(){
//         let newSearchText
//         return(
//                     <nav className={"navbar navbar-expand-lg navbar-dark fixed-top bg-dark row"}>
//                         <a className={"navbar-brand col"} href={"/"}>
//                                 Job Search Portal
//                         </a>
//                         <button className="navbar-toggler" type="button" data-toggle="collapse"
//                                 data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
//                                 aria-label="Toggle navigation">
//                             <span className="navbar-toggler-icon"></span>
//                         </button>
//                     <div className={"collapse navbar-collapse col"} id={"navbarColor01"}>
//                         <form className={"form-inline col"}>
//                             <div className={"col-md-9"}>
//                                 <input className={"form-control wbdv-search-bar input-lg"}
//                                        type={"text"} placeholder={"Enter keywords to search Jobs"}
//                                        onChange={()=> this.props.searchTextChanged(newSearchText.value)}
//                                        ref={node => newSearchText=node}
//                                        aria-label={"Search"}/>
//                             </div>
//                             <div className={"col-md-3"}>
//                                 <button className={"btn btn-outline-success"}
//                                         type={"button"}
//                                         onClick={()=>{
//                                             this.props.searchJobsByKeyword(this.props.searchText)
//                                             history.push('/search');
//                                         }}>
//                                     <span className={"text-center"}>
//                                     Find Jobs
//                                     </span>
//                                 </button>
//                             </div>
//                         </form>
//                             <ul className={"navbar-nav mr-auto"}>
//                                 <li className={"nav-item"}>
//                                     <Link to={`/`} className={'wbdv-link nav-link'}>
//                                         Home
//                                         <span className={"sr-only"}>(current)</span>
//                                     </Link>
//                                 </li>
//                                 <li className={"nav-item"}>
//                                     {this.renderLogin()}
//                                 </li>
//                                 <li className={"nav-item"}>
//                                     {this.renderRegisterProfile()}
//                                 </li>
//                             </ul>
//                     </div>
//                 </nav>
//         )
//     }
//
// }



const stateToPropertyMapper = (state) => ({
    userId:localStorage.getItem('id'),
    searchText: state.JobsReducer.searchText
})

export const dispatcherToPropsMapper = (dispatch) => ({
    searchTextChanged: (newText)=> {actions.searchTextChanged(dispatch,newText)},
    logOut: () => actions.logOut(dispatch),
    searchJobsByKeyword: (searchText) => {actions.searchJobsByKeyword(dispatch, searchText)}
})

const NavBarContainer = connect(stateToPropertyMapper, dispatcherToPropsMapper)(NavBar)

export default NavBarContainer