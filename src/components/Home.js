import React, { Component } from "react";
import Landing from "./layouts/Landing";
import SideBar from "./layouts/SideBar";

export default class Home extends Component {
  render() {
    return (
      <div class="ibox-content">
        <div class="float-right">
          <button class="btn btn-white btn-xs" type="button">
            EXPERTISE MÉTIER
          </button>
          <button class="btn btn-white btn-xs" type="button">
            DEVELOPPEMENT
          </button>
          <button class="btn btn-white btn-xs" type="button">
            MÉTHODES
          </button>
        </div>
        <div class="text-center article-title">
          <h1>À PROPOS</h1>
          <h1> QUI SOMMES-NOUS?</h1>
        </div>
        <p>
          <h2>
            Adria Business and Technology est un expert dans l’édition et
            l’intégration des logiciels destinés aux banques et institutions
            financières. Notre mission est d’accompagner les organisations
            financières dans leurs projets de digital banking en leur offrant
            des solutions performantes et des services à haute valeur ajoutée. À
            travers un fort investissement en recherche et développement, nous
            veillons à préserver la progression technologique de nos solutions
            et aider nos clients à faire face aux défis d’aujourd’hui et à
            s’approprier les défis de demain.
          </h2>
        </p>
        <hr />
        <div class="text-center m-t-md">
          <button class="btn-lg btn btn-outline-warning">NOS SOLUTIONS</button>
          &nbsp;&nbsp;
          <button class="btn-lg  btn btn-info">NOS VALEUR</button>
        </div>
      </div>
    );
  }
}
