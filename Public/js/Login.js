console.log("ok");

document.body.addEventListener("click", e => {

});

document.body.addEventListener("keydown", e => {
  if ( e.target === document.querySelector("fieldset input") ) {

    if ( e.key === "Enter" ) {
      document.querySelectorAll("fieldset input").forEach((el, i, arr) => {
        // Jika elemen tidak memiliki kelas "is-last"
        if (!el.classList.contains("is-last")) {
            // Lakukan sesuatu pada elemen berikutnya jika ada
            if (i < arr.length - 1) {
                let nextEl = arr[i + 1];
                // Lakukan sesuatu dengan elemen selanjutnya di sini
                nextEl.focus();
            }
          }
      });
    }
  }

});

document.body.addEventListener("submit", e => {
  
  e.preventDefault();

});