import { Component, Input, OnInit, inject } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router, response } from 'express';
import { Note } from '../add-note/note.module';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-all-note',
    standalone: true,
    templateUrl: './all-note.component.html',
    styleUrl: './all-note.component.css',
    imports: [HeaderComponent, FooterComponent]
})
export class AllNoteComponent implements OnInit {
  // notes: any;
  // share = inject(SharedService);
  // private router = inject(Router);
  // notes: any;

  // delete(key: string) {
  //   this.share.deleteNote(key).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       this.loadNotes();
  // },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }
  // // edit(key: string) {
  // //     this.router.navigateByUrl('/update');
  // //   }

  // loadNotes() {
  //   this.share.fetchNotes().subscribe((notesResponse :any ) => {
  //     if (notesResponse === null) return;
  //     this.notes = Object.entries(notesResponse);

  //     // for (let i = 0; i < this.notes.length; i++) {
  //     //   console.log('Key: ', this.notes[i][0]);
  //     //   console.log('Title: ', this.notes[i][1].title);
  //     //   console.log('content: ', this.notes[i][1].content);
  //     // }
  //   });
  // }

  // ngOnInit(): void {
  //   // this.loadNotes();
  // }
  notes: any[] = [];
  shared: any;
  router: any;
  @Input() noteId: string | undefined;
someNoteId: string|undefined;


  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes() {
    this.sharedService.fetchNotes().subscribe((response: any) => {
      if (response) {
        this.notes = Object.keys(response).map((key) => ({
          id: key,
          ...response[key],
        }));
      }
    });
  }
  editNote(note: any) {
   this.router.navigateByUrl(`/edit/${note.key}`);
  }

  deleteNote(noteId: string) {
    this.sharedService.deleteNote(noteId).subscribe(
      (response) => {
        console.log('Note deleted successfully!', response);
      },
      (error) => {
        console.error('Error deleting note:', error);
      }
    );
  }
}
