import {
  UPDATE_LIST_RANDOM_PERSON,
  IS_GETTING_RANDOM_PERSON,
  UPDATE_LIST_FAVORITE_PERSON,
  CLEAR_LIST_FAVORITE_PERSON,
} from '../actions/types/RandomPersonTypes';

export function listRandomPerson(state = [], action) {
  if (action.type === UPDATE_LIST_RANDOM_PERSON) {
    return [...state, action.payload];
  }
  return state;
}

export function listFavoritePerson(state = [], action) {
  if (action.type === UPDATE_LIST_FAVORITE_PERSON) {
    return [...state, action.payload];
  }
  if (action.type === CLEAR_LIST_FAVORITE_PERSON) {
    return [];
  }
  return state;
}

export function isGettingRandomPerson(state = false, action) {
  return action.type === IS_GETTING_RANDOM_PERSON ? action.payload : state;
}
