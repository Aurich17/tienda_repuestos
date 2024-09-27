import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/services_api';
import { Marca } from '../../domain/response/administrador_response';

@Component({
  selector: 'app-new-phone',
  templateUrl: './new-phone.component.html',
  styleUrls: ['./new-phone.component.css']
})
export class NewPhoneComponent implements OnInit {
  formNewPhone!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null; // Variable para la imagen seleccionada

  marcas: Marca[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  initializeForm(){
    this.formNewPhone = this.fb.group({
      phoneName: ['', Validators.required],
      phonePrice: [null, Validators.required],
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

  // Manejar la selección de imagen
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Asignar la imagen seleccionada para mostrar la vista previa
      };
      reader.readAsDataURL(file);
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
}
