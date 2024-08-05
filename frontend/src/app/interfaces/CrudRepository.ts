import { Observable } from "rxjs";

export interface CrudRepository<T>{
    getAll(): Observable<T[]>
    getById(id: string): Observable<T>
    create(obj: T | FormData): Observable<T>
    update(obj: T | FormData): Observable<T>
    delete(id: string): Observable<void>
    searchImg?(filename: string): Observable<Blob>
}