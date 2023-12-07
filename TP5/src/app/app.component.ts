import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Produit } from './models/produit';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  login: string = '';
  password: string = '';
  erreurAuthentification: boolean = false;

  nom: string = '';
  prenom: string = '';
  cnx: boolean = false;
  produits$: Observable<Array<Produit>>;
  constructor(private apiService: ApiService) {
    this.produits$ = this.apiService.getCalague();
  }
  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe(
      (c) => {
        this.nom = c.nom;
        this.prenom = c.prenom;
        this.cnx = true;
        this.erreurAuthentification = false; // Réinitialise l'état d'erreur en cas de réussite
      },
      (erreur) => {
        console.error('Erreur d\'authentification : ', erreur);
        this.erreurAuthentification = true; // Définit l'état d'erreur en cas d'échec
      }
    );
  }
}
