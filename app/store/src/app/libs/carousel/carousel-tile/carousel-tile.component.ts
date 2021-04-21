import { OnInit, Component, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mat-carousel-tile',
    styleUrls: ['./carousel-tile.component.scss'],
    templateUrl: './carousel-tile.component.html',
    encapsulation: ViewEncapsulation.None
})

export class MatCarouselTile implements OnInit {

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    public holding: boolean;
    public position: any = {
        x: 0,
        left: 0
    };

    private move(event: MouseEvent|TouchEvent) {
        if (this.holding) {
            let dx = 0;
            if (event instanceof MouseEvent) {
                dx = event.clientX - this.position.x;
                this.el.nativeElement.offsetParent.scrollLeft = this.position.left - dx;
            } else if (event instanceof TouchEvent) {
                
            }
        }
    }

    private hold(event: MouseEvent|TouchEvent) {
        this.holding = true;
        const bounds = this.el.nativeElement.getBoundingClientRect();
        if (event instanceof MouseEvent) {
            this.position.x = event.clientX;
            this.position.left = bounds.left;
        } else if (event instanceof TouchEvent) {
            
        }
        this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
    }

    private release(event: MouseEvent|TouchEvent) {
        this.holding = false;
        this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    }

    ngOnInit(): void {
        // this.renderer.listen(this.el.nativeElement, 'mousemove', event => this.move(event));
        // this.renderer.listen(this.el.nativeElement, 'touchmove', event => this.move(event));
        // this.renderer.listen(this.el.nativeElement, 'mousedown', event => this.hold(event));
        // this.renderer.listen(this.el.nativeElement, 'touchstart', event => this.hold(event));
        // this.renderer.listen(this.el.nativeElement, 'mouseup', event => this.release(event));
        // this.renderer.listen(this.el.nativeElement, 'mouseout', event => this.release(event));
        // this.renderer.listen(this.el.nativeElement, 'touchend', event => this.release(event));
        // this.renderer.listen(this.el.nativeElement, 'mouseleave', event => this.release(event));
    }

}