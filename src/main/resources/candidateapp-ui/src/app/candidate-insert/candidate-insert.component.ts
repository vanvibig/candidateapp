import {Component, OnInit} from '@angular/core';
import {Candidate} from "../../interfaces/candidate";
import {CandidateService} from "../../services/candidate.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../services/loader.service";

@Component({selector: 'app-candidate-insert', templateUrl: './candidate-insert.component.html', styleUrls: ['./candidate-insert.component.css']})
export class CandidateInsertComponent implements OnInit {

  candidate : Candidate;
  showLoader : boolean;

  constructor(private candidateService : CandidateService, private router : Router, private loaderService : LoaderService) {
    this.candidate = new Candidate();
  }

  ngOnInit() {
    this
      .loaderService
      .status
      .subscribe((val : boolean) => {
        this.showLoader = val;
      });
  }

  saveCandidate() {
    this
    .loaderService
    .display(true);
    this
      .candidateService
      .save(this.candidate)
      .subscribe(data => {
        this
        .loaderService
        .display(false);
        console.log(data);
        this
          .router
          .navigate(["list"]);
      }, error => {
        this
        .loaderService
        .display(false);
        console.log(error);
      });
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this
        .handleReaderLoaded
        .bind(this);

      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.candidate.photo = btoa(binaryString);
    console.log(btoa(binaryString));
  }
}
