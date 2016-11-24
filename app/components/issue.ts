import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { GithubIssueService } from '../services/issue';
import { Issue }           from '../models/issue';

@Component({
    moduleId: module.id,
    selector: 'issues',
    templateUrl: '../templates/issues.html',
    providers: [ GithubIssueService ],
})

export class IssueComponent implements OnInit {

    repoName: string;
    issues: Observable<Issue[]>;

    constructor(
        private githubIssueService: GithubIssueService,
    ) {}

    getIssues(repoName: string): void {
        this.issues = this.githubIssueService.getIssues(repoName);
    }

    ngOnInit(): void {
        this.getIssues(this.repoName);
    }

}
