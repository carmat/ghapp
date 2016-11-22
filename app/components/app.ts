import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { GithubRepoService } from '../services/app';
import { Repo }           from '../models/repo';

@Component({
    moduleId: module.id,
    selector: 'github-app',
    templateUrl: '../templates/app.html',
    providers: [ GithubRepoService ],
})

export class AppComponent implements OnInit {

    term: string;
    repos: Observable<Repo[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private githubRepoService: GithubRepoService,
    ) {}

    ngOnInit(): void {
        this.getRepos(this.term);
    }

    public getRepos(term: String): void {
        this.repos = this.githubRepoService.getRepos(term);
            // .do(v => console.log(this))
            // .catch(error => this.errorMessage = <any>error);
    }

    public searchRepos(term: string): void {
        this.searchTerms.next(term);
    }

    /*
    public ngOnInit(): void {
        this.repos = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.githubSearchService.searchRepos(term)
                // or the observable of empty repos if no search term
                : Observable.of<Repo[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<Repo[]>([]);
            });
    }
    */

}
