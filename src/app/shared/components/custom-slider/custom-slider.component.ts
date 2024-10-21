import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.css']
})
export class CustomSliderComponent implements OnInit, OnDestroy {
  @Input() images: string[] = []; // Array de imágenes en Base64
  @Input() autoSlide: boolean = true;
  @Input() slideInterval: number = 3000;

  currentImages: string[] = [];  // Array que muestra las imágenes visibles
  totalVisibleItems = 4;  // Número de elementos visibles en el carrusel
  slideIntervalId: any;

  ngOnInit() {
    console.log('ESTAS SON LAS IMAGENES')
    console.log(this.images)
    this.currentImages = [...this.images];  // Inicializa las imágenes visibles
    console.log('INGRESA A ESTO')
    console.log(this.currentImages)
    if (this.autoSlide) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  // Método para avanzar las imágenes
  nextSlide() {
    const firstImage = this.currentImages.shift();  // Remueve la primera imagen
    if (firstImage) {
      this.currentImages.push(firstImage);  // Añade la imagen al final
    }
  }

  // Método para retroceder las imágenes
  prevSlide() {
    const lastImage = this.currentImages.pop();  // Remueve la última imagen
    if (lastImage) {
      this.currentImages.unshift(lastImage);  // Añade la imagen al principio
    }
  }

  startAutoSlide() {
    this.slideIntervalId = setInterval(() => {
      this.nextSlide();
    }, this.slideInterval);
  }

  stopAutoSlide() {
    if (this.slideIntervalId) {
      clearInterval(this.slideIntervalId);
    }
  }
}
