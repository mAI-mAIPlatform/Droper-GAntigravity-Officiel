import { Wall } from '../entities/Wall';
import mapData from '../data/maps.json';

export class MapGenerator {
    constructor() {
        this.walls = [];
    }

    generateMap(mapId) {
        const layout = mapData[mapId];
        if (!layout) return [];

        this.walls = layout.walls.map(w => new Wall(w.x, w.y, w.width, w.height));
        return this.walls;
    }

    getWalls() {
        return this.walls;
    }
}
