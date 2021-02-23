import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { SplashScreen } from './libs/splashscreen/splashscreen';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from './services/config/config.service';
import { UpdateService } from './libs/update/update.service';
import { ButtonsService } from './services/buttons/buttons.service';
import { AccountService } from './services/account/account.service';
import { MatIconRegistry } from '@angular/material/icon';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { OnInit, Component, ViewChild, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

	@ViewChild(MatDrawer, { static: true }) private drawer: MatDrawer;
	@ViewChild(SplashScreen, { static: true }) private splashscreen: SplashScreen;
	@ViewChild(MatDrawerContainer, { static: true }) private drawercontainer: MatDrawerContainer;

	@ViewChild('add', { static: true }) private add: MatButton;
	@ViewChild('close', { static: true }) private close: MatButton;
	@ViewChild('filter', { static: true }) private filter: MatButton;
	@ViewChild('search', { static: true }) private search: MatButton;
	@ViewChild('toolbar', { static: true }) private toolbar: MatToolbar;

	constructor(private config: ConfigService, private update: UpdateService, public account: AccountService, private buttons: ButtonsService, private renderer: Renderer2, private registry: MatIconRegistry, private sanitizer: DomSanitizer, private localstorage: LocalstorageService) {
		this.registry.addSvgIcon('arc', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/shapes/arc.svg'));
		this.registry.addSvgIcon('button', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/shapes/button.svg'));
		this.registry.addSvgIcon('circle', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/shapes/circle.svg'));
		this.registry.addSvgIcon('line', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/shapes/line.svg'));
		this.registry.addSvgIcon('polygon', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/shapes/polygon.svg'));
		this.registry.addSvgIcon('rectangle', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/shapes/rectangle.svg'));
		this.registry.addSvgIcon('text', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/shapes/text.svg'));
		this.registry.addSvgIcon('vector', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/shapes/vector.svg'));
	}

	public minified: boolean = JSON.parse(this.localstorage.get('minified', false));
	public authenticated: boolean;

	public toggle() {
		this.minified = !this.minified;
		this.localstorage.set('minified', this.minified);
	}

	private async initialize() {
		await this.splashscreen.show();

		if (window.innerWidth <= 600) {
			this.drawer.mode = 'push';
			this.drawercontainer.hasBackdrop = false;
		} else {
			this.drawer.mode = 'side';
		}

		await this.config.init();
		await this.update.init();

		await this.splashscreen.hide();
	}

	ngOnInit(): void {
		this.drawer.open();

		this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				// await this.account.init();
			}
		});

		this.account.authenticated.subscribe(authenticated => {
			this.authenticated = authenticated;
			if (authenticated) {
				this.drawer.open();
				this.renderer.setStyle(this.toolbar._elementRef.nativeElement, 'display', 'flex');
			} else {
				this.renderer.setStyle(this.toolbar._elementRef.nativeElement, 'display', 'none');
				this.drawer.close();
			}
		});

		this.initialize();

		this.renderer.listen(this.add._elementRef.nativeElement, 'click', event => this.buttons.add.click.next(event));
		this.renderer.listen(this.close._elementRef.nativeElement, 'click', event => this.buttons.close.click.next(event));
		this.renderer.listen(this.filter._elementRef.nativeElement, 'click', event => this.buttons.filter.click.next(event));
		this.renderer.listen(this.search._elementRef.nativeElement, 'click', event => this.buttons.search.click.next(event));

		this.buttons.add.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.add._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.add._elementRef.nativeElement, 'display', 'none');
			}
		});

		this.buttons.close.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.close._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.close._elementRef.nativeElement, 'display', 'none');
			}
		});

		this.buttons.filter.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.filter._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.filter._elementRef.nativeElement, 'display', 'none');
			}
		});

		this.buttons.search.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.search._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.search._elementRef.nativeElement, 'display', 'none');
			}
		});
	}

}
