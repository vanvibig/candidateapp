import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import {CandidateService} from "../services/candidate.service";
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateInsertComponent } from './candidate-insert/candidate-insert.component';
import {LoaderService} from "../services/loader.service";

export const AppRoutes : any = [
  { path: "", component: AppComponent},
  { path: "list", component: CandidateListComponent },
  { path: "insert", component: CandidateInsertComponent } 
];

@NgModule({
  declarations: [
    AppComponent,
    CandidateListComponent,
    CandidateInsertComponent
  ],
  imports: [
    HttpModule,     
    FormsModule, 
    BrowserModule,
    RouterModule.forRoot(AppRoutes,{useHash: true})
  ],
  providers: [CandidateService,LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
