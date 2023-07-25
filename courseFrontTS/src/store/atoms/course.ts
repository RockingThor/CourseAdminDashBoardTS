import { atom } from "recoil";

export interface Course{
    title: string|undefined|null;
    description: string|undefined|null;
    price: string|undefined|null;
    image: string|undefined|null;
    createdBy: string|undefined|null;
}

export interface CourseState{
    isLoading: boolean;
    course: Course | null;
}

export const courseState= atom<CourseState>({
    key: 'courseState',
    default:{
        isLoading: true,
        course: null
    },
});