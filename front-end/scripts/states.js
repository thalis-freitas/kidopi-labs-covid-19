"use strict";

function clearStatesSection(){
  let statesSection = document.getElementById('states-section')
  let titleForStates = document.querySelector('#title-for-states')
  if(statesSection){
    statesSection.remove()
    titleForStates.remove()
  }
}

async function createStatesSection(){
  let statesSection = document.createElement('section')
  statesSection.id = 'states-section'

  let titleForStatesSection = document.createElement('h4')
  titleForStatesSection.id = 'title-for-states'
  titleForStatesSection.textContent = 'Na tabela abaixo você pode conferir os dados por estado'
  container.appendChild(titleForStatesSection)
  container.appendChild(statesSection)
  return statesSection
}

function displayDataByState(statesSection){
  createStatesHeader(statesSection)
  COUNTRIES_DATA.states.forEach( state => {
    let elements = createElements('span')
    elements = setStateElements(elements, state)
    statesSection.appendChild(elements[0])
    statesSection.appendChild(elements[1])
    statesSection.appendChild(elements[2])
  })
  defineClassToAnimateStates()
  animateStates()
}

function animateStates(){
  const statesForAnimation = document.querySelectorAll('[data-anime]')
  window.addEventListener('scroll', () =>{
    statesForAnimation.forEach( state =>{
      if((window.pageYOffset + window.innerHeight * .95) > state.offsetTop){
        state.classList.add('animate-states')
      }
    })
  })
}

function createStatesHeader(statesSection){
  const statesHeader = ['Estado', 'Casos', 'Mortes']

  for(let i in statesHeader){
    let headerText = document.createElement('span')
    headerText.textContent = statesHeader[i]
    statesSection.appendChild(headerText)
  }
}

function createElements(type){
  let elements = []
  for(let i = 0; i < 3; i++){
    elements.push(document.createElement(type))
  }
  return elements
}

function setStateElements(elements, state){
  elements[0].innerHTML = state.state
  elements[1].innerHTML = formatValue(state.confirmed)
  elements[2].innerHTML = formatValue(state.dead)
  return elements
}

function defineClassToAnimateStates(){
  document.querySelectorAll('span').forEach( element => {
    element.className = 'state-data'
    element.setAttribute('data-anime', 'left')
  })
}