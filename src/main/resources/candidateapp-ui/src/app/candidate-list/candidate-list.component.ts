import {Component, OnInit} from '@angular/core';
import {Candidate} from "../../interfaces/candidate";
import {CandidateService} from "../../services/candidate.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../services/loader.service";
import {SearchData} from "../../interfaces/searchdata";

@Component({selector: 'app-candidate-list', templateUrl: './candidate-list.component.html', styleUrls: ['./candidate-list.component.css']})
export class CandidateListComponent implements OnInit {

  candidates : Candidate[];
  showLoader : boolean;
  searchData : SearchData = new SearchData();

  constructor(private candidateService : CandidateService, private router : Router, private loaderService : LoaderService) {}

  ngOnInit() {
    this
      .loaderService
      .status
      .subscribe((val : boolean) => {
        this.showLoader = val;
      });

    this.loadCadidate();
  }

  loadCadidate() {
    this
      .loaderService
      .display(true);
    this
      .candidateService
      .findAll()
      .subscribe(data => {
        this
          .loaderService
          .display(false);
        console.log(data);
        this.candidates = data;
      }, error => {
        this
          .loaderService
          .display(false);
        console.log(error);
      });
  }

  deleteCadidate(id) {
    this
      .loaderService
      .display(true);
    this
      .candidateService
      .detele(id)
      .subscribe(data => {
        this
          .loaderService
          .display(false);
        console.log(data);
        this.loadCadidate();
      }, error => {
        this
          .loaderService
          .display(false);
        console.log(error);
      });
  }

  onSearch() {       
    this.loaderService.display(true);
    this
      .candidateService
      .search(this.searchData)
      .subscribe(data => {       
        this.loaderService.display(false);
        this.candidates = data;
      }, error => {
        this
          .loaderService
          .display(false);
        console.log(error.message);
      });
  }

}
