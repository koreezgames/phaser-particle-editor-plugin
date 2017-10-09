export const createImageFromBitmapData = (bitmapData, key, oncreate, onerror) => {
  // eslint-disable-next-line no-undef
  const data = new Image()
  data.src = bitmapData
  //
  data.onload = () => {
    window.sandbox.cache.addImage(key, bitmapData, data)
    oncreate()
  }
  data.onerror = () => {
    if (onerror) {
      onerror()
    }
  }
}
