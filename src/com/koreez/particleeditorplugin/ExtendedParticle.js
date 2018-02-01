import Phaser from 'phaser'

export default class ExtendedParticle extends Phaser.Particle {
  constructor (game, x, y, key, frame, particleArguments) {
    super(game, x, y, key, frame)
    this.particleArgumentsColor = particleArguments['color'] || null
  }

  onEmit () {
    if (this.particleArgumentsColor) {
      const startColor = Phaser.Color.createColor(
        this.particleArgumentsColor.start.r,
        this.particleArgumentsColor.start.g,
        this.particleArgumentsColor.start.b,
      )

      const tween = this.game.add
        .tween(startColor)
        .to(
          this.particleArgumentsColor.end,
          this.particleArgumentsColor.rate,
          Phaser.Easing[this.particleArgumentsColor.ease][
            this.particleArgumentsColor.easeMode
          ],
          true,
          this.particleArgumentsColor.delay,
        )

      tween.onUpdateCallback(this.updateColor.bind(this))
      tween.onComplete.add(this.onTweenComplete, this)
    }
    super.onEmit()
  }

  updateColor (tween) {
    Phaser.Color.updateColor(tween.target)
    this.tint = Phaser.Color.getColor32(
      this.alpha,
      tween.target.r,
      tween.target.g,
      tween.target.b,
    )
  }

  onTweenComplete (tween) {
    this.game.tweens.remove(tween)
  }
}
