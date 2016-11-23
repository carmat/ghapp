import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { GithubIssueService } from '../services/issue';
import { Issue }           from '../models/issue';

@Component({
    moduleId: module.id,
    selector: 'github-issue',
    templateUrl: '../templates/issue.html',
    providers: [ GithubIssueService ],
})

export class IssueComponent implements OnInit {

    repoName: string;
    issues: Observable<Issue[]>;

    constructor(
        private githubIssueService: GithubIssueService,
    ) {}

    getIssues(repoName: String): void {
        this.issues = this.githubIssueService.getIssues(repoName);
            // .do(v => console.log(this))
            // .catch(error => this.errorMessage = <any>error);
    }

    ngOnInit(): void {
        this.getIssues(this.repoName);
    }

}
