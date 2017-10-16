import Phaser from 'phaser'

export default class ExtendedParticle extends Phaser.Particle {
  constructor (game, x, y, key, frame, particleArguments) {
    super(game, x, y, key, frame)
    this.particleArguments = particleArguments
  }

  onEmit () {
    if (this.particleArguments && this.particleArguments.hasOwnProperty('color')) {
      const colorArguments = this.particleArguments.color

      const startColor = Phaser.Color.createColor(colorArguments.start.r, colorArguments.start.g,
        colorArguments.start.b)

      const tween = this.game.add.tween(startColor)
        .to(colorArguments.end, colorArguments.rate, Phaser.Easing[colorArguments.ease][colorArguments.easeMode],
          true, colorArguments.delay)

      tween.onUpdateCallback(this.updateColor.bind(this))
      tween.onComplete.add(this.onTweenComplete, this)
    }
    super.onEmit()
  }

  updateColor (tween) {
    Phaser.Color.updateColor(tween.target)
    this.tint = Phaser.Color.getColor32(this.alpha, tween.target.r, tween.target.g, tween.target.b)
  }

  onTweenComplete (tween) {
    this.game.tweens.remove(tween)
  }
}
