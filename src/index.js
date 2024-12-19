import './app.css';

import { Application, Assets, Sprite } from 'pixi.js';

import Penguin from './sprites/Penguin';
import Stats from 'stats.js';

const setup = async _ => {
    const app = new Application();
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);

    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    const penguin = await Penguin({ app, no: 1 });
    const penguin2 = await Penguin({ app, no: 2 });
    penguin2.anchor.set(0.3);
    app.stage.addChild(penguin);
    app.stage.addChild(penguin2);
    
    app.ticker.add((time) => {
        stats.begin();
        penguin.tick(time);
        penguin2.tick(time);
        stats.end();
    });
}

const init = async _ => {
    await setup();
};

init();