import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from "moment";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { CourseService } from "../services/course.service";
import { LoadingService } from "../services/loading.service";
import { MessageService } from "../services/message.service";
import { CourseStoreService } from "../services/course-store.service";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
  providers: [LoadingService, MessageService],
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private courseService: CourseService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private courseStore: CourseStoreService,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngAfterViewInit() {}

  save() {
    const changes = this.form.value;
    this.courseStore.saveCourse(this.course.id, changes).subscribe();
    this.dialogRef.close(changes);
  }
  savewithoutStore() {
    const changes = this.form.value;
    const saveCourse$ = this.courseService
      .saveCourse(this.course.id, changes)
      .pipe(
        catchError((err) => {
          const message = "Could not save Course";
          this.messageService.showErrors(message);
          return throwError(err);
        })
      );
    this.loadingService.showLoaderuntilCompleted(saveCourse$).subscribe(
      (succ) => {
        this.dialogRef.close(succ);
      },
      (err) => {},
      () => {}
    );
  }

  close() {
    this.dialogRef.close();
  }
}
