function format() {
  let original = document.getElementById("copy").value

  //find ( or ). Then find (1), (a), (i) and indent?
  let array = []
  var n = 0
  var m = 0
  //Checking for section title: if so will bold.
  if (isNaN(original.charAt(0))) {}
  else {
    for (j = 0; j < original.length; j++) {
      if (isNaN(original.charAt(j))) {
        array[m] = "</p> <p>" + original.slice(0,j) + "  "
        console.log(j)
        console.log(array)
        m++
        n = j
        for (k = j; k < original.length; k++){
          console.log("looking for enter section")
          if (original.charCodeAt(k) == 10) {
            console.log(original.charCodeAt(k))
            array[m] = original.slice(n,k) + "</b> <br/>"
            console.log(array)
            m++
            n = k
            break;
          }
        }
        break;
      }
    }
  }
  //Finding next open bracket
  for (let i = 0; i < original.length; i++){
    let openBracketIndex = original.indexOf("(",n)
    //if none, end function
    if (openBracketIndex === -1) {
      array[m] = original.slice(n, original.length)
      break;
    }
    //if at beginning, close bracket
    if (openBracketIndex === 0) {
      let closeBracketIndex = original.indexOf(")", openBracketIndex)
      array[m] = "</p> <p>" + original.slice(openBracketIndex, closeBracketIndex + 2)
      n = closeBracketIndex + 2
      m++
      console.log(array)
      console.log(i)
    }
    //if not at beginning, take everything before it.
    else {
      array[m] = original.slice(n, openBracketIndex-1)
      m++
      console.log(array)
      //find close bracket
      let closeBracketIndex = original.indexOf(")", openBracketIndex)
      if (closeBracketIndex - openBracketIndex > 6) {
        //if length of stuff inside bracket is more than 6 characters, no new line
        array[m] = original.slice(openBracketIndex-1, closeBracketIndex + 2)
        n = closeBracketIndex + 2
        m++
        console.log(array)
        console.log(i)
      }
      //if what's before the bracket is a number and isn't a newline, then it's not a s 3(4), so no new line
      else if(!isNaN(original.charAt(openBracketIndex-1)) && !(original.charCodeAt(openBracketIndex-1) == 10)) {
        console.log(original.charCodeAt(openBracketIndex-1))
        array[m] = original.slice(openBracketIndex-1, closeBracketIndex + 2)
        n = closeBracketIndex + 2
        m++
        console.log(original.charAt(openBracketIndex-1) + " is a number")
      }
      else {
        //there's a new section or paragraph, so needs new line
        array[m] = "</p> <p>" + original.slice(openBracketIndex-1, closeBracketIndex + 2)
        n = closeBracketIndex + 2
        m++
        console.log(array)
        console.log(i)
      }
    }
  }
  console.log (array)
  document.getElementById("formatted").innerHTML = array.join("")

}
