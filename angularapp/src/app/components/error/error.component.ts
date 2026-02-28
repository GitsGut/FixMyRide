
import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  message: string | null = null;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.error$.subscribe(msg => {
      this.message = msg;

      if (msg) {
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
          this.dismiss();
        }, 3000);
      }
    });
  }

  dismiss() {
    this.errorService.clearError();
  }
}
