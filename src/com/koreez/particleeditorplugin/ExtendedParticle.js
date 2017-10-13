// eslint-disable-next-line no-undef
export default class ExtendedParticle extends Phaser.Particle {
  constructor (game, x, y, key, frame, particleArguments) {
    super(game, x, y, key, frame)
    this.particleArguments = particleArguments
  }

  onEmit () {
    if (this.particleArguments && this.particleArguments.hasOwnProperty('color')) {
      const colorArguments = this.particleArguments.color

      // eslint-disable-next-line no-undef
      const startColor = Phaser.Color.createColor(colorArguments.start.r, colorArguments.start.g,
        colorArguments.start.b)

      const tween = this.game.add.tween(startColor)
      // eslint-disable-next-line no-undef
        .to(colorArguments.end, colorArguments.rate, Phaser.Easing[colorArguments.ease][colorArguments.easeMode],
          true, colorArguments.delay)

      tween.onUpdateCallback(this.updateColor.bind(this))
    }
    super.onEmit()
  }

  updateColor (tween) {
    // eslint-disable-next-line no-undef
    Phaser.Color.updateColor(tween.target)
    // eslint-disable-next-line no-undef
    this.tint = Phaser.Color.getColor32(this.alpha, tween.target.r, tween.target.g, tween.target.b)
  }
}
