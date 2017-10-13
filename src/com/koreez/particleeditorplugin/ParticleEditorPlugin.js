import ParticleEffect from './ParticleEffect'

// eslint-disable-next-line no-undef
export default class ParticleEditorPlugin extends Phaser.Plugin {
  constructor (game, parent) {
    super(game, parent)
    this.addParticleFactory()
  }

  addParticleFactory () {
    // eslint-disable-next-line no-undef
    Phaser.GameObjectFactory.prototype.particle = (x, y, key, group) => {
      const particle = new ParticleEffect(this.game, this.getData(key), x, y)
      return (group || this.game.world).add(particle)
    }
    // eslint-disable-next-line no-undef
    Phaser.GameObjectCreator.prototype.particle = (x, y, key) => {
      return new ParticleEffect(this.game, x, y, this.getData(key))
    }
  }

  getData (key) {
    if (typeof key === 'string') {
      return this.game.cache.getJSON(key)
    }
    return key
  }
}
