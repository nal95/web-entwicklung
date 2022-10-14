import {Course} from "../model/course";
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export interface CoursesState extends EntityState<Course>{

}

export const adapter = createEntityAdapter<Course>();

