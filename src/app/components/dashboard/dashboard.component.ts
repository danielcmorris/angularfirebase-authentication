import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseDatabase, FirebaseFirestore, FirebaseFunctions, } from '@angular/fire';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Box, Square } from 'src/app/models/square';
import { SafeMethodCall } from '@angular/compiler';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  square$: Observable<Square[]>;
  squares;
  boxes;
  boxes$: Observable<Box[]>;
  dblist: AngularFirestoreCollection<any>;

  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public ngZone: NgZone
  ) {

    this.getSquare(11);
  }

  async ngOnInit() {

    this.square$.subscribe(data => {
      let id = data[0].id;
      this.squares = data[0]

      this.getSquareBoxes(id)
      this.boxes$.subscribe(myBoxes => {
        this.boxes = myBoxes;
        this.squares.boxes = myBoxes;
      })


    })
  }

  getSquare(gameNumber: number) {
    this.square$ = this.afs.collection<Square>('squares', ref => {
      return ref.where("game", "==", gameNumber)
    })
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Square;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getSquareBoxes(squareId: string) {
    console.log('getting boxes for ', squareId)
 
    this.boxes$ = this.afs.collection<Box>('boxes', ref => {
      return ref.where("squareId", "==", squareId)
    })
      // .snapshotChanges().pipe(
      //   map(actions => actions.map(a => {
      //     const data = a.payload.doc.data() as Box;
      //     const id = a.payload.doc.id;
      //     return { id, ...data };
      //   }))
      // )
      .valueChanges({ idField: 'id' });
  }

  renameBox(val) {
    let b = this.boxes[0]
    this.afs.doc('boxes/' + b.id).update({ name: val }).then(retval => {
      console.log(retval);
    })
  }
 addBox(name,home,away) {
   
   let  box:Box={name:name,home:home,away:away,squareId:this.squares.id, uid:this.authService.userData.uid};

    let b = this.boxes[0]
    this.afs.collection('boxes').add(box).then(retval => {
      console.log('added box',retval);
    })
  }
  deleteBox(id?){
    
    const tutorialsRef = this.afs.collection('boxes').doc(id).delete();
  }

}
