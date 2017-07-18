// checkInputs();

////////EVENT LISTENER SECTION ///////

$("#input-title, #input-content").on('keyup', function() {
  console.log("yooooooooo");
  checkInputs();

})

$("#save-btn").on('click', function() {
  prependIdea();
  clearFields();
  checkInputs();
})

$(".idea-stage").on('click', '#delete-btn', function() {
  console.log('the delete was clicked');
  $(this).parent().remove();
})

$(".idea-stage").on('click', '#upvote', function() {
  //handle the events for when upvote is clicked
  console.log("upvote was clicked");
  upVote();
})

$(".idea-stage").on('click', '#downvote', function() {
  //handle the events for when upvote is clicked
  console.log("downvote was clicked");
  downVote();
})



/////// FUNCTION SECTION /////////

function prependIdea() {
  var $title = $("#input-title").val();
  var $content = $("#input-content").val();
  var $inject =
        `<article class="card">
        <h2 id="idea-title">${$title}</h2>
        <button id="delete-btn"></button>
        <p id="idea-content">${$content}</p>
        <div id="btn-quality-wrapper">
          <button id="upvote"></button>
          <button id="downvote"></button>
          <p id="idea-quality">quality: <span id="current-quality">swill</span></p>
        </div>
        <hr>
      </article>`;
  $(".idea-stage").prepend($inject);
  clearFields();
  // $("#input-title").val();
  // $("#input-content").val();

}

function clearFields() {
  $("#input-title").val('');
  $("#input-content").val('');
}

function upVote() {
  var $currentQuality = $('#current-quality').html();
  if ($currentQuality === "swill") {
      console.log($currentQuality);
      $('#current-quality').html("plausible");
    } else if ($currentQuality === "plausible") {
      $('#current-quality').html("genius");
    }
}

function downVote() {
  var $currentQuality = $('#current-quality').html();
  if ($currentQuality === "genius") {
    console.log($currentQuality);
    $('#current-quality').html("plausible");
  } else if ($currentQuality === "plausible") {
    $('#current-quality').html("swill");
  }
}


function checkInputs() {
  var $title = $("#input-title").val();
  var $content = $("#input-content").val();
  if ($title === "" || $content === "") {
    console.log("enter btn disabled!");
    $("#save-btn").attr("disabled", true);
  } else {
    console.log("enter btn is a GO!");
    $("#save-btn").attr("disabled", false);
  }
}
