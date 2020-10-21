import React, { Component } from "react";
import { logout } from "../../actions/securityActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class SideBar extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation">
          <div class="navbar-header">
            <span
              class="navbar-minimalize minimalize-styl-2 btn btn-primary "
              href="#"
            >
              <i class="fa fa-bars"></i>{" "}
            </span>
          </div>
          <ul class="nav navbar-top-links navbar-right">
            <li>
              <img
                alt="image"
                src={require("../../assets/Adria-logo.png")}
                width="100"
              />
            </li>

            <li onClick={this.logout.bind(this)}>
              <Link to="/login">
                <i class="fa fa-sign-out"></i> Log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
    const userIsNotAuthenticated = <div></div>;

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return <div>{headerLinks}</div>;
  }
}
const mapStateToProps = (state) => ({
  security: state.security,
});
export default connect(mapStateToProps, { logout })(SideBar);
