import { SnapType } from "./snap-type.type";

export class FaceSnap {
    location?: string;
    // id: number;

    constructor(public title: string,
        public imageUrl: string,
        public description: string,
        public createdAt: Date,
        public snaps: number,
        public id: number
    ) {
        // this.id = crypto.randomUUID().substring(0, 8);
    }

    like(snapType: SnapType): void {
        if (snapType === 'like') {
            this.liked();
        } else {
            this.unliked();
        }
    }

    liked(): void {
        this.snaps++;
    }
    unliked(): void {
        this.snaps--;
    }

    setLocation(location: string): void {
        this.location = location
    }

    withLocation(location: string): FaceSnap {
        this.setLocation(location);
        return this;
    }

}