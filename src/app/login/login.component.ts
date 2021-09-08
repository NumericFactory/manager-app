import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private loginSvc: LoginService,
    private router: Router,
    private notif: MatSnackBar
  ) { }

  ngOnInit(): void {
    /*
      On initiatlise un formulaire de type réactive form
      - en lui assignant en valeur, une instance de FormGroup()
      - puis en instanciant chaque élement de formulaire avec une instance de FormControl
      - On peut si on le souhaite spécifier une validation pour un champ à l'aide de la classe Validators

       Le modèle loginForm ci-dessous est liée dans la VUE HTML grâce :
      -> à la directive formGroup qui relie le formulaire
      -> à la directive formControlName qui relie Les propriétés du formulaire
    */
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.minLength(5), Validators.maxLength(7), Validators.required])
    })

  }

  /**
      Méthode appelée à la soumission du formulaire
  */
  onSubmit() {
    if (this.loginForm.valid) {
      // poster les donnee au back-end
      this.loginSvc.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe((reponse: any) => {
          localStorage.setItem('token', reponse.jwt);
          this.notif.open('Vous êtes connecté(e)', 'Fermer', { duration: 5000 });
          this.router.navigate(['/']);
        }
        );
    }
  }



}
