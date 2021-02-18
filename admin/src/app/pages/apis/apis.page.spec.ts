import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApisPage } from './apis.page';

describe('ApisPage', () => {
  let component: ApisPage;
  let fixture: ComponentFixture<ApisPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApisPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
