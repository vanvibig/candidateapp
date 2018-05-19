import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'
import {SearchData} from "../interfaces/searchdata";

let url : string = 'http://localhost:8080/api/candidate';

@Injectable()
export class CandidateService {

    headers: any;
    options: any;

    constructor(private http : Http) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': 'Basic dXNlcjpzZWNyZXQxMjM='

        });

        this.options = new RequestOptions({headers: this.headers})
    }

    findById(id : string) {
        return this
            .http
            .get(url + '/' + id, this.options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    findAll() {
        return this
            .http
            .get(url, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    save(candidate) {
        return this
            .http
            .post(url, candidate, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    detele(id) {
        return this
            .http
            .delete(url + '/' + id, this.options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    search(search : SearchData) {
        return this
            .http
            .post(url + '/search', search, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        return Observable.throw(error.json().error || 'Server error');
    }

}