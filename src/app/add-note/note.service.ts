import { Injectable } from '@angular/core';
import { Note } from './note.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notesChanged = new Subject<Note[]>();
  private notes: Note[] = [];

  constructor() {}
  // getNotes() {
  //   return this.notes.slice();
  // }

  // getNote(id: number) {
  //   return this.notes.find((note) =>note.id === id);
  // }
  // addNote(note: Note) {
  //   this.notes.push(note);
  //   this.notesChanged.next(this.notes.slice());
  // }
  // updateNote(index: number, newNote: Note) {
  //   this.notes[index] = newNote;
  //   this.notesChanged.next(this.notes.slice());
  // }
  // deleteNote(id: number) {
  //   this.notes.splice(id, 1);
  //   this.notesChanged.next(this.notes.slice());
  // }
}
