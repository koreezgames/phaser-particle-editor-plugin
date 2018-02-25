const imageData = {}
imageData.isLoading = false
imageData.queue = []

export const createImageFromBitmapData = (
  game,
  bitmapData,
  key,
  oncreate,
  onerror,
  force = true,
) => {
  if (!force && game.cache.checkImageKey(key)) {
    onImageLoad(oncreate)
    return
  }

  const img = new Image()

  if (imageData.isLoading) {
    imageData.queue.push({
      game,
      bitmapData,
      key,
      oncreate,
      onerror,
    })
    return
  }
  imageData.isLoading = true
  //
  img.onload = () => {
    game.cache.addImage(key, bitmapData, img)
    onImageLoad(oncreate)
  }

  img.onerror = () => {
    onImageLoad(onerror)
  }

  // eslint-disable-next-line no-undef
  img.src = bitmapData
}

const onImageLoad = hook => {
  if (hook) {
    hook()
  }
  imageData.isLoading = false
  nextImageInQueue()
}

const nextImageInQueue = () => {
  if (imageData.queue.length > 0) {
    const queueData = imageData.queue.shift()
    createImageFromBitmapData(
      queueData.game,
      queueData.bitmapData,
      queueData.key,
      queueData.oncreate,
      queueData.onerror,
      false,
    )
  }
}
