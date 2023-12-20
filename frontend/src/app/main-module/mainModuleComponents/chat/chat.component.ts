import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: any[] = []; // Array to store chat messages
  newMessage: string  = ''; // Variable to store the new message input

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Assuming you have a socket or service to emit the message to the server
      // Emit the message to the server
      // Example: this.chatService.sendMessage(this.newMessage);

      // Add the message to the chat interface
      this.messages.push({
        author: 'Me',
        content: this.newMessage
      });

      // Clear the input field
      this.newMessage = '';
    }
  }
}
