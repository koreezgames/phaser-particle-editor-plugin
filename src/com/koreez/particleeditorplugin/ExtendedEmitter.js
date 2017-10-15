// eslint-disable-next-line no-undef
import ExtendedParticle from './ExtendedParticle'

// eslint-disable-next-line no-undef
export default class ExtendedEmitter extends Phaser.Particles.Arcade.Emitter {
  constructor (game, name, properties) {
    super(game, properties.emitX, properties.emitY, properties.maxParticles)
    this.name = name
    this.particleClass = ExtendedParticle
    this.applyProperties(properties)
  }

  applyProperties (properties) {
    this.properties = properties
    this.gravity.x = properties.gravityX
    this.gravity.y = properties.gravityY
    this.setRotation(properties.rotationMin, properties.rotationMax)
    this.emitX = properties.emitX
    this.emitY = properties.emitY
    this.maxParticles = properties.maxParticles
    // eslint-disable-next-line no-undef
    this.blendMode = properties.blendMode
    this.setAlpha(properties.alphaMin, properties.alphaMax, properties.alphaRate,
      // eslint-disable-next-line no-undef
      Phaser.Easing[properties.alphaEase][properties.alphaEaseMode], properties.alphaYoyo)
    if (properties.proportional) {
      this.minParticleScale = properties.minScale
      this.maxParticleScale = properties.maxScale
    } else {
      console.log('applyProperties : scaleRate=' + properties.scaleRate)
      this.setScale(properties.scaleFromX, properties.scaleToX, properties.scaleFromY,
        // eslint-disable-next-line no-undef
        properties.scaleToY, properties.scaleRate, Phaser.Easing[properties.scaleEase][properties.scaleEaseMode],
        properties.scaleYoyo
      )
    }
    this.minParticleSpeed.setTo(properties.minSpeedX, properties.minSpeedY)
    this.maxParticleSpeed.setTo(properties.maxSpeedX, properties.maxSpeedY)
    this.lifespan = properties.lifespan
    this.angularDrag = properties.angularDrag
    this.bounce.setTo(properties.bounceX, properties.bounceY)
    this.width = properties.width
    this.height = properties.height
    if (!properties.explode) {
      this.on = properties.enabled
    }
  }

  resetParticle (particle, x, y) {
    if (this.properties.particleArguments && this.properties.particleArguments.hasOwnProperty('color')) {
      const color = this.properties.particleArguments.color
      // eslint-disable-next-line no-undef
      particle.tint = Phaser.Color.getColor32(particle.alpha, color.start.r, color.start.g, color.start.b)
    }
    super.resetParticle(particle, x, y)
  }
}
