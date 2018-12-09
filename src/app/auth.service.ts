import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {UserRole} from './user-role';
import {AngularFirestore} from '@angular/fire/firestore';

export class Credentials {
  constructor(public email: string, public password: string) {
  }
}

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly authState: Observable<User | null> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) {
  }

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  login({email, password}: Credentials) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register({email, password}: Credentials) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email,
      password);
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }

  isAdmin(): Observable<boolean> {
    return this.authState.pipe(switchMap(user => {
        if (user !== null) {
          return this.firestore.doc<UserRole>(`users/${user.uid}`).valueChanges()
            .pipe(map(userRole => {
              if (!userRole) {
                return false;
              }
              const isAdmin = userRole.role === 'admin';
              if (!isAdmin) {
              }
              return isAdmin;
            }));
        }
        return Observable.create(false);
      }
    ));
  }

  isEmployee(): Observable<boolean> {
    return this.authState.pipe(switchMap(user => {
        if (user !== null) {
          return this.firestore.doc<UserRole>(`users/${user.uid}`).valueChanges()
            .pipe(map(userRole => {
              if (!userRole) {
                return false;
              }
              const isEmployee = userRole.role === 'admin' || userRole.role === 'employee';
              if (!isEmployee) {
              }
              return isEmployee;
            }));
        }
        return Observable.create(false);
      }
    ));
  }
}
