import React, { Component } from "react";
import { getCompte } from "../../actions/compteActions";
import { connect } from "react-redux";
import Beneficiare from "./Beneficiare";
import { postVirement, postPass } from "../../actions/virementActions";
import classnames from "classnames";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
class VirementMultipe extends Component {
  constructor(props) {
    super(props);
    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var dateExe = curr.toISOString().substr(0, 10);
    this.state = {
      motif: String,
      montant: Number,
      nombrBeneficiare: Number,
      dateExce: dateExe,
      numeroCompte: String,
      errors: {},
      show: false,
      verificationPass: "",
    };
    this.SendVirement = this.SendVirement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    //pour la figure s affiche meme si en ecri
    if (e.target.name == "verificationPass") {
      this.setState({ show: true });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.props.items.length == 0) {
      alert("Selectionnez des Benefeciares");
      return;
    }
    const VirementRequest = {
      motif: this.state.motif,
      status: "Signe",
      montant: this.state.montant,
      dateExce: this.state.dateExce,
      compte: {
        numeroCompte: this.state.numeroCompte,
      },
      virementMultipe: {
        nombrBeneficiare: this.state.nombrBeneficiare,
        virementMultipeBenificiareList: this.props.items,
      },
    };
    this.props.postVirement(VirementRequest);
    if (Object.entries(this.state.errors).length !== 0) {
      this.state.show = false;
      return;
    }
    if (this.state.errors.show === true) {
      this.setState({ show: true });
    }
  }

  SendVirement(e) {
    e.preventDefault();
    const verificationPass = { verificationPass: this.state.verificationPass };
    this.props.postPass(verificationPass);
  }
  componentDidMount() {
    this.props.getCompte();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  toggle() {
    this.setState({ show: false });
    this.state.errors.show = false;
  }
  render() {
    let compte = Array.from(this.props.compte.comptes);
    var curr = new Date();
    var date = curr.toISOString().substr(0, 10);

    const { errors } = this.state;
    if (errors.show === true || errors.password) {
      this.state.show = true;
    }
    if (errors.show === false) {
      this.state.show = false;
    }

    return (
      <div class="ibox-content m-b-sm border-bottom">
        <form onSubmit={this.onSubmit}>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-form-label" for="order_id">
                  Choisir un Compte
                </label>
                <select
                  class="form-control-sm form-control input-s-sm inline"
                  name="numeroCompte"
                  value={this.state.value}
                  onChange={this.onChange}
                  required
                >
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>
                  {compte.map((compte) => {
                    return (
                      <option key={compte.id} value={compte.numeroCompte}>
                        {compte.numeroCompte}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-form-label" for="status">
                  Motif
                </label>
                <input
                  type="text"
                  id="status"
                  name="motif"
                  placeholder="Vrm Mult"
                  class="form-control"
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-form-label" for="customer">
                  Nombre de bénéficiare
                </label>
                <input
                  type="number"
                  id="customer"
                  name="nombrBeneficiare"
                  placeholder="0"
                  className={classnames("form-control", {
                    "is-invalid": errors.virementMultipe,
                  })}
                  onChange={this.onChange}
                  required
                />
                {this.props.items.length !== this.state.nombrBeneficiare && (
                  <div className="invalid-feedback">
                    Verifier Nombre benefeciare{" "}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-form-label" for="date_added">
                  Date de création
                </label>
                <div class="input-group date">
                  <input
                    id="date_added"
                    type="date"
                    class="form-control"
                    value={date}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-form-label" for="date_modified">
                  Date d'exécution
                </label>
                <div class="input-group date">
                  <input
                    name="dateExce"
                    type="date"
                    className={classnames("form-control", {
                      "is-invalid": errors.dateExce,
                    })}
                    value={this.state.dateExce}
                    onChange={this.onChange}
                    required
                  />
                  {errors.dateExce && (
                    <div className="invalid-feedback">{errors.dateExce}</div>
                  )}
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label class="col-form-label" for="amount">
                  Montant
                </label>
                <input
                  type="number"
                  name="montant"
                  placeholder="0"
                  className={classnames("form-control", {
                    "is-invalid": errors.montant,
                  })}
                  onChange={this.onChange}
                  required
                />
                {errors.montant && (
                  <div className="invalid-feedback">{errors.montant}</div>
                )}
              </div>
            </div>
            <div class="col-sm-12" align="right">
              <button type="submit" class="btn btn-outline btn-danger dim">
                Enregistrer
              </button>
            </div>
          </div>
        </form>
        <Modal isOpen={this.state.show} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Type your Password </ModalHeader>
          <form onSubmit={this.SendVirement}>
            <ModalBody>
              <Input
                name="verificationPass"
                type="password"
                onChange={this.onChange}
                className={classnames("form-control", {
                  "is-invalid": errors.password,
                })}
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Send</Button>
              <Button color="secondary" type="reset">
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  compte: state.compte,
  errors: state.errors,
});

export default connect(mapStateToProps, { getCompte, postVirement, postPass })(
  VirementMultipe
);
