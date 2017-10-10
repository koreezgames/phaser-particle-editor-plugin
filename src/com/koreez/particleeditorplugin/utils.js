export const createImageFromBitmapData = (game, bitmapData, key, oncreate, onerror) => {
  // eslint-disable-next-line no-undef
  const data = new Image()
  data.src = bitmapData
  //
  data.onload = () => {
    game.cache.addImage(key, bitmapData, data)
    oncreate()
  }
  data.onerror = () => {
    if (onerror) {
      onerror()
    }
  }
}
