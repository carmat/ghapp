import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Repo }           from '../models/repo';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GithubRepoService {

    apiUrl = 'https://api.github.com/search/repositories?q=';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getRepos(term: String): Observable<Repo[]> {
        this.apiUrl += term || 'bootstrap';

        return this.http.get(this.apiUrl, { headers: this.headers })
                        .map(this.extractData);
                        // .catch(this.handleError);
    }

    private extractData(result: Response) {
        let body = result.json();

        return body.items as Repo[];
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
