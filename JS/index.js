var SName = document.getElementById("bookmarkName");
var SURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtns = 0;
var visitBtns = 0;
var closeBtn = document.getElementById("closeBtn");
var BoxInfo = document.querySelector(".box-info");
var bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
}




function visitWebsite(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex].SURL)) {
    open(bookmarks[websiteIndex].SURL);
  } else {
    open(`https://${bookmarks[websiteIndex].SURL}`);
  }
}


function closeModal() {
  BoxInfo.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});


function displayBookmark(indexOfWebsite) {
var userURL = bookmarks[indexOfWebsite].SURL;
var httpsRegex = /^https?:\/\//g;
if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
     .split("")
     .splice(validURL.match(httpsRegex)[0].length)
     .join("");
} else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
}
   var newBookmark = `
                <tr>
                  <td>${indexOfWebsite + 1}</td>
                  <td>${bookmarks[indexOfWebsite].SName}</td>              
                  <td>
                    <button class="btn btn-visit" data-index="${indexOfWebsite}">
                      <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                      <i class="fa-solid fa-trash-can"></i>
                      Delete
                    </button>
                  </td>
              </tr>
              `;
    tableContent.innerHTML += newBookmark;
  
  
 deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
      for (var j = 0; j < deleteBtns.length; j++) {
        deleteBtns[j].addEventListener("click", function (e) {
          deleteBookmark(e);
        });
      }
    }
  
  
 visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
      for (var l = 0; l < visitBtns.length; l++) {
        visitBtns[l].addEventListener("click", function (e) {
          visitWebsite(e);
        });
      }
    }
  }

function clearInput() {
    SName.value = "";
    SURL.value = "";
  }
  
function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
  }
  
  
submitBtn.addEventListener("click", function () {
    if (
      SName.classList.contains("is-valid") &&
      SURL.classList.contains("is-valid")
    ) {
      var bookmark = {
        SName: capitalize(SName.value),
        SURL: SURL.value,
      };
      bookmarks.push(bookmark);
      localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
      displayBookmark(bookmarks.length - 1);
      clearInput();
      SName.classList.remove("is-valid");
      SURL.classList.remove("is-valid");
    } else {
      BoxInfo.classList.remove("d-none");
    }
  });
  
  
function deleteBookmark(e) {
    tableContent.innerHTML = "";
    var deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    for (var k = 0; k < bookmarks.length; k++) {
      displayBookmark(k);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  }


  

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

SName.addEventListener("input", function () {
  validate(SName, nameRegex);
});

SURL.addEventListener("input", function () {
  validate(SURL, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
