import React, { Component } from "react";
import { getBenef } from "../../actions/beneficiareActions";
import { connect } from "react-redux";
import VirementMultipe, { getListBenef } from "./VirementMultipe";
import Beneficiare from "./Beneficiare";
import classnames from "classnames";

class ListBeneficiare extends Component {
  constructor() {
    super();
    this.state = {
      benefVirement: [],
      benefexist: [],
      errors: {},
    };
    this.AddBenfVirement = this.AddBenfVirement.bind(this);
    this.DeleteBenfVirement = this.DeleteBenfVirement.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //Ajouter Un Beneficiare
  AddBenfVirement(benef) {
    //verifier si ce benef existe ou pas
    let exits = this.state.benefexist.indexOf(benef.id);
    if (exits == -1) {
      var env = { montant: 0, beneficiare: benef };
      this.state.benefVirement.push(env);
      //utiliser filtre(toujour just ) pour faire une opera sur benef est que le component Virment Multipe march
      this.setState({
        benefVirement: this.state.benefVirement.filter((i) => i.id !== "-1"),
      });
      this.state.benefexist.push(benef.id);
    } else {
      alert("ce Beneficaire exist déja");
    }
    //Send List des beneficiare au Component de virment multipe pour nevoyer tous les donnes du virement
  }

  //Supprimer Un Benef
  DeleteBenfVirement(benef) {
    //Supprimer Benf Selectionner
    this.setState({
      benefVirement: this.state.benefVirement.filter(
        (i) => i.beneficiare.id !== benef.beneficiare.id
      ),
    });
    //Supprime Id dans le tableau pour qu on peux l ajouter une autre fois
    this.setState({
      benefexist: this.state.benefexist.filter(
        (items) => items !== benef.beneficiare.id
      ),
    });
  }

  componentDidMount() {
    this.props.getBenef();
  }

  render() {
    let benef = Array.from(this.props.beneficiare.beneficiares);
    const { errors } = this.state;
    return (
      <div>
        <div class="row">
          <div class="col-lg-6">
            <div class="ibox ">
              <div class="ibox-title">
                <h5>Choisir le béneficiare </h5>
              </div>
              <div class="ibox-content">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Identifiant</th>
                      <th>Numero de Compte </th>
                      <th>Nom et Prenom </th>
                      <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {benef.map((benef) => (
                      <tr key={benef.id}>
                        <td>{benef.id}</td>
                        <td>
                          <span class="pie">{benef.numeroCompte}</span>
                        </td>
                        <td>
                          {benef.nom} {benef.prenom}{" "}
                        </td>
                        <td class="text-navy">
                          <button
                            className="btn btn-primary "
                            type="submit"
                            onClick={(e) => this.AddBenfVirement(benef)}
                          >
                            <i class="fa fa-money"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="ibox ">
              <div class="ibox-title">
                <h5>Beneficiare des virements</h5>
              </div>
              <div class="ibox-content">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Identifiant</th>
                      <th>Benficiare(Nom et Prenom)</th>
                      <th>Montant</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.benefVirement.map((benef) => (
                      <tr key={benef.beneficiare.id}>
                        <td>{benef.beneficiare.id}</td>
                        <td>
                          <span class="pie">
                            {benef.beneficiare.nom} {benef.beneficiare.prenom}{" "}
                          </span>
                        </td>
                        <td>
                          <input
                            type="number"
                            name="montant"
                            className={classnames("form-control", {
                              "is-invalid": errors.montant,
                            })}
                            onChange={(e) => {
                              benef.montant = e.target.value;
                            }}
                            placeholder="0"
                          ></input>
                          {benef.montant <= 0 && (
                            <div className="invalid-feedback">
                              Saisi un nombre superiuer a 0
                            </div>
                          )}
                        </td>
                        <td class="text-navy">
                          <button
                            className="btn btn-danger "
                            type="button"
                            onClick={(e) => this.DeleteBenfVirement(benef)}
                          >
                            <i class="fa fa-money"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight ecommerce">
          <VirementMultipe items={this.state.benefVirement} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  beneficiare: state.beneficiare,
  errors: state.errors,
});
export default connect(mapStateToProps, { getBenef })(ListBeneficiare);
