import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUser = signal<UserInterface | null | undefined>(undefined);
  constructor() {}

  login(data: any): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      data.email,
      data.password
    ).then(() => {});
    return from(promise);
  }
  signup(data: any): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      data.email,
      data.password
    ).then((response) =>
      updateProfile(response.user, { displayName: data.userName })
    );
    return from(promise);
  }

  signOut() {
    return this.firebaseAuth.signOut();
  }
}
