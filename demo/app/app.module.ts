import { NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	imports: [NativeScriptModule, HttpModule]
})
export class AppModule { }

