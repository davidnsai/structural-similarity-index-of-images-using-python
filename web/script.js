function getPathToFile(field)
{
  eel.retrive_path()(function(file){
          if (field == 'original') {
            document.getElementById("original").src=file.substring(4);
          }
          else {
            document.getElementById("duplicate").src=file.substring(4);
          }
      });

}
function analyse_images()
{
  let original = document.getElementById("original").src.substring(22);
  let duplicate = document.getElementById("duplicate").src.substring(22);
  if( original == 'assets/img/placeholder.png' || duplicate == 'assets/img/placeholder.png')
  {

  }
  else
  {
    original = 'web/' + original;
    duplicate = 'web/' + duplicate;

    var originalWidth = document.querySelector("#original").naturalWidth;
    var originalHeight = document.querySelector("#original").naturalHeight;

    var duplicateWidth = document.querySelector("#duplicate").naturalWidth;
    var duplicateHeight = document.querySelector("#duplicate").naturalHeight;

    if (originalWidth == duplicateWidth && originalHeight == duplicateHeight) {
      eel.analyse_images(original,duplicate)(function(response){
              if (!isNaN(response)) {
                document.getElementById("input").style="display:none;";
                document.getElementById("analysis").style="display:block;"

                document.getElementById("originalimage").src = document.getElementById("original").src;
                document.getElementById("duplicateimage").src = document.getElementById("duplicate").src;

                document.getElementById("originaldimensions").innerHTML= originalWidth + " x " + originalHeight;
                document.getElementById("duplicatedimensions").innerHTML= duplicateWidth + " x " + duplicateHeight;

                document.getElementById("ssim").innerHTML
                = '<span class="fw-bold text-primary">Structural Similarity Index: </span>' + response;

                document.getElementById("conclusion").innerHTML
                = '<span class="fw-bold text-primary">Conclusion: </span> The 2 images are not '
                + 'structurally identical, hence image forgery occured';
                if (response == 1) {
                  document.getElementById("conclusion").innerHTML
                  = '<span class="fw-bold text-primary">Conclusion: </span> The 2 images are structurally identical, hence no forgery occured';
                }
              }
          });
    }
    else
    {
      var alertPlaceholder = document.getElementById('AlertPlaceholder')
      function alert(message, type)
      {
        var wrapper = document.createElement('div')
        wrapper.innerHTML
        = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">'
        + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        alertPlaceholder.append(wrapper)
      }
      alert('The 2 images must have the same dimensions'+
      +'The images you supplied do not have the same dimensions and, hence, are structurally different', 'danger')
    }
  }
}
