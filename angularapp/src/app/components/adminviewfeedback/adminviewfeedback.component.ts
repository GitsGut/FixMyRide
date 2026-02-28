import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  isLoading = true;
  feedbacks: Feedback[] = [];
  ratingCounts: number[] = [0, 0, 0, 0, 0];
  satisfiedPercent = 0;
  unsatisfiedPercent = 0;
  satisfiedChart: any;
  unsatisfiedChart: any;
  barChart: any;
  constructor(private service: FeedbackService) {}
  ngOnInit(): void {
    this.service.getAllFeedbacks().subscribe(params => {
      this.feedbacks = params;
      this.isLoading = false;
      this.calculateStats();
      setTimeout(() => {
        this.generateSatisfactionCharts();
        this.generateBarChart();
      }, 0);
    });
  }
  calculateStats(): void {
    this.ratingCounts = [0, 0, 0, 0, 0];
    this.feedbacks.forEach(fb => {
      if (fb.rating >= 1 && fb.rating <= 5) {
        this.ratingCounts[fb.rating - 1]++;
      }
    });
    const total = this.feedbacks.length;
    const satisfied = this.ratingCounts[3] + this.ratingCounts[4]; // 4 & 5 stars
    const unsatisfied = this.ratingCounts[0] + this.ratingCounts[1] + this.ratingCounts[2]; // 1-3 stars
    this.satisfiedPercent = total ? Math.round((satisfied / total) * 100) : 0;
    this.unsatisfiedPercent = total ? Math.round((unsatisfied / total) * 100) : 0;
  }
  generateSatisfactionCharts(): void {
    const satCanvas = document.getElementById('satisfiedChart') as HTMLCanvasElement;
    const unsatCanvas = document.getElementById('unsatisfiedChart') as HTMLCanvasElement;
    this.satisfiedChart = new Chart(satCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Satisfied', 'Remaining'],
        datasets: [{
          data: [this.satisfiedPercent, 100 - this.satisfiedPercent],
          backgroundColor: ['#28a745', '#e9ecef']
        }]
      },
      options: {
        plugins: {
          title: { display: true, text: `Satisfied (${this.satisfiedPercent}%)` }
        }
      }
    });
    this.unsatisfiedChart = new Chart(unsatCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Unsatisfied', 'Remaining'],
        datasets: [{
          data: [this.unsatisfiedPercent, 100 - this.unsatisfiedPercent],
          backgroundColor: ['#dc3545', '#e9ecef']
        }]
      },
      options: {
        plugins: {
          title: { display: true, text: `Unsatisfied (${this.unsatisfiedPercent}%)` }
        }
      }
    });
  }
  generateBarChart(): void {
    const canvas = document.getElementById('feedbackBarChart') as HTMLCanvasElement;
    this.barChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
          label: 'Feedback Count',
          data: this.ratingCounts,
          backgroundColor: ['#dc3545', '#ff6f61', '#ffc107', '#28a745', '#007bff']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Rating Distribution' },
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
 