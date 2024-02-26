import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AllNoteComponent } from './all-note/all-note.component';
import { AboutComponent } from './about/about.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { AuthComponent } from './auth/auth.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'all', component: AllNoteComponent },
  { path: 'add', component: AddNoteComponent },
  { path: 'about', component: AboutComponent },
  { path: 'update', component: UpdateComponent },
];
