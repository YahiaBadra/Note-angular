import { Injectable } from '@angular/core';
import { Note } from './add-note/note.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  notes: any[] = [];

  addNote(note: Note) {
    return this.http.post(
      `https://test-5ef1a-default-rtdb.firebaseio.com/notes.json`,
      note
    );
  }

  deleteNote(noteId: string): Observable<any> {
    return this.http.delete<any>(`https://test-5ef1a-default-rtdb.firebaseio.com/notes.json/${noteId}`);
  
  }

  updateNote(key: string, note: Note) {
    return this.http.patch(
      `https://test-5ef1a-default-rtdb.firebaseio.com/notes/${key}.json`,
      note
    );
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(
      `https://test-5ef1a-default-rtdb.firebaseio.com/notes/${id}.json`
    );
  }

  fetchNotes() {
    return this.http.get(
      'https://test-5ef1a-default-rtdb.firebaseio.com/notes/.json'
    );
  }
}

function returnArgument<T>(arg: T): T {
  return arg;
}
