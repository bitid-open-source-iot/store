import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StarsComponent } from './stars.component';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule
	],
	exports: [
		StarsComponent
	],
	declarations: [
		StarsComponent
	]
})

export class StarsModule { }