import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/services_api';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomMessageComponent } from 'src/app/message_custom/custom-message/custom-message.component';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../domain/request/login_request';
import { Router } from '@angular/router';
// import {BandejaPrincipalComponent} from
import { BandejaPrincipalComponent } from 'src/app/bandeja-principal/bandeja-principal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    group!:FormGroup
    group_login!:FormGroup
    constructor(public dialog: MatDialog,private apiService: ApiService,private snackBar: MatSnackBar, private router: Router,public dialogRef: MatDialogRef<LoginComponent>) {}
    @ViewChild(CustomMessageComponent) customMessageComponent!: CustomMessageComponent;

    showCustomMessage() {
      this.customMessageComponent.message = 'Registration Successful!';
      this.customMessageComponent.duration = 3000; // Tiempo en milisegundos
      document.getElementById('customMessage')!.style.display = 'block';
    }

    initializeForm(){
      this.group = new FormGroup({
        user_name : new FormControl (null,null),
        user_email : new FormControl(null,null),
        user_password: new FormControl(null,null)
      });

      this.group_login = new FormGroup({
        login_user: new FormControl(null,null),
        login_password: new FormControl(null,null)
      })
     }

    ngOnInit():void{
      this.initializeForm()
    }
    // Variable para alternar entre el formulario de login y registro
    showLogin: boolean = true;

    // Función para mostrar el formulario de registro
    openRegister() {
      this.showLogin = false;  // Oculta el formulario de login
    }

    // Función para mostrar el formulario de login
    openLogin() {
      this.showLogin = true;  // Oculta el formulario de registro
    }


    registerUser(): void {
      const values = this.group.value;
      this.apiService.insertaUsuario({
        username: values.user_name,
        email: values.user_email,
        password: values.user_password
      }).subscribe(
        item => {
          // Mostrar mensaje de éxito
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000, // El mensaje dura 3 segundos
            verticalPosition: "top", // Posición del snackbar
            horizontalPosition: "end"
          });

          // Redirigir o cambiar a la vista de login
          this.openLogin();  // Alterna a la vista de login
        },
        error => {
          // Manejar errores si el registro falla
          this.snackBar.open('Registration failed. Try again.', 'Close', {
            duration: 3000,
            verticalPosition: "top", // Posición del snackbar
            horizontalPosition: "end"
          });
        }
      );
    }


    closeDialog(): void {
      this.dialogRef.close();  // Aquí puedes pasar un valor si es necesario
    }

    login(): void {
      const values = this.group_login.value;
      const loginRequest: LoginRequest = {
        username: values.login_user,
        password: values.login_password
      };

      this.apiService.loginUsuario(loginRequest).subscribe(
        (response) => {
          localStorage.setItem('access_token', response.access_token);
          this.apiService.getProfile().subscribe(
            (profile) => {
              if (profile.is_admin) {
                this.router.navigate(['/admin']);
                this.closeDialog();
              } else {
                this.dialogRef.close();
                this.router.navigate(['/store']).then(() => {
                  // Recargar la página después de la redirección
                  window.location.reload();
                });
              }
            },
            (error) => {
              console.error('Error al obtener el perfil:', error);
            }
          );
        },
        (error) => {
          console.error('Error en el login:', error);
        }
      );
    }
}
