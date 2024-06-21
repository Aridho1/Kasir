console.log("ok");


document.body.addEventListener("click", e => {
  
  //
  
});

document.body.addEventListener("keydown", e => {
  
  //

});

document.body.addEventListener("focus", e => {
  
  //
  
});

document.body.addEventListener("submit", e => {
  
  e.preventDefault();

});



getEl("form input", "all").forEach((input, i, arr) =>{
  
  // handle legend
  input.addEventListener("focus", e => {
    
    input.previousElementSibling
      .classList.add("show");
    
  });
  
  // handle legend
  input.addEventListener("blur", e => {
    
    if ( input.value == "" ) {
      
      input.previousElementSibling
        .classList.remove("show");
      
    }
    
  });
  
  // handle next focus | submit
  input.addEventListener("keydown", e => {
    
    if ( e.key === "Enter" ) {
      
      // handle - not last element
      if (i + 1 != getEl("input", "all").length) {
        
        arr[i + 1].focus();
        
      // handle last element
      } else {
        
        alert("success");
        
      }
      
    } // ←← end if e.key
    
  });
  
});

