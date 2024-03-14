import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {BaseDetailsComponent} from "../base-details/base-details.component";
import {ApiPmcIdService} from "../services/api-pmc-id.service";
import {ModelPMC} from "../models/ModelPMC";
import BaseModel from "../models/BaseModel";

@Component({
  selector: 'app-details-pmc',
  templateUrl: './details-pmc.component.html',
  styleUrl: './details-pmc.component.scss'
})
export class DetailsPmcComponent extends BaseDetailsComponent implements OnInit{
  id: string = '';
  public Model: BaseModel = new BaseModel();
  constructor(private route: ActivatedRoute, private apiPmcIdService: ApiPmcIdService) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') ?? "";
      this.fetchData(this.id);
    })
  }

  public fetchData(id: string) {
    this.apiPmcIdService.fetchData(id).subscribe({
      next: (response) => {
        this.data = response;
        this.error = '';
        let modelpmc = Object.assign(new ModelPMC(), this.data);
        this.Model = modelpmc.convert();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.data = null;
        this.error = 'Error fetching data';
      }
    });
  };
}
