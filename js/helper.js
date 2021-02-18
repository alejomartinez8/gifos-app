// Functions
function setAttribute(elm, att, val) {
  if (elm) elm.setAttribute(att, val);
}

function displayBlock(elm) {
  elm.style.display = "block";
}

function displayNone(elm) {
  elm.style.display = "none";
}

function imgHover(elm, hover, unhover) {
  elm.addEventListener("mouseenter", () => {
    setAttribute(elm, "src", hover);
  });

  elm.addEventListener("mouseleave", () => {
    setAttribute(elm, "src", unhover);
  });
}

function downloadURI(uri, name = "") {
  fetch(uri)
    .then((response) => response.blob())
    .then((blob) => {
      const imgHref = window.URL.createObjectURL(new Blob([blob]));
      var link = document.createElement("a");
      link.setAttribute("download", name);
      link.href = imgHref;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
}
