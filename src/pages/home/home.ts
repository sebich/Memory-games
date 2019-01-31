import { Component } from '@angular/core';
import { NavController, Footer } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private cardDeck = [];

  private numberOfCards = 6;

  private questionMarkUrl = "assets/imgs/question-mark.png";

  private timetoHide = 500;

  private previousCard = null;

  private previousCardIndex;

  private revealingCard = false;

  private numberOfRevealedCards = 0;

  constructor(public navCtrl: NavController) {
    //Appel de la fonction (4)
    this.generateDeck();
    //Appel de la fonction (8)
    this.shuffleCards();
  }

  //Création de la pile de cartes (1)
  generateDeck() {
    for (let i = 0; i < this.numberOfCards; i++) {
      this.generateCardPair(i);
    }
  }

  // Création de la carte(2)
  generateOneCard(pos) {
    this.cardDeck.push(
      {
        activeImage: this.questionMarkUrl,
        cardImage: "assets/imgs/cards/" + pos + ".png",
        revealed: false
      }
    );
  }
  // création de la paire de carte(3)
  generateCardPair(pos) {
    for (let k = 1; k <= 2; k++) {
      this.generateOneCard(pos);
    }
  }

  //Mélange des cartes (5)
  shuffleCards() {
    //Boucle pour chaque indice
    for (let position in this.cardDeck) {
      //Définition d'une position aléatoire (6)
      let radomPosition = Math.floor(Math.random() * this.cardDeck.length);

      //Permutation des deux positions (position et radomPosition)(7)
      // avec création d'un var temporaire (tmp)
      let tmp = this.cardDeck[position];
      this.cardDeck[position] = this.cardDeck[radomPosition];
      this.cardDeck[radomPosition] = tmp;
    }
  }
  //choix d'une carte
  pickCard(card, pos) {
    //Affichage de la carte uniquement si celle-ci n'est pas
    // déjà révélée
    if (!card.revealed && !this.revealingCard) {

      //test de la précedente
      if (this.previousCard
        && (this.previousCardIndex != pos)
        && (this.previousCard.cardImage == card.cardImage)) {
        card.activeImage = card.cardImage;
        card.revealed = true;
        //Affichage des deux cartes
        this.previousCard.activeImage = card.cardImage;
        this.previousCard.revealed = true;

        //Incrementation du nbre de paire trouvées
        this.numberOfRevealedCards++;
      } else {
        //Enregistrement de la carte pour plus tard
        this.previousCard = card;
        this.previousCardIndex = pos;

        this.revealCard(card);
      }


    }

  }

  revealCard(card) {
    //affichage de la carte
    card.activeImage = card.cardImage;
    card.revealed = true;



    let questionImage = this.questionMarkUrl;

    this.revealingCard = true;

    //masquage de la carte au bout d'un certain délai
    setTimeout(
      () => {
        card.revealed = false;
        card.activeImage = questionImage;
        this.revealingCard = false;
      },
      this.timetoHide
    );


  }

}
