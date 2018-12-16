import {Component, OnInit} from '@angular/core';
import {BackendTypeService} from '../../../service/backend-type.service';
import {Config} from '../../../model/config';
import {configuration} from '../../../../environments/config';

@Component({
  selector: 'app-backend-type',
  templateUrl: './backend-type.component.html',
  styleUrls: ['./backend-type.component.css'],
  providers: [BackendTypeService]
})
export class BackendTypeComponent implements OnInit {
  private config: Config = configuration;

  constructor(private backendTypeService: BackendTypeService) {
  }

  ngOnInit() {
    this.backendTypeService.getConfig().subscribe(config => this.config = config);
  }

  updateConfig() {
    this.backendTypeService.updateConfig(this.config).then(() => location.reload(true));
  }
}
