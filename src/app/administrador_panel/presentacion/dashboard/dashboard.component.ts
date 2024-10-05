import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  barChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 150, 180, 90, 200],
        backgroundColor: '#6cf8a6',
        borderColor: '#4daf7b',
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
}
