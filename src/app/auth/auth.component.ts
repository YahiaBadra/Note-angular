import {
  Component,
  ComponentFactoryResolver,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingComponent as LoadingComponent } from './shared/loading/loading.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
    imports: [AlertComponent, LoadingComponent, FormsModule, CommonModule]
})
export class AuthComponent implements OnInit, OnDestroy {
  hideHeader: boolean = true;
  hideFooter: boolean = true;
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild(PlaceholderDirective) alertHost?: PlaceholderDirective;
  private closeSub?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('userData')!);
      if (user) {
        this.router.navigate(['/add']);
      }
    }
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submit(form: NgForm) {
    const { email, password } = form.value;
    this.isLoading = true;
    if (!this.isLoginMode) {
      this.authService.register(email, password).subscribe(
        (response) => {
          this.router.navigate(['add']);
          this.isLoading = false;
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        }
      );
    } else {
      this.authService.login(email, password).subscribe(
        (response: any) => {
          localStorage.setItem('userData', JSON.stringify(response));
          const user = JSON.parse(localStorage.getItem('userData')!);
          if (user) {
            this.ngOnInit();
          }

          this.isLoading = false;
        },
        (errorMessage: string | null) => {
          console.log(errorMessage);
          this.error = errorMessage;

          this.isLoading = false;
        }
      );
    }
  }
  onHandelError() {
    this.error = null;
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  private showErrorAlert(message: string) {
    const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost?.viewContainerRef;
    hostViewContainerRef?.clear();

    const ComponentRef = hostViewContainerRef?.createComponent(alertCmpFactory);
    ComponentRef!.instance.message = message;

    this.closeSub = ComponentRef?.instance.close.subscribe(() => {
      this.closeSub?.unsubscribe();
      hostViewContainerRef?.clear();
    });
  }
}
