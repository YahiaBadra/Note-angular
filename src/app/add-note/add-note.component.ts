import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Note } from './note.module';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-add-note',
    standalone: true,
    templateUrl: './add-note.component.html',
    styleUrl: './add-note.component.css',
    imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent]
})
export class AddNoteComponent {
  noteForm?: FormGroup;

  constructor(private shared: SharedService, private router: Router) {
    this.noteForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      image: new FormControl(null),
    });
  }

  addNote() {
    this.shared.addNote(this.noteForm?.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/all');
      },
      error: (err) => {
        console.error('Error adding note:', err);
      },
    });

    // this.shared.fetchNotes().subscribe((response) => {
    //   let lengthNote = 0;
    //   if (response !== null) {
    //     lengthNote = response.length;
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.noteForm?.patchValue({ image: reader.result });
      };
    }
  }
}
