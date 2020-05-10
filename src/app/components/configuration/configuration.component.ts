import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/Services/ConfigurationServices.service';
import { Configuration } from 'src/app/models/configurationModel.model';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {

  allowRegister = false;

  constructor(
    private router: Router,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit() {
    this.configurationService
      .getConfiguration()
      .subscribe((configuration: Configuration) => {
        this.allowRegister = configuration.allowRegister;
      });
  }

  save() {
    let configurationValue = { allowRegister: this.allowRegister };
    this.configurationService.modifyConfiguration(configurationValue);
    this.router.navigate(['/']);
  }
}
