import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";

@Injectable({
    providedIn: 'root'
})

export class FaceSnapsService {
    private faceSnaps: FaceSnap[] = [
        new FaceSnap(
            "Léonard",
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWszCzs4OX_VYwdMIjBSXlZRuvK7xf3aBXSb8R2nyJJvJI6Vi',
            "Un pur génie !",
            new Date(),
            2),
        new FaceSnap(
            "PikaChu",
            'https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg',
            "Mignon mais éléctrique",
            new Date(),
            113),
        new FaceSnap(
            "Samba",
            'https://www.aquabase.org/storage/2023/10/Shih-Tzu.jpg',
            "Shih Tzu plein de mordant !",
            new Date(),
            254).withLocation('Prise en pleine promenade')
    ];

    getFaceSnaps(): FaceSnap[] {
        return [...this.faceSnaps]
    }

    getFaceSnapById(faceSnapId: string): FaceSnap {
        const foundFaceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
        if (!foundFaceSnap) {
            throw new Error('FaceSnap not found !');
        }
        return foundFaceSnap;
    }

    snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
        const faceSnap = this.getFaceSnapById(faceSnapId);
    }

    addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): void {
        const faceSnap = new FaceSnap(
            formValue.title,
            formValue.imageUrl,
            formValue.description,
            new Date(),
            0
        );

        // Si le formulaire contient une location, on l'ajoute
        if (formValue.location) {
            faceSnap.setLocation(formValue.location);
        }

        this.faceSnaps.push(faceSnap);
    }
}