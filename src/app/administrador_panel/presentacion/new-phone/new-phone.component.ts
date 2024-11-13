import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/services_api';
import { Tipos } from '../../domain/response/administrador_response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsertaCelularRequest, Parte, TipoListaRequest } from '../../domain/request/administrador_request';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-phone',
  templateUrl: './new-phone.component.html',
  styleUrls: ['./new-phone.component.css']
})
export class NewPhoneComponent implements OnInit {
  formNewPhone!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null; // Variable para la imagen seleccionada

  parte: Parte[] = []
  marcas: Tipos[] = [];
  componentes: Tipos[] = [];
  imagenSeleccionada!: File;
  imagenSeleccionadaBase64:string = ''

  constructor(private fb: FormBuilder, private apiService: ApiService,private snackBar: MatSnackBar,private messageService: MessageService,) { }
  show(type: string, message: string) {
    this.messageService.add({ severity: type, detail: message});
  }


  initializeForm(){
    this.formNewPhone = this.fb.group({
      phoneMarca: [null,null],
      phoneName: ['', Validators.required],
      phonePrice: [null, Validators.required],
      phoneDescription: [null,Validators.required],
      components: this.fb.array([]),  // FormArray para componentes
      phoneCount: [null,null]
    });
   }

   name_phone:string = ''

  ngOnInit(): void {
    this.initializeForm()
     // Escuchar cambios en el campo 'phoneName'
    this.formNewPhone.get('phoneName')?.valueChanges.subscribe(value => {
      this.name_phone = value;
    });
    this.loadMarcas()
    this.loadComponentes()
  }

  // name_phone = this.formNewPhone.get('phoneName')
  // Getter para los componentes
  get components(): FormArray {
    return this.formNewPhone.get('components') as FormArray;
  }

  // Agregar componente
  addComponent(): void {
    const componentForm = this.fb.group({
      componentName: ['', Validators.required],
      componentPrice: [null, Validators.required],
      componentQuantity: [null, Validators.required]
    });
    this.components.push(componentForm);
  }

  // Eliminar componente
  removeComponent(index: number): void {
    this.components.removeAt(index);
  }

  saveComponentsToParteList(): void {
    this.parte = this.components.controls.map(control => {
      return {
        componente_cod: control.get('componentName')?.value,
        precio: control.get('componentPrice')?.value,
        cantidad: control.get('componentQuantity')?.value
      };
    });

    console.log(this.parte);  // Verificar la lista de partes en la consola
  }

  // Manejar la selección de imagen
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];  // Obtener el archivo seleccionado

    if (file) {
      // Validar que el archivo sea una imagen
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        console.log('El archivo seleccionado no es una imagen válida');
        return;  // Si no es una imagen, salir de la función
      }

      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const base64String = this.arrayBufferToBase64(arrayBuffer);  // Convertir a Base64

        // Guardar la imagen Base64 sin el prefijo
        this.imagenSeleccionadaBase64 = base64String;

        // También puedes mantener el Data URL si lo necesitas para mostrar la imagen
        this.selectedImage = 'data:' + file.type + ';base64,' + base64String;
      };
      reader.readAsArrayBuffer(file);  // Leer el archivo como ArrayBuffer
    }
  }

    // Función para convertir ArrayBuffer a Base64
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);  // Convertir a Base64
  }

  // Enviar el formulario
  onSubmit(): void {
    if (this.formNewPhone.valid) {
      const newPhoneData = this.formNewPhone.value;
      console.log('Datos del nuevo celular:', newPhoneData);
      // Lógica para enviar los datos a una API o servicio
    } else {
      console.error('Formulario inválido');
    }
  }

  loadMarcas(): void {
    const tipo_request:TipoListaRequest = <TipoListaRequest>{}
    tipo_request.tabla_tab = 'MAR'
    this.apiService.getTipos(tipo_request).subscribe(
      (data: Tipos[]) => {
        this.marcas = data;
      },
      error => {
        console.error('Error al obtener marcas', error);
      }
    );
  }

  loadComponentes(): void {
    const tipo_request:TipoListaRequest = <TipoListaRequest>{}
    tipo_request.tabla_tab = 'COM'
    this.apiService.getTipos(tipo_request).subscribe(
      (data: Tipos[]) => {
        this.componentes = data;
      },
      error => {
        console.error('Error al obtener componentes', error);
      }
    );
  }


  registrarCelular() {
    const values = this.formNewPhone.value;
    this.saveComponentsToParteList();

    // Crear un objeto FormData
    const formData = new FormData();

    // Agregar los campos al FormData
    formData.append('p_accion','I')
    formData.append('p_marca_cod', values.phoneMarca);
    formData.append('p_modelo', values.phoneName);
    formData.append('p_cantidad', values.phoneCount.toString());
    formData.append('p_precio_completo', values.phonePrice.toString());
    formData.append('p_descripcion', values.phoneDescription);

    // Convertir las partes a JSON string y agregarlas
    formData.append('p_partes', JSON.stringify(this.parte));
    formData.append('p_celular_id','0')

    // Agregar la imagen en Base64
    if (this.imagenSeleccionadaBase64) {
      formData.append('p_imagen', this.imagenSeleccionadaBase64);  // Aquí envías la imagen en Base64
    }

    // Llama a la API y envía el FormData
    this.apiService.insertPhone(formData).subscribe(response => {
      this.show('success', 'Celular Registrado');
      this.limpiarFormulario();
    }, error => {
      this.snackBar.open('Error', 'Close', {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "end"
      });
      console.log(error);
    });
  }

  limpiarFormulario() {
    // Limpiar el formulario principal
    this.formNewPhone.reset();

    // Limpiar el FormArray de componentes
    const componentsArray = this.formNewPhone.get('components') as FormArray;
    while (componentsArray.length) {
      componentsArray.removeAt(0);
    }
  }

  click(){
    const values = this.formNewPhone.value
    console.log(values)

  }


}
