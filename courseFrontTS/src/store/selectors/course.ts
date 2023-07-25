import { selector } from "recoil";
import { courseState } from "../atoms/course";

export const isCourseLoading = selector({
    key: 'isCourseLoading',
    get: ({get})=>{
        const state=get(courseState);
        return state.isLoading;
    }
});

export const courseTitle= selector({
    key: 'courseTitle',
    get: ({get})=>{
        const state= get(courseState);
        if(state.course==null){
            return null;
        }
        return state.course.title;
    }
});

export const courseDescription= selector({
    key: 'courseDescription',
    get: ({get})=>{
        const state= get(courseState);
        if(state.course==null){
            return null;
        }
        return state.course.description;
    }
});

export const coursePrice= selector({
    key: 'coursePrice',
    get: ({get})=>{
        const state= get(courseState);
        if(state.course==null){
            return null;
        }
        return state.course.price;
    }
});

export const courseImage= selector({
    key: 'courseImage',
    get: ({get})=>{
        const state= get(courseState);
        if(state.course==null){
            return null;
        }
        return state.course.image;
    }
});

export const courseDetails= selector({
    key: 'courseDetails',
    get: ({get})=>{
        const state= get(courseState);
        if(state.course==null){
            return null;
        }
        return state.course;
    }
});