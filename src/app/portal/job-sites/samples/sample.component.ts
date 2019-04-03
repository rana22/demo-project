import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Sample} from "../../../../core/models/sample";
import {SampleDAO} from "../../../../core/services/dao/sampleDAO";

@Component({
  selector: 'app-sample',
  templateUrl: 'sample.component.html',
})
export class SampleComponent implements OnInit {

  public model: any = {};
  public selectedId: any;
  public samples: Sample[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sampleDAO: SampleDAO) {

  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.selectedId = +params['id'];
      this.samples = this.sampleDAO.getSamplesByJobSiteId(this.selectedId) as Sample[];
    });
  }

  showSample(sample) {
    this.model = sample;
  }
}
