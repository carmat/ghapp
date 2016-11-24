import { Injectable }     from '@angular/core';
import {
    Http, Response, Headers,
    RequestOptions, Jsonp, URLSearchParams
} from '@angular/http';
import { Repo }           from '../models/repo';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GithubRepoService {

    repoAPIUrl = 'https://api.github.com/search/repositories?q=';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private jsonp: Jsonp,
    ) {}

    /*
    searchRepos(term: string) {
        let params = new URLSearchParams();

        params.set('search', term);
        params.set('sort', 'stars');
        params.set('order', 'desc');

        return this.jsonp.get(this.repoAPIUrl, { search: params })
            .map(this.extractData);
    }
    */

    getRepos(term: String): Observable<Repo[]> {
        console.log('calling service.getRepos()...', term);
        this.repoAPIUrl += term;

        return this.http.get(this.repoAPIUrl, { headers: this.headers })
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
