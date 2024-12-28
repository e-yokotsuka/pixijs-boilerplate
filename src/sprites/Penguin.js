import { Assets, Sprite } from "pixi.js";

import { sound } from "@pixi/sound";

const Penguin = async ({ app, no = 1 }) => {
  const { textures } = await Assets.load("./assets/sprites.json");
  const sprite = new Sprite(textures[`pen${no}.png`]);
  !sound.exists("chicken") && sound.add("chicken", "./assets/sound/chicken.mp3");
  sprite.interactive = true;
  sprite.on("pointerdown", _ => {
    sound.play("chicken");
    console.log("pointerdown");
  });
  sprite.anchor.set(0.5);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;
  sprite.tick = time => {
    sprite.rotation += 0.05 * time.deltaTime;
  };
  return sprite;
};

export default Penguin;


