import './app.css';

import { Application } from 'pixi.js';
import Penguin from './sprites/Penguin';
import Stats from 'stats.js';

const app = new Application({
    backgroundColor: 0x1099bb
});

const dom = document.getElementById('contents');

const setup = async _ => {
    const stats = new Stats();
    stats.showPanel(0);
    dom.appendChild(stats.dom);
    const penguin = await Penguin({ app, no: 1 });
    const penguin2 = await Penguin({ app, no: 2 });
    penguin2.anchor.set(0.3);
    app.stage.addChild(penguin);
    app.stage.addChild(penguin2);

    app.ticker.add((delta) => {
        stats.begin();
        penguin.tick(delta);
        penguin2.tick(delta);
        stats.end();
    });
}

const init = async _ => {
    dom.appendChild(app.view);
    await setup();
};
init();