import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseDatabase, FirebaseFirestore, FirebaseFunctions } from '@angular/fire';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  squares;
  dblist: AngularFirestoreCollection<any>;

  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public ngZone: NgZone
  ) {
    this.dblist = this.afs.collection<any>('squares', ref => {
      return ref.where("game", "==", 1)
    });

     this.dblist.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          console.log('data', data)
          let retval = JSON.parse(JSON.stringify(data));
          this.squares=retval;
          return { retval };
        });
      })).subscribe();

 

  }

  ngOnInit() {

  }


  getSquare() {

    //const db = getFirestore(app);
  }

}
