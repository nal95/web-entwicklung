import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {finalize, first, tap} from "rxjs/operators";
import {CourseAction} from "./action-types";

@Injectable()
export class CoursesResolver implements Resolve<any>{
  loading = false;
  constructor( private store:Store) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return  this.store
      .pipe(
        tap(()=>{
          if(!this.loading){
            this.loading = true;
            this.store.dispatch(CourseAction.loadAllCourses());
          }}),
        first(),
        finalize(()=>this.loading = false)
      )
  }
}
