import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule }    from '@angular/http';

// Components
import { AppComponent }  from '../components/app';
import { IssueComponent }  from '../components/issue';

// Services
import { GithubRepoService }  from '../services/repo';
import { GithubIssueService }  from '../services/issue';

// Models
import { Repo }  from '../models/repo';
import { Issue }  from '../models/issue';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        JsonpModule,
    ],
    declarations: [
        AppComponent,
        IssueComponent,
    ],
    providers:    [
        GithubRepoService,
        GithubIssueService,
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
