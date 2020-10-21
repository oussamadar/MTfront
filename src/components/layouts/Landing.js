import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Landing extends Component {
  state = {
    links: [
      {
        id: 1,
        name: "Home",
        to: "/Home",
        className: "nav-link",
      },
      {
        id: 2,
        name: "Effectuer un Virement",
        to: "/Benefeciare",
        className: "nav-link",
      },
      {
        id: 3,
        name: "List des Virements",
        to: "/ListVirement",
        className: "nav-link",
      },
    ],
    activeLink: null,
  };

  handleClick = (id) => {
    this.setState({ activeLink: id });
  };

  render() {
    const { validToken, user } = this.props.security;
    const { links, activeLink } = this.state;
    const userIsAuthenticated = (
      <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
          <li class="nav-header">
            <div class="dropdown profile-element">
              <img
                alt="image"
                class="rounded-circle"
                src={require("../../assets/Adria-logo.png")}
                width="150"
              />
              <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                <span class="block m-t-xs font-bold">
                  {user.nom} {user.prenom}{" "}
                </span>
              </a>
            </div>
            <div class="logo-element">Adria</div>
          </li>
          {links.map((link) => (
            <li
              onClick={() => this.handleClick(link.id)}
              key={link.id}
              className={link.id === activeLink ? " active" : ""}
            >
              <Link className={link.className} to={link.to}>
                <i class="fa fa-home"></i>{" "}
                <span class="nav-label">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
    const userIsNotAuthenticated = <div></div>;

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav class="navbar-default navbar-static-side" role="navigation">
        {headerLinks}
      </nav>
    );
  }
}
const mapStateToProps = (state) => ({
  security: state.security,
});
export default connect(mapStateToProps)(Landing);
