var addButton = document
  .getElementById('addBTN')
  .addEventListener('click', addNewDiv)
var dropZone = document.getElementById('dropZone')
var newElement = document.getElementsByClassName('newElement')
var selectedElement = ''
var selectedElementPos = 0
// Funkcja przycisku który tworzy nowy element zawierający text z prompt
function addNewDiv() {
  var textArea = document.getElementById('textArea')
  var values = textArea.value
  var text = document.createTextNode(values)
  var random = Math.floor(Math.random() * Math.floor(1000))
  //console.log(random)
  var btn = document.createElement('div')
  ///console.log(btn)
  btn.setAttribute('class', 'newElement')
  btn.setAttribute('id', random)
  btn.setAttribute('draggable', 'true')
  dropZone.appendChild(btn)
  btn.appendChild(text)
  textArea.value = null

  //console.log(newElement)

  /// Pętla przechodząca przez kazdy dodany element // Implementacja Drag
  for (var i = 0; i < newElement.length; i++) {
    newElement[i].addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text', event.target.id)
      // console.log('Drag Start')
      selectedElement = document.getElementById(event.target.id)
      //   setTimeout(() => {
      //     dropZone.removeChild(selectedElement)
      //   }, 0)
    })
    // newElement[i].addEventListener('drag', (event) => {
    //   event.target.style.display = 'none'
    // })
    // newElement[i].addEventListener('dragend', (event) => {
    //   event.target.style.display = 'flex'
    // })
  }
  //// funkcje drop
}
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault()
  coursorPosition(event.clientY)
})
dropZone.addEventListener('drop', (event) => {
  event.preventDefault()
  // console.log('Droppped')
  dropZone.insertBefore(selectedElement, dropZone.children[selectedElementPos])

  resetElement()
})

//funkcja wyszukiwania pozycji elementow góry i dołu dzięki funkcji getBounding
function elementPosition() {
  for (let i = 0; i < newElement.length; i++) {
    var element = document.getElementById(newElement[i]['id'])
    var position = element.getBoundingClientRect()
    var yTop = position.top
    var yBot = position.bottom
    newElement[i]['yPos'] = yTop + (yBot - yTop) / 2
  }
}
function resetElement() {
  for (let i = 0; i < newElement.length; i++) {
    document.getElementById(newElement[i]['id']).style.marginTop = '5px'
  }
}
//zwracanie pozycji dragowanego elementu
function coursorPosition(currentYPos) {
  elementPosition()
  //
  for (let i = 0; i < newElement.length; i++) {
    if (newElement[i]['yPos'] < currentYPos) {
      //newElement musi być wyżej niz selectedElement
      var elementAbove = document.getElementById(newElement[i]['id'])
      selectedElementPos = i + 1
    } else {
      //newElement musi być niżej niż selectedElement
      if (!elementBelow)
        var elementBelow = document.getElementById(newElement[i]['id'])
    }
  }
  if (typeof elementAbove == 'undefined') {
    selectedElementPos = 0
  }
  resetElement()
  //rozszerzanie elementów
  if (typeof elementBelow == 'object') {
    elementBelow.style.marginTop = '1rem'
    elementBelow.style.transition = '0.5s'
  }
  // console.log(selectedElementPos)
}
