import ExtendedEmitter from './ExtendedEmitter'
import { createImageFromBitmapData } from './utils'
import Phaser from 'phaser'

export default class ParticleEffect extends Phaser.Group {
  constructor(game, particleData, x, y) {
    super(game)
    this.x = x
    this.y = y
    this._emitersMap = new Map()
    this._collidebleEmitters = new Set()
    this._emitX = 0
    this._emitY = 0
    this._arcade = this.game.physics.arcade
    this._initEmitters(particleData)
  }

  get emitX() {
    return this._emitX
  }

  set emitX(x) {
    this._emitX = x
    // eslint-disable-next-line no-unused-vars
    for (let [key, emitter] of this._emitersMap) {
      emitter.emitX = emitter.properties.emitX + this.emitX
    }
  }

  get emitY() {
    return this._emitY
  }

  set emitY(y) {
    this._emitY = y
    // eslint-disable-next-line no-unused-vars
    for (let [key, emitter] of this._emitersMap) {
      emitter.emitY = emitter.properties.emitY + this.emitY
    }
  }

  _initEmitters(particleData) {
    const emitters = particleData.emitters
    for (let emitterName in emitters) {
      if (!emitters.hasOwnProperty(emitterName)) {
        continue
      }
      const emitterProperties = emitters[emitterName]
      this.addEmitter(emitterName, emitterProperties)
    }
  }

  _createEmitter(name, properties) {
    return new ExtendedEmitter(this.game, name, properties)
  }

  add(child, silent, index) {
    super.add(child, silent, index)
    this._emitersMap.set(child.name, child)
  }

  remove(child, destroy, silent) {
    super.remove(child, destroy, silent)
    this._emitersMap.delete(child.name)
  }

  _emit(emitter, properties) {
    if (!properties.enabled) {
      return
    }
    if (properties.flow) {
      emitter.flow(
        0,
        properties.frequency,
        properties.quantity,
        properties.total,
        properties.immediate,
      )
    } else {
      emitter.start(
        properties.explode,
        0,
        properties.frequency,
        properties.total,
      )
    }
  }

  update() {
    super.update()
    for (const emitter of this._collidebleEmitters) {
      this._arcade.collide(emitter)
    }
  }

  emit() {
    // eslint-disable-next-line no-unused-vars
    for (let [key, emitter] of this._emitersMap) {
      this._emit(emitter, emitter.properties)
    }
  }

  _onEmitterImageUpdate(name, properties) {
    this._recreateEmitter(name, properties)
  }

  _recreateEmitter(name, properties) {
    this.removeEmitter(name)
    this.addEmitter(name, properties)
  }

  addEmitter(name, properties, autoEmit = true) {
    createImageFromBitmapData(
      this.game,
      properties[name],
      name,
      () => {
        const emitter = this._createEmitter(name, properties)
        this.add(emitter)
        emitter.makeParticles(
          emitter.name,
          properties.frames,
          properties.maxParticles,
          properties.collide,
          properties.collideWorldBounds,
          properties.particleArguments,
        )
        this.updateEmitterProperties(name, properties)
        if (autoEmit) {
          this._emit(emitter, properties)
        }
        if (properties.collide || properties.collideWorldBounds) {
          this._collidebleEmitters.add(emitter)
        } else {
          this._collidebleEmitters.delete(emitter)
        }
      },
      null,
      false,
    )
  }

  removeEmitter(name) {
    this.remove(this._emitersMap.get(name))
  }

  updateEmitterImage(name, properties) {
    createImageFromBitmapData(
      this.game,
      properties[name],
      name,
      this._onEmitterImageUpdate.bind(this, name, properties),
    )
  }

  updateEmitterProperties(name, properties) {
    const emitter = this._emitersMap.get(name)
    emitter.applyProperties(properties)
    this._emit(emitter, properties)
  }

  updateEmitterOption(name, properties) {
    this._recreateEmitter(name, properties)
  }
}
