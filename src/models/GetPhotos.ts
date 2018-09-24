export interface Urls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

export interface Links {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

export interface Links2 {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
}

export interface ProfileImage {
    small: string;
    medium: string;
    large: string;
}

export interface User {
    id: string;
    updated_at: Date;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username?: any;
    portfolio_url: string;
    bio: string;
    location: string;
    links: Links2;
    profile_image: ProfileImage;
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
}

export interface GetPhotos {
    id: string;
    created_at: Date;
    updated_at: Date;
    width: number;
    height: number;
    color: string;
    description?: any;
    urls: Urls;
    links: Links;
    categories: any[];
    sponsored: boolean;
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    slug?: any;
    user: User;
}
