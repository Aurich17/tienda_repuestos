import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/services_api';
import { Marca } from '../../domain/response/administrador_response';
import { CelularConPartes, Parte } from '../../domain/request/administrador_request';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-phone',
  templateUrl: './new-phone.component.html',
  styleUrls: ['./new-phone.component.css']
})
export class NewPhoneComponent implements OnInit {
  formNewPhone!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null; // Variable para la imagen seleccionada

  parte: Parte[] = []
  marcas: Marca[] = [];
  imagenSeleccionada!: File;

  constructor(private fb: FormBuilder, private apiService: ApiService,private snackBar: MatSnackBar) { }

  initializeForm(){
    this.formNewPhone = this.fb.group({
      phoneMarca: [null,null],
      phoneName: ['', Validators.required],
      phonePrice: [null, Validators.required],
      phoneDescription: [null,Validators.required],
      components: this.fb.array([])  // FormArray para componentes
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
        nombre_parte: control.get('componentName')?.value,
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
    this.apiService.getMarcas().subscribe(
      (data: Marca[]) => {
        this.marcas = data;
      },
      error => {
        console.error('Error al obtener marcas', error);
      }
    );
  }

  registrarCelular() {
    const values = this.formNewPhone.value
    this.saveComponentsToParteList()
    const nuevoCelular: CelularConPartes = {
      marca_id: values.phoneMarca,
      modelo: values.phoneName,
      precio_completo: values.phonePrice,
      descripcion: values.phoneDescription,
      partes: this.parte
    };

    // Llama a la API y envía el celular con la imagen
    this.apiService.registrarCelular(nuevoCelular, this.imagenSeleccionada).subscribe(response => {
      this.snackBar.open('Registration successful!', 'Close', {
        duration: 3000, // El mensaje dura 3 segundos
        verticalPosition: "top", // Posición del snackbar
        horizontalPosition: "end"
      });
      this.limpiarFormulario();
    }, error => {
      this.snackBar.open('Error', 'Close', {
        duration: 3000, // El mensaje dura 3 segundos
        verticalPosition: "top", // Posición del snackbar
        horizontalPosition: "end"
      });
      console.log(error)
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
