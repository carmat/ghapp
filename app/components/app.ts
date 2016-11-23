import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { GithubRepoService } from '../services/repo';
import { GithubIssueService } from '../services/issue';
import { Repo }           from '../models/repo';
import { Issue }           from '../models/issue';

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

    getRepos(term: String): void {
        this.repos = this.githubRepoService.getRepos(term);
            // .do(v => console.log(this))
            // .catch(error => this.errorMessage = <any>error);
    }

    searchRepos(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        // this.getRepos(this.term);

        this.repos = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.githubRepoService.getRepos(term)
                // or the observable of empty repos if no search term
                : Observable.of<Repo[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<Repo[]>([]);
            });
    }

}
