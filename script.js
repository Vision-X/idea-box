var myIdeaArray = [];

getFromLocalStorage();

////////EVENT LISTENER SECTION ///////

$("#input-title, #input-content").on('keyup', function() {
  checkInputs();
});

$("#save-btn").on('click', function() {
  prependIdea(createObject());
  setToLocalStorage();
  clearFields();
  checkInputs();
});

$(".idea-stage").on('click', '#delete-btn', function() {
  var id = $(this).closest('.card').attr('id');
  myIdeaArray.forEach(function(idea, index) {
    if (id == idea.$id) {
      myIdeaArray.splice(index, 1);
    }
  })
  $(this).parent().remove();
  setToLocalStorage(myIdeaArray);
});

$(".idea-stage").on('click', '#upvote', function(e) {
  upVote(e);
});

$(".idea-stage").on('click', '#downvote', function(e) {
  downVote(e);
});

$(".search").on('keyup', function() {
    var filter = $(this).val();
    if (filter) {
    $(".card").find("h2:not(:contains(" + filter + "))").closest(".card").slideUp();
    $(".card").find("h2:contains(" + filter + ")").slideDown();
  } else {
    $(".card").slideDown()
  }
});

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
  return new Idea($title, $content);
}

function prependIdea(Obj) {
  var injected = injection(Obj);
  $(".idea-stage").prepend(injected);
  saveToArray(Obj);
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

function upVote(e) {
  var $currentQuality = $(e.target).parent().children('#idea-quality').children('#current-quality');
  var $newQual;
  if ($currentQuality.text() === "swill") {
      $newQual = $currentQuality.text("plausible");
    } else if ($currentQuality.text() === "plausible") {
      $newQual = $currentQuality.text("genius");
    } else if ($currentQuality.text() === "genius") {
        return;
    }

  var id = $(e.target).parents('article').attr('id');
  myIdeaArray.forEach(function(idea, index) {
    if (id == idea.$id) {
      myIdeaArray[index].$quality = $newQual.text();
    }
  });
  setToLocalStorage();
}

function downVote(e) {
  var $currentQuality = $(e.target).parent().children('#idea-quality').children('#current-quality');
  var $newQual;
  if ($currentQuality.text() === "genius") {
      $newQual = $currentQuality.text("plausible");
    } else if ($currentQuality.text() === "plausible") {
      $newQual = $currentQuality.text("swill");
    } else if ($currentQuality.text() === "swill") {
        return;
    }

  var id = $(e.target).parents('article').attr('id');
  myIdeaArray.forEach(function(idea, index) {
    if (id == idea.$id) {
      myIdeaArray[index].$quality = $newQual.text();
    }
  });
 setToLocalStorage();
}

function checkInputs() {
  var $title = $("#input-title").val();
  var $content = $("#input-content").val();
  if ($title === "" || $content === "") {
    $("#save-btn").attr("disabled", true);
  } else {
    $("#save-btn").attr("disabled", false);
  }
}

//start JSON torment and LOLs here B=====D ~ ~ ~ //

function saveToArray(Obj) {
  myIdeaArray.push(Obj);
}

function setToLocalStorage() {
  localStorage.setItem('lolArray', JSON.stringify(myIdeaArray));
}

function getFromLocalStorage() {
  var arrayFromJSON = JSON.parse(localStorage.getItem("lolArray"));
  if (arrayFromJSON != null) {
  populatePageFromLocalStorage(arrayFromJSON);
}
}

function populatePageFromLocalStorage(arrayFromJSON) {
  var parsedObjectArray = arrayFromJSON;
  if (parsedObjectArray !== null) {
    for (var i=0; i < parsedObjectArray.length; i++) {
    prependIdea(parsedObjectArray[i]);
  }
}
}
