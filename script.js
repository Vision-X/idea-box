var myIdeaArray = [];

getFromLocalStorage();

////////EVENT LISTENER SECTION ///////

$("#input-title, #input-content").on('keyup', function() {
  checkInputs();

})

$("#save-btn").on('click', function() {
  prependIdea(createObject());
  setToLocalStorage();
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
function Idea($title, $content) {
  this.$id = Date.now(),
  this.$title = $title,
  this.$content = $content,
  this.$quality = 'swill';
}

function createObject() {
  var $title = $("#input-title").val();
  var $content = $("#input-content").val();
  // var $id = id;
  // var $qual = 'swill';
  return new Idea($title, $content);
}


function prependIdea(Obj) {
  console.log(Obj);
  var injected = injection(Obj);
  $(".idea-stage").prepend(injected);
  saveToArray(Obj);
  clearFields();
}

function injection(Obj) {

  return `<article class="card" id=${Obj.$id}>
        <h2 id="input-title">${Obj.$title}</h2>
        <button id="delete-btn"></button>
        <p id="idea-content">${Obj.$content}</p>
        <div id="btn-quality-wrapper">
          <button id="upvote"></button>
          <button id="downvote"></button>
          <p id="idea-quality">quality: <span id="current-quality">${Obj.$quality}</span></p>
        </div>
        <hr>
      </article>`;
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



function saveToArray(Obj) {
  myIdeaArray.push(Obj);
}

function setToLocalStorage() {
  var newIdea = myIdeaArray;
  localStorage.setItem("lolArray", JSON.stringify(newIdea));
  console.log(newIdea);
}

function getFromLocalStorage() {
  var arrayFromJSON = JSON.parse(localStorage.getItem("lolArray"));
  populatePageFromLocalStorage(arrayFromJSON);
}

function populatePageFromLocalStorage(arrayFromJSON) {
  var parsedObjectArray = arrayFromJSON;
  console.log(parsedObjectArray);
  if (parsedObjectArray !== null) {
    for (var i=0; i < parsedObjectArray.length; i++) {
    prependIdea(parsedObjectArray[i]);
  }
}
}
