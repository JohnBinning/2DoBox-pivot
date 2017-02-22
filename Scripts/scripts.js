var data = [];
var importance = ['None', 'Low', 'Normal', 'High', 'Critical']

//on page load
$(document).ready(function() {
    getToDo();
    printToDo();
})


//Card Constructor
function Card(toDoTitle, toDoContent) {
    this.title = toDoTitle;
    this.body = toDoContent;
    this.priority = importance[2];
    this.id = Date.now();
    this.completed = false;
}


function storeToDo() {
    var stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}


function getToDo() {
    var storedData = localStorage.getItem("Data Item") || '[]';
    var parsedData = JSON.parse(storedData);
    data = parsedData;  //Undeclared var so it's global
}

$('#show-completed').on('click', function(){
  console.log('click it!!!!')
  $("#card-section").html('');
  data.forEach(function(object) {
    if (object.completed == true){
      console.log('getting true value')

      $("#completed-section").append(`
        <article id="${object.id}" class="card grayCard">
        <header>
        <h1 class="card-title grayedOut" contenteditable='true'>${object.title}</h1>
        <button class="clear"></button>
        </header>
        <article class="card-bottom">
        <p class='card-body grayedOut' contenteditable='true'>${object.body}</p>
        <button class="upvote"></button>
        <button class="downvote"></button>
        <h3>quality:<h4 class="quality">${object.priority}</h4></h3>

        <button class="completed-task">Completed</button>
        </article>
        </article>`);
      }

    });
    printToDo()

  })


// Clears card section, then generates cards from local storage
function printToDo() {
    $("#card-section").html('');
    data.forEach(function(object) {
      if (object.completed == false){
        console.log(object.completed)
        htmlNormalCard(object)

    }
  })
}
function htmlNormalCard(object) {
  $("#card-section").append(`
<article id="${object.id}" class="card">
  <header>
    <h1 class="card-title" contenteditable='true'>${object.title}</h1>
    <button class="clear"></button>
  </header>
  <article class="card-bottom">
    <p class='card-body' contenteditable='true'>${object.body}</p>
    <button class="upvote"></button>
    <button class="downvote"></button>
    <h3>quality:<h4 class="quality">${object.priority}</h4></h3>

    <button class="completed-task">Completed</button>
  </article>
</article>`);
}

// show completed button - make higher section to store compeleted todos similar  to card-section, then call print to do with identical function that prepends object.completed = true to the new section , also include a completed css class in markup with other prepend to give the completed todos the css

// Completed button
$('#card-section').on('click', '.completed-task', function() {
  // console.log('does this click')
  // var completed = (this).completed;
  // $(this).toggleClass('grayedOut')
  $(this).closest('.card').find('.card-title').toggleClass('grayedOut')
  $(this).closest('.card').toggleClass('grayCard')
  $(this).closest('.card').find('.card-body').toggleClass('grayedOut')
  // $(this).closest('.card').find('.quality').toggleClass('grayedOut')
  $(this).closest('.card').find('.quality-text').toggleClass('grayedOut')
  editCompletedStatus(this);
});

$('#completed-section').on('click', '.completed-task', function() {
  // console.log('does this click')
  // var completed = (this).completed;
  // $(this).toggleClass('grayedOut')
  $(this).closest('.card').find('.card-title').toggleClass('grayedOut')
  $(this).closest('.card').toggleClass('grayCard')
  $(this).closest('.card').find('.card-body').toggleClass('grayedOut')
  // $(this).closest('.card').find('.quality').toggleClass('grayedOut')
  $(this).closest('.card').find('.quality-text').toggleClass('grayedOut')
  editCompletedStatus(this);
});

function editCompletedStatus(location) {
  var objectId = $(location).parent().parent().attr('id');
  data = JSON.parse(localStorage.getItem('Data Item'));
  data.forEach(function(object){
    if (object.id == objectId){
      object.completed = !object.completed
      // object.completed = newCompletedStatus
      console.log("completed? ", object.completed)
      return object.completed;
    }
  })
  stringData = JSON.stringify(data);
  localStorage.setItem("Data Item", stringData);
}


////////////////// Event Listener to Disable/////////////////
$("#title-input, #body-input").on("keyup", disableEnter);

function disableEnter() {
    if ($("#title-input").val().length > 0 && $("#body-input").val().length > 0) {
        $("#save-button").prop("disabled", false);
    } else {
        $("#save-button").prop("disabled", true);
    }
}


///////////////Save //////////////////////////////////////

$("#save-button").on('click', function(e) {
    e.preventDefault();
    var storeToDoTitle = $('#title-input').val();
    var storeToDoContent = $('#body-input').val();
    var card = new Card(storeToDoTitle, storeToDoContent);
    data.unshift(card);
    storeToDo();
    printToDo();
    clearInput();
    disableEnter();
})

//////////////////Upvote and Downvote////////////////////////


//Upvote
$("#card-section").on('click', '.upvote', upvote)


function upvote() {
  var qualityVar = $(this).siblings(".quality").text();
  console.log(qualityVar)
    switch (qualityVar) {
      case importance[0]:
        $(this).closest('.card').find('.quality').text("Low")
        qualityVar = "Low"
        changeImportance(this, qualityVar)
        break;
      case importance[1]:
          $(this).closest('.card').find('.quality').text("Normal")
          qualityVar = "Normal"
          changeImportance(this, qualityVar)
        break;
      case importance[2]:
        $(this).closest('.card').find('.quality').text("High")
        qualityVar = "High"
        changeImportance(this, qualityVar);
        break;
      default:
      $(this).closest('.card').find('.quality').text("Critical")
      qualityVar = "Critical"
      changeImportance(this, qualityVar);
    }
}
  // if ($(this).siblings(".quality").text() === "swill") {
  //     $(this).siblings(".quality").text("plausible");
  //     qualityVar = "plausible";
  //     editQuality(this, qualityVar);
  // } else if ($(this).siblings(".quality").text() === "plausible") {
  //     $(this).siblings(".quality").text("genius");
  //     qualityVar = "genius"
  //     editQuality(this, qualityVar);
  // } else if ($(this).siblings(".quality").text() === "genius") {
  //     qualityVar = "genius";
  // }

//Downvote
$("#card-section").on('click', '.downvote', downvote)

function downvote() {
  var qualityVar = $(this).siblings(".quality").text();
  console.log(qualityVar)
    switch (qualityVar) {
      case importance[4]:
        $(this).closest('.card').find('.quality').text("High")
        qualityVar = "High"
        changeImportance(this, qualityVar);
        break;
      case importance[3]:
        $(this).closest('.card').find('.quality').text("Normal")
        qualityVar = "Normal"
        changeImportance(this, qualityVar);
        break;
      case importance[2]:
          $(this).closest('.card').find('.quality').text("Low")
          qualityVar = "Low"
          changeImportance(this, qualityVar);
        break;
      default:
      $(this).closest('.card').find('.quality').text("None")
      qualityVar = "None"
      changeImportance(this, qualityVar);
    }
}

  // if ($(this).siblings(".quality").text() === "genius") {
  //     $(this).siblings(".quality").text("plausible");
  //     qualityVar = "plausible";
  //     editQuality(this, qualityVar);
  // } else if ($(this).siblings(".quality").text() === "plausible") {
  //     $(this).siblings(".quality").text("swill");
  //     qualityVar = "swill";
  //     editQuality(this, qualityVar);
  // } else if ($(this).siblings(".quality").text() === "plausible") {
  //     qualityVar = "swill";
  // }


//Stores the new vote quality to local storage
function changeImportance(location, qualityVar) {
    var objectId = $(location).parent().parent().attr("id");
    data = JSON.parse(localStorage.getItem("Data Item"));
    data.forEach(function(object) {
        if (object.id == objectId) {
            object.priority = qualityVar;
            return object.priority;
        }
    });
    stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}

///////////////Content Editable //////////////////////////////////////////////

//Edit Card Title
$('#card-section').on('blur', '.card-title', function(e) {
    var newTitleText = $(this).text();
    editTitleText(this, newTitleText);
});


function editTitleText(location, newText) {
    var objectId = $(location).parent().parent().attr('id');
    data = JSON.parse(localStorage.getItem('Data Item'));
    data.forEach(function(object) {
        if (object.id == objectId) {
            object.title = newText;
            return object.title;
        }
    });
    stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}

//Edit Card Body
$('#card-section').on('blur', '.card-body', function() {
    var newBodyText = $(this).text();
    editBodyText(this, newBodyText);
});
function editBodyText(location, newText) {
    var objectId = $(location).parent().parent().attr('id');
    data = JSON.parse(localStorage.getItem('Data Item'));
    data.forEach(function(object) {
        if (object.id == objectId) {
            object.body = newText;
            return object.body;
        }
    });
    stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}


/////////Delete Btn////////////////////////////


$("#card-section").on('click', '.clear', deleteCardFromStorage)


function deleteCardFromStorage() {
  var idOfRemoved = $(this).parent().parent().attr("id")
  deleteCard(this, idOfRemoved);
  $(this).closest('.card').remove();
}


/// Deletes from local storage
function deleteCard(location, idOfRemoved) {
    var objectId = $(location).parent().parent().attr("id");
    var removedId = idOfRemoved;
    data = JSON.parse(localStorage.getItem("Data Item"));
    data = data.filter(function(object) {
        return object.id != objectId;
    });
    stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}

///////////////Search //////////////////////

//Search Event Listener
$('#search').on('keyup', search)


function search() {
  var searchInput = $('#search').val();
  var re = new RegExp(searchInput, 'igm');
  $('.card').each(function() {
      var title = $(this).find(".card-title").text();
      var body = $(this).find("article p").text();
      var match = (title.match(re) || body.match(re));
      if (!match) {
          $(this).hide();
      } else {
          $(this).show();
      }
  })
}

// Clear Input
function clearInput() {
    $('#title-input').val('');
    $('#body-input').val('');
}




/////////////Filter By Importance/////////////////////


$('#importance-none').on('click', findImportanceNone)

function findImportanceNone() {
  $("#card-section").html('');
  data.forEach(function(object) {
    if (object.priority === 'None') {
      htmlNormalCard(object)
    }
  })
}

$('#importance-low').on('click', findImportanceLow)

function findImportanceLow() {
  $("#card-section").html('');
  data.forEach(function(object) {
    if (object.priority === 'Low') {
      htmlNormalCard(object)
    }
  })
}

$('#importance-normal').on('click', findImportanceNormal)

function findImportanceNormal() {
  $("#card-section").html('');
  data.forEach(function(object) {
    if (object.priority === 'Normal') {
      htmlNormalCard(object)
    }
  })
}

$('#importance-high').on('click', findImportanceHigh)

function findImportanceHigh() {
  $("#card-section").html('');
  data.forEach(function(object) {
    if (object.priority === 'High') {
      htmlNormalCard(object)
    }
  })
}

$('#importance-critical').on('click', findImportanceCritcal)

function findImportanceCritcal() {
  $("#card-section").html('');
  data.forEach(function(object) {
    if (object.priority === 'Critical') {
      htmlNormalCard(object)
    }
  })
}


//add key value of completed true/false to card objects.  then have completed button pull card out of local storage, toggle value, then put it back in.  have page load only show completed=false.  have show more completed wipe card section and show all cards regardless of completed = true/false.  actually, completed true will need to display first.
