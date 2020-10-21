import React, { Component } from "react";
import { getVirement } from "../../actions/virementActions";
import { getCompte } from "../../actions/compteActions";
import { connect } from "react-redux";

class ListVirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      motif: "",
      montant: "",
      montantMax: "",
      dateCre: "",
      status: "",
      numeroCompte: "",
      ListVirement: [],
      ListResult: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getVirement();
    this.props.getCompte();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    //utiliser filtre(toujour just ) pour faire une opera sur benef est que le component Virment Multipe march
    this.prepareData();
  }
  prepareData() {
    this.state.ListVirement = Array.from(this.props.virement.virements);
    if (this.state.dateCre !== "") {
      this.state.ListVirement = this.state.ListVirement.filter(
        (i) => i.dateCre == this.state.dateCre
      );
    }

    if (this.state.montant !== "") {
      this.state.ListVirement = this.state.ListVirement.filter(
        (i) => String(i.montant).indexOf(this.state.montant) == 0
      );
    }
    if (this.state.motif !== "") {
      this.state.ListVirement = this.state.ListVirement.filter(
        (i) => String(i.motif).indexOf(this.state.motif) == 0
      );
    }
    if (this.state.status !== "") {
      this.state.ListVirement = this.state.ListVirement.filter(
        (i) => String(i.status).indexOf(this.state.status) == 0
      );
    }
    if (this.state.ListVirement.length == 0) {
      this.state.ListVirement = [];
    }
  }
  render() {
    let compte = Array.from(this.props.compte.comptes);
    this.prepareData();
    return (
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox ">
            <div class="ibox-title">
              <h5>List des Virements </h5>
            </div>
            <div class="ibox-content">
              <div class="row">
                <div class="col-sm-2 m-b-xs">
                  <label class="col-form-label" for="date_modified">
                    Choisir un Compte
                  </label>
                  <select
                    class="form-control-sm form-control input-s-sm inline"
                    onChange={this.onChange}
                  >
                    <option value="" selected>
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
                <div class="col-sm-2 m-b-xs">
                  <label class="col-form-label" for="date_modified">
                    Date de creation
                  </label>
                  <div class="input-group date">
                    <input
                      name="dateCre"
                      type="date"
                      class="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div class="col-sm-2 m-b-xs">
                  <label class="col-form-label" for="date_modified">
                    Montant
                  </label>
                  <div class="input-group date">
                    <input
                      name="montant"
                      type="number"
                      class="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div class="col-sm-2 m-b-xs">
                  <label class="col-form-label" for="date_modified">
                    Montant Max
                  </label>
                  <div class="input-group ">
                    <input
                      name="montant"
                      type="number"
                      class="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div class="col-sm-2 m-b-xs">
                  <label class="col-form-label" for="date_modified">
                    Motif
                  </label>
                  <div class="input-group date">
                    <input
                      name="motif"
                      type="text"
                      class="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div class="col-sm-2 m-b-xs">
                  <label class="col-form-label" for="date_modified">
                    Status
                  </label>
                  <div class="input-group date">
                    <input
                      name="status"
                      type="text"
                      class="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <table class="table table-hover dataTables-example">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Date de création</th>
                      <th>Compte</th>
                      <th>Montant</th>
                      <th>Motif</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.ListVirement.map((virement) => (
                      <tr key={virement.id} class="gradeU">
                        <td>{virement.id}</td>
                        <td>{virement.dateCre}</td>
                        <td>
                          {virement.compte.numeroCompte}{" "}
                          {virement.compte.abonneLeader}
                        </td>

                        <td class="center">{virement.montant}</td>
                        <td class="center">{virement.motif}</td>
                        <td class="center">{virement.status}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Id</th>
                      <th>Date de création</th>
                      <th>Compte</th>
                      <th>Montant</th>
                      <th>Motif</th>
                      <th>Status</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  virement: state.virement,
  compte: state.compte,
});
export default connect(mapStateToProps, { getVirement, getCompte })(
  ListVirement
);
