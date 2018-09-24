import { Injectable } from '@angular/core';
@Injectable()
export class Environment {
    get utmlink(): string {
        return `https://unsplash.com/@username?utm_source=your_app_name&utm_medium=referral`;
    }
    get unsplashApi(): any {
        return {
            accessKey: `52d46a2276ca5fca3f40a72e8aed109e682b21a83c38cd3372cabd8d1e8b9c40`,
            secretKey: `51191bbb958d123a6c3ed6eb22d411fd87798e43dc5d5aea65d1b341e12a796e`,
            url: `https://api.unsplash.com/`
        }
    }
}