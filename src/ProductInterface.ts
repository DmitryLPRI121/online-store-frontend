export interface IProduct {
    id: number;
    title: string;
    description?: string;
    rating: number;
    // Reviews: number;
    quantity?: number;
    price: number;
    attributes?: { [key: string]: string };
    imageUrl?: string;
    galleryImagesUrl?: string[];
}