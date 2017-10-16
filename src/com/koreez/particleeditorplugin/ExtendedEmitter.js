import Phaser from 'phaser'
import ExtendedParticle from './ExtendedParticle'

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
    this.blendMode = properties.blendMode
    this.setAlpha(properties.alphaMin, properties.alphaMax, properties.alphaRate,
      Phaser.Easing[properties.alphaEase][properties.alphaEaseMode], properties.alphaYoyo)
    if (properties.randomScale) {
      this.minParticleScale = properties.minScale
      this.maxParticleScale = properties.maxScale
    } else {
      this.setScale(properties.scaleFromX, properties.scaleToX, properties.scaleFromY,
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
    super.resetParticle(particle, x, y)
    if (this.properties.particleArguments.hasOwnProperty('color')) {
      const color = this.properties.particleArguments.color
      particle.tint = Phaser.Color.getColor32(particle.alpha, color.start.r, color.start.g, color.start.b)
    }
    if (this.properties.particleArguments.hasOwnProperty('startRotation')) {
      const startRotation = this.properties.particleArguments.startRotation
      particle.angle = this.game.rnd.integerInRange(startRotation.min, startRotation.max)
    }
    if (this.properties.particleArguments.hasOwnProperty('anchor')) {
      const anchor = this.properties.particleArguments.anchor
      particle.anchor.setTo(anchor.x, anchor.y)
    }
  }
}
