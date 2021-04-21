import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCarousel } from './carousel.component';

describe('MatCarousel', () => {
	let component: MatCarousel;
	let fixture: ComponentFixture<MatCarousel>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatCarousel]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MatCarousel);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
