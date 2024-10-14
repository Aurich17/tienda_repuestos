import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/services_api';
import { Tipos } from '../../domain/response/administrador_response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsertaCelularRequest, Parte } from '../../domain/request/administrador_request';

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

  constructor(private fb: FormBuilder, private apiService: ApiService,private snackBar: MatSnackBar) { }

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
    const file = input.files?.[0];  // Obtener el archivo desde el evento

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;  // Asignar la imagen seleccionada para vista previa
      };

      this.imagenSeleccionada = file;  // Asignar el archivo a imagenSeleccionada
      reader.readAsDataURL(file);  // Leer el archivo como Data URL
    }
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
    this.apiService.getTipos('MAR').subscribe(
      (data: Tipos[]) => {
        this.marcas = data;
      },
      error => {
        console.error('Error al obtener marcas', error);
      }
    );
  }

  loadComponentes(): void {
    this.apiService.getTipos('COM').subscribe(
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
    formData.append('p_marca_cod', values.phoneMarca);
    formData.append('p_modelo', values.phoneName);
    formData.append('p_cantidad', values.phoneCount.toString());
    formData.append('p_precio_completo', values.phonePrice.toString());
    formData.append('p_descripcion', values.phoneDescription);

    // Convertir las partes a JSON string y agregarlas
    formData.append('partes', JSON.stringify(this.parte));

    // Agregar la imagen al FormData
    formData.append('imagen', this.imagenSeleccionada);

    // Llama a la API y envía el FormData
    this.apiService.insertPhone(formData).subscribe(response => {
      this.snackBar.open('Registration successful!', 'Close', {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "end"
      });
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
