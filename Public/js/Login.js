console.log("ok");

const aInput = () => {
  
  getEl("form input", "all").forEach((input) => {
    
    if (input == document.activeElement) {
      
      input.previousElementSibling
        .classList.add("show");
      
    } else if ( input.value == "" ) {
      
      input.previousElementSibling
        .classList.remove("show");
    }
    
    //alert(input.parentElement.innerHTML);
    
  });
  
};

document.body.addEventListener("click", e => {
  
  if ( 
    e.target.tagName == "INPUT" && 
    e.target.closest("form fieldset")
  ) {
    
    aInput();
  }
  /*
  else if ( e.target.classList.contains("refresh") ) {
    
    if ( confirm("Reload?") ) {
      //window.location.reload()
      window.location.href = window.location.href;
    }
    
  }
  */
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
                aInput();
            }
          }
      });
    }
  }


});

document.body.addEventListener("focus", e => {
  alert("focusss");
  popUp();
});

document.body.addEventListener("submit", e => {
  
  e.preventDefault();

});

