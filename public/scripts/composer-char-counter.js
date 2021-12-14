
$(document).ready(function () {

  $('#tweet-text').on("input", (event) => {
    console.log(event.target.value);
    let count = event.target.value.length;
    const counter = $('#count');
    if (count >= 140) {
        $('#count').css("color","red")
    } else {
        $('#count').css("color","black")
    }
    counter.text(`${140 - count}`);
  });
  
  
    //Technique made quite clear by a mentor previously.

});

