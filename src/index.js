import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// ===========================================================================
// Action Creators
// ===========================================================================
const addToDo = (text) => {
  return { type: ADD_TODO, text };
};

const deleteToDo = (id) => {
  return { type: DELETE_TODO, id };
};

// ===========================================================================
// Reducer
// ===========================================================================
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter((toDo) => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};

// ===========================================================================
// Store
// ===========================================================================

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));

// ===========================================================================
// Dispatch
// ===========================================================================

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

// ===========================================================================
// Function
// ===========================================================================
const paintToDos = () => {
  ul.innerHTML = "";

  const toDos = store.getState();
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    li.id = toDo.id;
    li.innerText = toDo.text;

    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.appendChild(btn);

    ul.appendChild(li);
  });
};
store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";

  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
