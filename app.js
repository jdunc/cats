$(document).ready(function(){
  console.log('jQuery loaded');
  var categories = ['hats', 'space', 'funny', 'sunglasses', 'boxes', 'caturday', 'ties', 'dream', 'sinks', 'clothes'];
  var currentURLS = [];

  var $grid = $('.grid').masonry({
  // options
  itemSelector: '.newCatPics',
  columnWidth: 200
});
  for (var i = 0; i < categories.length; i++) {
    $("#categoryButtons").append(
      `<a class="btn btn-default categoryButtons" role="button" id="${categories[i]}">${categories[i]}</a>
`) //end of append action
  } //end of category for loop
  $('.categoryButtons').click(function(){
    $('.newCatPics').each(function(){
      $(this).remove();
    })
    // console.log(this.id);
    $.get(`http://thecatapi.com/api/images/get?format=xml&results_per_page=20&category=${this.id}`, function(){})
    .done(function(doc){
      // console.log(doc);
      var jsonResponse = $.xml2json(doc);
      // console.log(jsonResponse);
      // console.log(jsonResponse['#document'].response.data.images.image[0].url);

      for (var i = 0; i < jsonResponse['#document'].response.data.images.image.length; i++) {
        // console.log(jsonResponse['#document'].response.data.images.image[i].url);
        // currentURLS.push(jsonResponse['#document'].response.data.images.image[i].url);
        var catURL = 'http://' + jsonResponse['#document'].response.data.images.image[i].url.slice(10,
        jsonResponse['#document'].response.data.images.image[i].url.length);
        var catElement =`<img src=${catURL} class="newCatPics" />`;
        // $.get(jsonResponse['#document'].response.data.images.image[i].url, function(){})
        //   .success(function(){
            $grid.masonry()
              .append( catElement )
              .masonry( 'appended', catElement )
              // layout
              // .masonry();
//               $grid.imagesLoaded().progress( function() {
//   $grid.masonry('layout');
// });
          // })
      }



    }); // end of $.get
  }) //end of click function




}) // end of on document ready function
