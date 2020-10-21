import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(LoginRequest);
  }
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/Home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/Home");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="middle-box text-center loginscreen  animated fadeInDown">
        <div>
          <div>
            <img
              alt="image"
              src={require("../../assets/Adria-logo.png")}
              width="150"
            />
          </div>
          <h3>ADRIA BUSINESS & TECHNOLOGY</h3>
          <p>
            VOTRE PARTENAIRE POUR LA TRANSFORMATION VERS LA BANQUE DIGITALE
          </p>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.username,
                })}
                placeholder="username"
                name="username"
                onChange={this.onChange}
                required
              ></input>

              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password,
                })}
                placeholder="password"
                onChange={this.onChange}
                required
              />

              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <input
              type="submit"
              value="Login"
              className="btn btn-primary block full-width m-b"
            />
          </form>

          <p className="m-t">
            {" "}
            <small>ADRIA BUSINESS & TECHNOLOGY &copy; 2020</small>{" "}
          </p>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});
export default connect(mapStateToProps, { login })(Login);
