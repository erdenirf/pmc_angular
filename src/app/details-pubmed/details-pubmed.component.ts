import {Component, OnInit} from '@angular/core';
import {BaseDetailsComponent} from "../base-details/base-details.component";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ApiPubmedIdService} from "../services/api-pubmed-id.service";
import BaseModel from "../models/BaseModel";
import {ModelPubmed} from "../models/ModelPubmed";

@Component({
  selector: 'app-details-pubmed',
  templateUrl: './details-pubmed.component.html',
  styleUrl: './details-pubmed.component.scss'
})
export class DetailsPubmedComponent extends BaseDetailsComponent implements OnInit{
  id: number = 0;
  public Model: BaseModel = new BaseModel();
  constructor(private route: ActivatedRoute, private apiPubmedIdService: ApiPubmedIdService) {
    super();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let get_id = params.get('id');
      if (get_id != null) {
        this.id = +get_id;
      }
      this.fetchData(this.id.toString());
    })
  }
  public fetchData(id: string) {
    this.apiPubmedIdService.fetchData(id).subscribe({
      next: (response) => {
        this.data = response;
        this.error = '';
        let modelpubmed = Object.assign(new ModelPubmed(), this.data);
        this.Model = modelpubmed.convert();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.data = null;
        this.error = 'Error fetching data';
      }
    });
  };

}
