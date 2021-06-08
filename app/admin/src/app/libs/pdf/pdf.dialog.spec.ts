import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDialog } from './pdf.dialog';

describe('PdfDialog', () => {
  let component: PdfDialog;
  let fixture: ComponentFixture<PdfDialog>;

  beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ PdfDialog ]
	})
	.compileComponents();
  }));

  beforeEach(() => {
	fixture = TestBed.createComponent(PdfDialog);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
