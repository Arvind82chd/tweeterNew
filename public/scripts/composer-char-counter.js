
$(document).ready(function () {

  $('#tweet-text').on("input", (event) => {// picks the input value from id tweet-text from textarea in html implements .on for eventlistener 'input' not keypress as key press in dep and others have some limitation.
    $(".limitExceedError").hide() //to hide the error until condition met
    let count = event.target.value.length;// responsible for giving the length of key presses.
    const counter = $('#count');//picks up the count display on html and connects to this variable
    if (count > 140) { // checks if more than given limit of characters clicked or not.
        $('#count').css("color","salmon")

    } else {
        $('#count').css("color","black")
    }
    counter.text(`${140 - count}`);//displays the counter at the count location in html 
  });
  //Technique made quite clear by a mentor previously.
});

