import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule }    from '@angular/http';

import { AppComponent }  from '../components/app';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        JsonpModule,
    ],
    providers:    [],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
