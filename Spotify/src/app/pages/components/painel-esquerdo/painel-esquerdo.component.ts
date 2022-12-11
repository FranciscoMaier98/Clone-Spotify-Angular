import { Component, OnInit } from '@angular/core';
import { faHome, faSearch, faGuitar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  menuSelecionado = 'Home';

  //Ícones
  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;

  constructor() { }

  ngOnInit(): void {
  }

  botaoClick(botao: string) {
    this.menuSelecionado = botao;
  }

}
