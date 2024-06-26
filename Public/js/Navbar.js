
getEl().addEventListener("click", e => {
  
  // handle nav mobile
  if ( e.target.closest("div.menu-toggle") ) {
    getEl("nav ul").classList.toggle("slide");
  }
  
  //event close nav pada navlinks
  if (
    e.target !==getEl(".menu-toggle input[type=checkbox]") && 
    e.target !==getEl("nav ul") 
  ) {
    getEl(".menu-toggle input[type=checkbox]").checked = false; 
    getEl("nav ul").classList.remove("slide");
  }
  
});