import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CourseAction} from "./action-types";
import {concatMap, map} from "rxjs/operators";
import {CoursesHttpService} from "./services/courses-http.service";

@Injectable()
export class CoursesEffects{
  loadCourses$ = createEffect(
    ()=> this.actions$
      .pipe(
        ofType(CourseAction.loadAllCourses),
        concatMap(action=>
          this.coursesHttpService.findAllCourses()),
        map(courses=>CourseAction.allCoursesLoaded({courses}))
      )
  )

  saveCourse$ = createEffect(
    ()=>this.actions$
      .pipe(
        ofType(CourseAction.coursesUpdated),
        concatMap(action=>this.coursesHttpService.saveCourse(
          action.update.id,
          action.update.changes
        ))
      ),
    {dispatch:false}
  )
  constructor(private actions$:Actions,
              private coursesHttpService:CoursesHttpService) {
  }
}
