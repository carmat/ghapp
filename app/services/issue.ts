import { Injectable }     from '@angular/core';
import {
    Http, Response, Headers,
    RequestOptions, Jsonp, URLSearchParams
} from '@angular/http';
import { Issue }           from '../models/issue';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GithubIssueService {

    issues: Observable<Issue[]>;
    issueAPIUrl: string = 'https://api.github.com/search/issues?q=repo:';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private jsonp: Jsonp,
    ) {}

    getIssues(repo: string): Observable<Issue[]> {
        console.log('calling service.getIssues()...', repo);
        this.issueAPIUrl = this.issueAPIUrl + repo;

        return this.http.get(this.issueAPIUrl, { headers: this.headers })
                        .map(this.extractData);
                        // .catch(this.handleError);
    }

    private extractData(result: Response) {
        console.log('calling extractData()...');
        let body = result.json();

        return body.items as Issue[];
    }

    /*
    private handleError(error: Response | any) {
        let errorMessage: string;

        if ( error instanceof Response ) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);

            errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errorMessage = error.message ? error.message : error.toString();
        }

        console.log( errorMessage );
        return Observable.throw( errorMessage );
    }
    */

}
