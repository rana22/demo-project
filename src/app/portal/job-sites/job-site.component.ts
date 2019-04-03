import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JobSite} from "../../../core/models/jobSite";
import {JobSiteDAO} from "../../../core/services/dao/jobSiteDAO";
import { SampleDAO } from "../../../core/services/dao/sampleDAO";
import { Sample } from "../../../core/models/sample";
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-job-site',
  templateUrl: 'job-site.component.html',
})
export class JobSiteComponent implements OnInit {

  public model: any = {};
  public jobSites: JobSite[];
  public jobSiteSelected: boolean = false;
  public samples: Sample[] = [];
  public viewSample : Sample;
  public testResult : any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobSiteDAO: JobSiteDAO,
    private sampleDAO: SampleDAO,
    private http : Http) {

    this.jobSites = this.jobSiteDAO.get() as JobSite[];
    console.log(this.jobSiteDAO.get());
  }

  ngOnInit() {

  }

  showJobSite(jobSite) {
    this.jobSiteSelected = true;
    this.model = jobSite;
  }

  viewSamples(jobSiteId) {
    console.log("This is an ID: " + jobSiteId);
    // this.sampleDAO.
    this.samples = this.sampleDAO.getSamplesByJobSiteId(jobSiteId) as Sample[];
    console.log(this.samples);
  }
  
  viewSampleDetail(sample: Sample){
    console.log(sample);
    this.viewSample = sample;
    console.log(this.viewSample);

    this.http.get('http://localhost:3000/TestResults/'+sample.id)
    .map((response: Response) => response.json())
    .subscribe(
      res =>{
        console.log(res);
        this.testResult = res;

      }
    )
    
  }
}
