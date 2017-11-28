$(document).foundation()
$(document).ready(function(){
  $("#note-name").on('keyup', function(e) {
    if (e.keyCode == 13) {
      $("#add-note-submit")[0].click();
    }
  });
})
