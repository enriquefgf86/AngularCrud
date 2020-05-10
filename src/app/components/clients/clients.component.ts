import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from 'src/app/Services/clientServices.service';
import { Client } from 'src/app/models/clientModel.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  client: Client = {
    name: '',
    lastName: '',
    email: '',
    saldo: 0,
  };
  @ViewChild('clientForm') clientForm: NgForm;
  @ViewChild('close') closeForm: ElementRef;

  constructor(
    private clientService: ClientService,
    private flashMesageService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }
  getTotalSaldo() {
    let totalSaldo: number = 0;
    if (this.clients) {
      this.clients.forEach((client) => {
        totalSaldo += client.saldo;
      });
    }
    return totalSaldo;
  }
  addClient({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMesageService.show('Please fill correctly the form', {
        cssClass: 'alert-dager',
        timeout: 4000,
      });
    } else {
      this.clientService.addNewClkient(value);
      this.clientForm.resetForm()
      this.closeModal();
    }
  }
  private closeModal() {
    this.closeForm.nativeElement.click();
  }
}
