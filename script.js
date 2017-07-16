////////EVENT LISTENER SECTION ///////

$("#save-btn").on('click', function() {
  prependIdea();
});




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
          <p id="idea-quality">quality: chron</p>
        </div>
        <hr>
      </article>`;
  $(".idea-stage").prepend($inject);
  $("#input-title").val('');
  $("#input-content").val('');
}
