import { Injectable } from '@angular/core';
import { File, Entry } from '@ionic-native/file';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class DownloadService {
    /**
     *
     */
    filesDirectory = this.file.externalDataDirectory;

    readFile$ = new Subject<Entry[]>();

    readFileEvent = this.readFile$.asObservable();

    constructor(private file: File) {
    }

    readFiles(): void {
        this.file.listDir(this.filesDirectory, 'Downloads')
            .then((data) => {
                this.readFile$.next(data);
            }).catch((err) => {
                this.readFile$.error(err);
            });

    }

    deleteFile(item: Entry, success?: any, error?: any) {
        this.file.removeFile(`${this.filesDirectory}/Downloads`, item.name)
            .then((ok) => {
                this.readFiles();
                success();
            }).catch((err) => {
                error(err);
            });
    }
}