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
    subcategoryTitle?: string;
    galleryImagesUrl?: string[];
    categoryId?: number;
}