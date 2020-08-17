import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDialog } from './download.dialog';

describe('DownloadDialog', () => {
  let component: DownloadDialog;
  let fixture: ComponentFixture<DownloadDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
