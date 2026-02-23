import { Volt } from '../entities/heroes/Volt';
import { ProjectileManager } from './ProjectileManager';
import { Renderer } from '../renderers/Renderer';

export class GameEngine {
    constructor(canvas, inputs) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.lastTime = 0;
        this.isRunning = false;
        this.inputs = inputs;

        // Systems
        this.projectileManager = new ProjectileManager();
        this.renderer = new Renderer(this.ctx);

        // Game Objects
        this.player = new Volt(this.width / 2, this.height / 2);

        // Bindings
        this.loop = this.loop.bind(this);
    }

    start() {
        this.isRunning = true;
        requestAnimationFrame(this.loop);
    }

    stop() {
        this.isRunning = false;
    }

    loop(timestamp) {
        if (!this.isRunning) return;

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime, this.inputs.current);
        this.render();

        requestAnimationFrame(this.loop);
    }

    update(dt, inputs) {
        if (!inputs) return;

        // Update player
        this.player.update(dt, inputs, this.width, this.height, this.projectileManager);

        // Update projectiles
        this.projectileManager.update(dt, this.width, this.height);
    }

    render() {
        // Use the centralized renderer
        this.renderer.clear(this.width, this.height);
        this.renderer.drawGrid(this.width, this.height);
        this.renderer.drawProjectiles(this.projectileManager.getProjectiles());
        this.renderer.drawPlayer(this.player);
    }

    resize(w, h) {
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
    }
}

