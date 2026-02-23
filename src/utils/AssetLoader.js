export class AssetLoader {
    constructor() {
        this.images = {};
        this.totalAssets = 0;
        this.loadedAssets = 0;
    }

    loadImage(key, src) {
        this.totalAssets++;
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                this.images[key] = img;
                this.loadedAssets++;
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Failed to load asset: ${src}`);
                reject();
            };
        });
    }

    getImage(key) {
        return this.images[key];
    }

    isDone() {
        return this.loadedAssets === this.totalAssets;
    }
}

export const assetLoader = new AssetLoader();
