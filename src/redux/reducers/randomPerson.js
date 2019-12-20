import {
  UPDATE_LIST_RANDOM_PERSON,
  IS_GETTING_RANDOM_PERSON,
  UPDATE_LIST_FAVORITE_PERSON,
  CLEAR_LIST_FAVORITE_PERSON,
  DELETE_RANDOM_PERSON,
} from '../actions/types/RandomPersonTypes';
import _ from 'lodash';

export function listRandomPerson(state = [], action) {
  switch (action.type) {
    case UPDATE_LIST_RANDOM_PERSON:
      return [...state, action.payload];
    case DELETE_RANDOM_PERSON:
      return state.filter(
        person => !_.isEqual(person.phone, action.payload.phone),
      );
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
