import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  categories

  constructor(private database: AngularFireDatabase, private navCtrl: NavController) {
    this.database.list(`categories`).snapshotChanges().subscribe(snapshots => {
      this.categories = snapshots.map(snapshot => {
        const category = snapshot.payload.val()
        category['id'] = snapshot.key

        return category
      })
    })
    
    
    // .valueChanges().subscribe(categories => {
    //   this.categories = categories
    // })
  }

  openCategory(category) {
    this.navCtrl.navigateForward(`questions/${category.id}`)
  }
}
