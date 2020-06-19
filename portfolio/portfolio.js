function load_entries() {
  let channel = "form-figure-odvqzyylrzu";
  let makeURL = (per, page) =>
    `https://api.are.na/v2/channels/${channel}?per=${per}&page=${page}`;

  fetch(makeURL(1, 1))
    .then(res => res.json())
    .then(json => {
      document.querySelector("#title").innerHTML = json.title;
    });

  fetch(makeURL(1, 1))
    .then(res => res.json())
    .then(json => (count = json.length))
    .then(count => {
      let per = 100;
      let pages = Math.ceil(count / per);

      let fetches = [];
      for (let page = 1; page <= pages; page++) {
        fetches.push(
          fetch(makeURL(per, page))
            .then(res => res.json())
            .then(json => json.contents)
        );
      }

      Promise.all(fetches).then(contents => {
        contents.forEach(content => {
          content.forEach(entry => {
            makeEntry(entry);
          });
        });
      });
    });

  function makeEntry(entry) {
    let entryTemplate = document.getElementById("entry-template");
    let entryEl = entryTemplate.content.cloneNode(true);
    let entryLi = entryEl.querySelector("li");

    let entryClass = entry.class;

    if (entryClass == "Image") {
      entryLi.querySelector("a").href = entry.image.original.url;
      entryLi.querySelector("img").src = entry.image.original.url;
      entryLi.querySelector(".title").innerHTML = entry.title;
      entryLi.querySelector(".hover-title").innerHTML = entry.title;
      entryLi.querySelector(".description").innerHTML = entry.description_html;
    } else if (entryClass == "Text") {
      entryLi.querySelector(".title").innerHTML = entry.title;
      entryLi.querySelector(".description").innerHTML = entry.content_html;
      console.log(entry.content_html);
    } 

    let entriesEl = document.getElementById("entries");
    entriesEl.insertBefore(entryEl, entriesEl.firstChild);

    $(".entry:nth-of-type(1)").css("background-color", "#666B43");
    $(".entry:nth-of-type(2)").css("background-color", "#BB8E29");
    $(".entry:nth-of-type(3)").css("background-color", "#713825");
    $(".entry:nth-of-type(4)").css("background-color", "#D6A59E");
    $(".entry:nth-of-type(5)").css("background-color", "#2B4B40");
    $(".entry:nth-of-type(6)").css("background-color", "#CC8F25");
    $(".entry:nth-of-type(7)").css("background-color", "#455672");
    $(".entry:nth-of-type(8)").css("background-color", "#9B4C2B");
    $(".entry:nth-of-type(9)").css("background-color", "#94B4BF");
    $(".entry:nth-of-type(10)").css("background-color", "#713825");
  }
}

// $(document).ready(function() {
  load_entries();

  setTimeout(function() {
    $(".entry").click(function() {
      console.log("click");
      console.log(this);
      if (
        $(this)
          .find(".entry-container")
          .css("display") == "none"
      ) {
        $(this)
          .find(".entry-container")
          .css("display", "block");
        $(this)
          .find(".hover-title")
          .css("display", "none");
      } else if (
        $(this)
          .find(".entry-container")
          .css("display") == "block"
      ) {
        $(this)
          .find(".entry-container")
          .css("display", "none");
        $(this)
          .find(".hover-title")
          .css("display", "block");
      }
    });
  }, 1000);