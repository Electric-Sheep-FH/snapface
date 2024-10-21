import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { CurrencyPipe, DatePipe, LowerCasePipe, NgClass, NgStyle, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;

  likeButtonString!: string;
  userHasLiked!: boolean;

  constructor(private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.prepareInterface();
    this.getFaceSnap();
  }


  onLike(): void {
    if (this.userHasLiked) {
      this.unliked();
    } else {
      this.liked();
    }
  }

  liked(): void {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'like');
    this.likeButtonString = "Unlike";
    this.userHasLiked = true;
  }
  unliked(): void {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unlike');
    this.likeButtonString = "Like";
    this.userHasLiked = false;
  }
  private getFaceSnap() {
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }
  private prepareInterface() {
    this.likeButtonString = "Like";
    this.userHasLiked = false;
  }
}