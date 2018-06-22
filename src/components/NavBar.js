import React, {Component} from 'react'
import * as actions from "../actions";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import '../styles/Navbar.css'


class NavBar extends Component{
    constructor(props){
        super(props);
    }

    renderLogin() {
        if(this.props.userId !== null){
            return <button onClick={this.props.logOut}>LogOut</button>
        } else {
            return <Link to={`/login`} className={'link-login nav-link'}>
                        Login
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
                            {/*<span className={"container-fluid"}>*/}
                                {/*<img className={"logo"} src={'https://thumbs.dreamstime.com/z/job-search-logo-21089305.jpg'}/>*/}
                            {/*</span>*/}
                            {/*<span>*/}
                                Job Search Portal
                            {/*</span>*/}
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
                                <button className={"btn btn-outline-success my-2 my-sm-0"}
                                        type={"button"}
                                        onClick={()=>this.props.searchJobsByKeyword(this.props.searchText)}>
                                    Find Jobs
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={"col-md-4"}>
                        <button className={"navbar-toggler collapsed"} type={"button"} data-toggle={"collapse"}
                                data-target={"#navbarCollapse"} aria-controls={"navbarCollapse"} aria-expanded={"false"}
                                aria-label={"Toggle navigation"}>
                            <span className={"navbar-toggler-icon"}></span>
                        </button>
                        <div className={"navbar-collapse collapse"} id={"navbarCollapse"}>
                            <ul className={"navbar-nav mr-auto"}>
                                <li className={"nav-item active"}>
                                    <Link to={`/`} className={'link-login nav-link'}>
                                        Home
                                        <span className={"sr-only"}>(current)</span>
                                    </Link>
                                </li>
                                <li className={"nav-item"}>
                                    {this.renderLogin()}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }

}

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