import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { AsyncPipe, CurrencyPipe, DatePipe, LowerCasePipe, NgClass, NgIf, NgStyle, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';

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
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>;

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


  onLike(faceSnapId: number): void {
    if (this.userHasLiked) {
      this.unliked(faceSnapId);
    } else {
      this.liked(faceSnapId);
    }
  }

  liked(faceSnapId: number): void {
    this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'like').pipe(
      tap(() => {
        this.likeButtonString = "Unlike";
        this.userHasLiked = true;
      })
    );
  }
  unliked(faceSnapId: number): void {
    this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unlike').pipe(
      tap(() => {
        this.likeButtonString = "like";
        this.userHasLiked = false;
      })
    );
  }
  private getFaceSnap() {
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }
  private prepareInterface() {
    this.likeButtonString = "Like";
    this.userHasLiked = false;
  }
}