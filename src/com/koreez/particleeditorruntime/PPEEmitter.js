/* eslint-disable no-undef */
export default class PPEEmitter extends Phaser.Particles.Arcade.Emitter {
  constructor (game, name, properties) {
    super(game, properties.emitX, properties.emitY, properties.maxParticles)
    this.name = name
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
    this.setAlpha(properties.alphaMin, properties.alphaMax, properties.alphaRate,
      Phaser.Easing[properties.alphaEase][properties.alphaEaseMode], properties.alphaYoyo)
    if (properties.proportional) {
      this.minParticleScale = properties.minScale
      this.maxParticleScale = properties.maxScale
    } else {
      this.setScale(properties.scaleFromX, properties.scaleToX, properties.scaleFromY,
        properties.scaleToY, properties.scaleRate, Phaser.Easing[properties.scaleEase][properties.scaleEaseMode],
        properties.scaleYoyo)
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
}
