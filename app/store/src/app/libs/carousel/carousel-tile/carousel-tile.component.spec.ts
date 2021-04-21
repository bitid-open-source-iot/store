import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCarouselTile } from './carousel-tile.component';

describe('MatCarouselTile', () => {
	let component: MatCarouselTile;
	let fixture: ComponentFixture<MatCarouselTile>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatCarouselTile]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MatCarouselTile);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
