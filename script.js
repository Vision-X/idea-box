// checkInputs();

var myIdeaArray = [];

////////EVENT LISTENER SECTION ///////

$("#input-title, #input-content").on('keyup', function() {
  checkInputs();

})

$("#save-btn").on('click', function() {
  prependIdea();
  setToLocalStorage();
  // saveToArray();
  clearFields();
  checkInputs();
})

$(".idea-stage").on('click', '#delete-btn', function() {
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
function Idea($title, $content, $id) {
  this.$id = Date.now() || $id,
  console.log("this id -1 is : " + $id)
  this.$title = $title,
  this.$content = $content,
  this.$quality = 'swill';
}


function prependIdea(title, content, id, qual) {
  var $title = $("#input-title").val() || title;
  var $content = $("#input-content").val() || content;
  // var updateIdea = new Idea($title, $content, $id);
  var $id = id;
  console.log("this id 1 is : " + $id);
  var $qual = 'swill';
  var injected = injection($title, $content, $id, $qual);
  $(".idea-stage").prepend(injected);
  // myIdeaArray.push(updateIdea);
  saveToArray();
  // console.log(updateIdea);
  clearFields();
}

function injection($title, $content, $id, $qual) {
  var $inject =
        `<article class="card" id=${$id}>
        <h2 id="input-title">${$title}</h2>
        <button id="delete-btn"></button>
        <p id="idea-content">${$content}</p>
        <div id="btn-quality-wrapper">
          <button id="upvote"></button>
          <button id="downvote"></button>
          <p id="idea-quality">quality: <span id="current-quality">${$qual}</span></p>
        </div>
        <hr>
      </article>`;
  return $inject;
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

//start JSON torment and LOLs here B=====D ~ ~ ~ //




function saveToArray($id) {
  var myAry = myIdeaArray;
  var id = $id;
  console.log("this id is: " + $id);
  var $title = $("#input-title").val();
  console.log("this title is: " + $title);
  var $content = $("#input-content").val();
  console.log("this content is: " + $content);
  var updateIdea = new Idea($title, $content, $id);
  console.log("Idea contructor function is : " + Idea);
  myAry.push(updateIdea);
}

function setToLocalStorage(ideaArray) {
  var newIdea = myIdeaArray;
  localStorage.setItem("lolArray", JSON.stringify(newIdea));
  console.log(newIdea);
}

function getFromLocalStorage() {

}
