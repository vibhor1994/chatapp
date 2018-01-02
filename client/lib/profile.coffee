Template.profileSet.helpers
  photoUpOptions: ->
    crop: true
    showInfo: true
    showClear: true
    jCrop:
      aspectRatio: 1
    loadImage:
      # canvas: true
      crop: true
      contain:true
      cover: true
      # sourceWidth: 200
      maxHeight: 350
      # aspectRatio: 1


    callback: (error, photo) ->
      if error
        console.error("photoUp Error:", error)
      else
        console.log("photoUp photo:", photo)
