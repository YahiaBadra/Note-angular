import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  router = inject(Router);
  logout() {
    console.log('Logged out');
    const user = JSON.parse(localStorage.getItem('userData')!);
    if (user) {
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    }
  }
}
