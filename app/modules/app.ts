import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from '../components/app';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
    ],
    providers:    [],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
