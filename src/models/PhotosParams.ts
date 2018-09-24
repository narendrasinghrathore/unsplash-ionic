export interface PhotosParam {
    page: number;
    per_page: number;
    order_by: PhotoOrderBy

}

export enum PhotoOrderBy {
    Latest = 'latest',
    Oldest = 'oldest',
    Popular = 'popular'
}