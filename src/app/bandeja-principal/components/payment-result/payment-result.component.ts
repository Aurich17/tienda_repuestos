import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { paypalRequest } from 'src/app/administrador_panel/domain/request/administrador_request';
//import { paypalRequest } from 'src/app/administrador_panel/domain/response/administrador_response';
import { ApiService } from 'src/app/services/services_api';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent {
  constructor(private route: ActivatedRoute,private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paymentId = params['paymentId'];
      const token = params['token'];
      const payerId = params['PayerID'];

      // Aquí llamas a tu servicio o backend para verificar el estado del pago
      this.verifyPayment(paymentId, token, payerId);
    });
  }

  verifyPayment(paymentId: string, token: string, payerId: string) {
    const request_paypal: paypalRequest = {
      paymentId: paymentId,
      payerId: payerId
    };

    this.apiService.executePayment(request_paypal).subscribe(response => {
      if (response.success) {
        // Redirige al usuario a una página de confirmación o muestra un mensaje de éxito
        console.log('Pago realizado con éxito');
      } else {
        // Muestra un mensaje de error si el pago falló
        console.log('Pago fallido o cancelado');
      }
    });
  }
}
