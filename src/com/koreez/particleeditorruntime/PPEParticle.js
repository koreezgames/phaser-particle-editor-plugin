import PPEEmitter from './PPEEmitter'
import { createImageFromBitmapData } from './utils'

export default class PPEParticle {
  constructor (game, parent, particleData = null) {
    this.game = game
    this._parent = parent
    this._parentUpdate = this._parent.update.bind(this._parent)
    this._parent.update = this._update.bind(this)
    this._emitersMap = new Map()
    this._collidebleEmitters = new Set()
    this._emitX = 0
    this._emitY = 0
    this._arcade = this.game.physics.arcade
    if (particleData !== null) {
      this._initEmitters(particleData)
    }
  }

  get x () {
    return this._parent.x
  }

  set x (x) {
    this._parent.x = x
  }

  get y () {
    return this._parent.y
  }

  set y (y) {
    this._parent.y = y
  }

  get emitX () {
    return this._emitX
  }

  set emitX (x) {
    this._emitX = x
    // eslint-disable-next-line no-unused-vars
    for (let [key, emitter] of this._emitersMap) {
      emitter.emitX = emitter.properties.emitX + this.emitX
    }
  }

  get emitY () {
    return this._emitY
  }

  set emitY (y) {
    this._emitY = y
    // eslint-disable-next-line no-unused-vars
    for (let [key, emitter] of this._emitersMap) {
      emitter.emitY = emitter.properties.emitY + this.emitY
    }
  }

  _initEmitters (particleData) {
    const emitters = particleData.emitters
    for (let emitterName in emitters) {
      if (!emitters.hasOwnProperty(emitterName)) {
        continue
      }
      const emitterProperties = emitters[emitterName]
      this.addEmitter(emitterName, emitterProperties)
    }
  }

  _createEmitter (name, properties) {
    return new PPEEmitter(this.game, name, properties)
  }

  _add (child, silent, index) {
    this._parent.add(child, silent, index)
    this._emitersMap.set(child.name, child)
  }

  _remove (child, destroy, silent) {
    this._parent.remove(child, destroy, silent)
    this._emitersMap.delete(child.name)
  }

  _emit (emitter, properties) {
    if (!properties.enabled) {
      return
    }
    if (properties.flow) {
      // flow function (lifespan, frequency, quantity, total, immediate)
      emitter.flow(properties.lifespan, properties.frequency, properties.quantity, properties.total,
        properties.immediate)
    } else {
      // start function (explode, lifespan, frequency, total)
      emitter.start(properties.explode, properties.lifespan, properties.frequency, properties.total)
    }
  }

  _update () {
    this._parentUpdate()
    for (const emitter of this._collidebleEmitters) {
      this._arcade.collide(emitter)
    }
  }

  _onEmitterImageUpdate (name, properties) {
    this._recreateEmitter(name, properties)
  }

  _recreateEmitter (name, properties) {
    this.removeEmitter(name)
    this.addEmitter(name, properties)
  }

  addEmitter (name, properties, autoEmit = true) {
    createImageFromBitmapData(this.game, properties[name], name, () => {
      const emitter = this._createEmitter(name, properties)
      this._add(emitter)
      emitter.makeParticles(emitter.name, properties.frames, 500, properties.collide, properties.collideWorldBounds)
      this.updateEmitterProperties(name, properties)
      if (autoEmit) {
        this._emit(emitter, properties)
      }
      if (properties.collide || properties.collideWorldBounds) {
        this._collidebleEmitters.add(emitter)
      } else {
        this._collidebleEmitters.delete(emitter)
      }
    })
  }

  removeEmitter (name) {
    this._remove(this._emitersMap.get(name))
  }

  updateEmitterImage (name, properties) {
    createImageFromBitmapData(this.game, properties[name], name,
      this._onEmitterImageUpdate.bind(this, name, properties))
  }

  updateEmitterProperties (name, properties) {
    const emitter = this._emitersMap.get(name)
    emitter.applyProperties(properties)
    this._emit(emitter, properties)
  }

  updateEmitterOption (name, properties) {
    this._recreateEmitter(name, properties)
  }
}
