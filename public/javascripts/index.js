$(document).ready(function(){
  var date_input_s=$('input[name="sdate"]');
  var date_input_e=$('input[name="edate"]');
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  var options={
    format: 'dd MM yyyy',
    container: container,
    autoclose: true,
  };
  date_input_s.datepicker(options);
  date_input_e.datepicker(options);
});




var movies = [];


function addMovie() {
  var name = $("#name").val();
  var start = $("#start").val();
  var end = $("#end").val();

  if(!name || !start || !end) {
    alert("Invalid Input!");
    return;
  }

  $("#name").val("");
  $("#start").val("");
  $("#end").val("");

  movies.push({
    "name": name,
    "start": start,
    "end": end
  });

  var html = $("#addedMovies").html();

  html += `
    <p><b>`+name+`</b>: From <u>`+start+`</u> To <u>`+end+`</u></p>
  `;

  $("#addedMovies").html(html);  
}




function submitMovies() {
  if(movies.length == 0) {
    alert("No movies to submit!");
    return;
  }

  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({movies: movies}),
    url: '/apis/pickMovies',
    success: function(response) {
      if(response.status == 'success') {
        var html = `
          <h3>You can earn <b>INR `+response.amount+`</b> by selecting the following movies:</h3>
        `;

        var selectedMovies = response.movies;
        var l = selectedMovies.length;

        for(var i = 0; i < l; i++) {
          html += `
            <p><b>`+selectedMovies[i].name+`</b>: From <u>`+selectedMovies[i].start+`</u> To <u>`+selectedMovies[i].end+`</u></p>
          `;
        }

        $("#form").html(html);
        $("#added").html("");
        
        movies.length = 0;
      }
      else {
        movies.length = 0;
        $("#addedMovies").html("");  
        alert(response.message || "Error!");
      }
    },
    error: function(xhr, status, err) {
      movies.length = 0;
      $("#addedMovies").html("");  
      alert("Error!");
      console.log(err.toString());
    }
  });
}