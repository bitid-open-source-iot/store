import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { PrivateMessageDialog } from './private-message.dialog';

@Injectable({
	providedIn: 'root'
})

export class PrivateMessageService {

	constructor(private dialog: MatDialog) { }

	public show() {
		this.dialog.open(PrivateMessageDialog, {
			panelClass: 'private-message-dialog',
			disableClose: true
		});
	}

}