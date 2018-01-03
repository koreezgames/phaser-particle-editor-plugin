import ParticleEffect from './ParticleEffect'
import Phaser from 'phaser'

export default class ParticleEditorPlugin extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent)
    this.addParticleFactory()
  }

  addParticleFactory() {
    Phaser.GameObjectFactory.prototype.particleEffect = (x, y, key, group) => {
      const particle = new ParticleEffect(this.game, this.getData(key), x, y)
      return (group || this.game.world).add(particle)
    }
    Phaser.GameObjectCreator.prototype.particleEffect = (x, y, key) => {
      return new ParticleEffect(this.game, this.getData(key), x, y)
    }
  }

  getData(key) {
    if (typeof key === 'string') {
      return this.game.cache.getJSON(key)
    }
    return key
  }
}
