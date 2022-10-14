import {compareCourses, Course} from "../model/course";
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import {CourseAction} from "../action-types";

export interface CoursesState extends EntityState<Course>{
  allCoursesLoaded:boolean
}

export const coursesFeatureKey = "courses"

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded:false
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseAction.allCoursesLoaded,
    (state,action)=>adapter.addMany(
      action.courses,
      {...state,allCoursesLoaded:true})
  ),

  on(CourseAction.coursesUpdated,
    (state,action) => adapter.updateOne(action.update,state)
  )
);

export const {
  selectAll
} = adapter.getSelectors();
