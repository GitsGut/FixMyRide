import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehicleAiService } from 'src/app/services/vehicle-ai.service';

@Component({
  selector: 'app-vehicle-ai',
  templateUrl: './vehicle-ai.component.html',
  styleUrls: ['./vehicle-ai.component.css']
})
export class VehicleAiComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  userInput = '';
  messages: { text: string, sender: 'user' | 'bot' }[] = [];
  isLoading = false;

  constructor(private aiService: VehicleAiService) {}
  ngOnInit(): void {}

  sendMessage() {
    const prompt = this.userInput.trim();
    if (!prompt) return;

    this.messages.push({ text: prompt, sender: 'user' });
    this.userInput = '';
    this.isLoading = true;

    this.aiService.getResponseVehicleAi(prompt).subscribe(
      (res) => {
        this.messages.push({ text: res.response, sender: 'bot' });
        this.isLoading = false;
      },
      (err) => {
        this.messages.push({ text: 'Error getting response from AI.', sender: 'bot' });
        this.isLoading = false;
        console.error(err);
      }
    );
  }

  closeChatbot() {
    this.close.emit();
  }
}