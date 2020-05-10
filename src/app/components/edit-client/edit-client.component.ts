import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/clientModel.model';
import { ClientService } from 'src/app/Services/clientServices.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  // clients: Client[];
  client: Client = {
    name: '',
    lastName: '',
    email: '',
    saldo: 0,
  };
  id: string;

  constructor(
    private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((clientSelected) => {
      this.client = clientSelected;
    });
  }
  saveClient({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Please fill the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      value.id = this.id;
      this.clientService.modifyClient(value);
      this.router.navigate(['/']);
    }
  }
  eliminate() {
    if (confirm('Are you sure want to delete this client?')) {
      this.clientService.eliminateClient(this.client);
      this.router.navigate(['/']);
    }
  }
}
