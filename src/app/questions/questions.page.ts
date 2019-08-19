import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  questions

  constructor(private route: ActivatedRoute, private database: AngularFireDatabase) { 

  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      const id = data['id']

      this.database.list(`quiz/${id}`).snapshotChanges().subscribe(snapshots => {
        this.questions = snapshots.map(snapshot => {
          const answers = snapshot.payload.val()
          answers['question'] = snapshot.key

          return answers
        })
      })
    })
  }

}
