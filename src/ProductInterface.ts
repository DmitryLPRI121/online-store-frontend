export interface IProduct {
    id: number;
    Title: string;
    Description?: string;
    Rating: number;
    Reviews: number;
    Quantity?: number;
    Price: number;
    Attributes?: { [key: string]: string };
    CoverUmageUrl?: string;
    GalleryImagesUrl?: string[];
}