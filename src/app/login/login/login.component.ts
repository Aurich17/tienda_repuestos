import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/services_api';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomMessageComponent } from 'src/app/message_custom/custom-message/custom-message.component';
import { Observable, switchMap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LoginRequest, RegisterRequest } from '../domain/request/login_request';
import { Router } from '@angular/router';
// import {BandejaPrincipalComponent} from
import { BandejaPrincipalComponent } from 'src/app/bandeja-principal/bandeja-principal.component';
import { AuthService } from 'src/app/services/auth_service';
import { Tipos } from 'src/app/administrador_panel/domain/response/administrador_response';
import { Message } from 'primeng/api/message';
import { MessageService } from 'primeng/api';
import { TipoListaRequest } from 'src/app/administrador_panel/domain/request/administrador_request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    selectedDocument!: Tipos;
    messages!: Message[];
    group!:FormGroup
    group_login!:FormGroup
    documentos: Tipos[] = []
    nacionalidades: Tipos[] = [];
    token:string = '6LfHMYsqAAAAAIAq9tyPIBjWUC6ldQrq4cc0GCHN' //LOCAL
    // token:string = '6LcAQYsqAAAAAEIRBAV1KFJV0xFvfTrycJcjNPfx' //PRODUCCION
    constructor(public dialog: MatDialog,private apiService: ApiService,private snackBar: MatSnackBar,
      private router: Router,public dialogRef: MatDialogRef<LoginComponent>,private authService: AuthService,
      private messageService: MessageService,private ngZone: NgZone) {}
    @ViewChild(CustomMessageComponent) customMessageComponent!: CustomMessageComponent;


    show(type: string, message: string) {
      this.messageService.add({ severity: type, detail: message});
    }

    initializeForm(){
      this.group = new FormGroup({
        user_name : new FormControl (null,null),
        user_email : new FormControl(null,null),
        user_password: new FormControl(null,null),
        documentoTipo :new FormControl(null,null),
        numDocumento: new FormControl(null,null)
      });

      this.group_login = new FormGroup({
        login_user: new FormControl(null,null),
        login_password: new FormControl(null,null)
      })
     }

    ngOnInit():void{
      this.initializeForm()
      this.loadTipos()
      this.loadRecaptchaScript().then(() => {
        this.renderRecaptcha(); // Renderiza el captcha al inicializar el componente
      });
    }
    // Variable para alternar entre el formulario de login y registro
    showLogin: boolean = true;

    // Función para mostrar el formulario de registro
    openRegister() {
      this.showLogin = false; // Oculta el formulario de login
      setTimeout(() => this.renderRecaptcha(), 0); // Renderiza el reCAPTCHA
    }

    // Función para mostrar el formulario de login
    openLogin() {
      this.showLogin = true; // Oculta el formulario de registro
      setTimeout(() => this.renderRecaptcha(), 0); // Renderiza el reCAPTCHA
    }

    registerUser(): void {
      const values = this.group.value;
      const request:RegisterRequest =<RegisterRequest>{}
      request.p_username = values.user_name
      request.p_password = values.user_password
      request.p_email = values.user_email
      request.p_doi_cod = values.documentoTipo.cod_tipo
      request.p_doi_number = values.numDocumento

      this.apiService.userRegister(request).subscribe(
        (response) => {
          if(response.status == 200){
            this.show('success', 'Registro Exitoso');
            this.closeDialog()
          }
        })
    }


    closeDialog(): void {
      this.dialogRef.close();  // Aquí puedes pasar un valor si es necesario
    }

    grecaptcha: any;
    private loadRecaptchaScript(): Promise<void> {
      return new Promise((resolve, reject) => {
        const scriptId = 'recaptcha-script';

        // Evita cargar el script varias veces
        if (document.getElementById(scriptId)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://www.google.com/recaptcha/api.js'; // Cambiado a la API estándar
        script.async = true;
        script.defer = true;

        script.onload = () => {
          resolve();
        };

        script.onerror = (error) => {
          console.error('Error cargando el script de reCAPTCHA', error);
          reject(error);
        };

        document.body.appendChild(script);
      });
    }
    login(): void {
      const recaptchaResponse = (window as any).grecaptcha.getResponse();
      if (!recaptchaResponse) {
        this.show('error', 'Por favor, verifica que no eres un robot.');
        return;
      }

      const values = this.group_login.value;

      const loginRequest: LoginRequest = {
        username: values.login_user,
        password: values.login_password,
        token: recaptchaResponse, // Agregar el token de reCAPTCHA
      };

      this.apiService.loginUsuario(loginRequest).subscribe(
        (response) => {
          localStorage.setItem('access_token', response.access_token);
          this.apiService.getProfile().subscribe((profile) => {
            this.show('success', 'Logueo Exitoso');
            const rol = profile.is_admin ? 'admin' : 'user';
            this.authService.setUserRole(rol, profile.username, profile.id, profile.nombre_completo, profile.email,profile.doi_number,profile.doi_cod);

            if (profile.is_admin) {
              this.router.navigate(['/admin']);
            } else {
              this.authService.login();
              window.location.reload();
            }

            this.closeDialog();
          });
        },
        (error) => {
          this.show('error', 'Credenciales Incorrectas');
          console.error('Error en el login:', error);
        }
      );
    }

    loadTipos(): void {
      const tipo_request:TipoListaRequest = <TipoListaRequest>{}
      tipo_request.tabla_tab = 'NAC'
      tipo_request.desc_tipos = '%'
      this.apiService.getTipos(tipo_request).pipe(
        switchMap((data: Tipos[]) => {
          this.nacionalidades = data;
          // Aquí haces la segunda llamada API
          tipo_request.tabla_tab = 'DOI'
          return this.apiService.getTipos(tipo_request);
        })
      ).subscribe(
        (response) => {
          this.documentos = response
        }
      );
    }

    private renderRecaptcha(): void {
      if ((window as any).grecaptcha) {
        const captchaContainer = document.getElementById('recaptcha-container');

        if (captchaContainer) {
          // Limpia el contenedor del captcha si ya tiene contenido
          captchaContainer.innerHTML = '';
        }

        // Renderiza el captcha en el contenedor especificado
        (window as any).grecaptcha.render('recaptcha-container', {
          //sitekey: '6LfHMYsqAAAAAIAq9tyPIBjWUC6ldQrq4cc0GCHN', //LOCAL
          sitekey: this.token
        });
      }
    }
    //PARA VALIDAR QUE EL TOKEN SIGUE
}
