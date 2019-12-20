import {
  IS_GETTING_RANDOM_PERSON,
  UPDATE_LIST_RANDOM_PERSON,
  UPDATE_LIST_FAVORITE_PERSON,
} from './types/RandomPersonTypes';
import AppClient from '../../networkings/AppClient';
import _ from 'lodash';

export function updateListRandomPerson(person) {
  return {
    type: UPDATE_LIST_RANDOM_PERSON,
    payload: person,
  };
}

export function isGettingRandomPerson(isFetching) {
  return {
    type: IS_GETTING_RANDOM_PERSON,
    payload: isFetching,
  };
}

export function updateListFavoritePerson(person) {
  return {
    type: UPDATE_LIST_FAVORITE_PERSON,
    payload: person,
  };
}

/**
 * Getting a random person and append that person data to list person in store
 */
export function fetchRandomPerson() {
  const doneFetching = (dispatch, person) => {
    const updatePerson = {
      ...person,
      receivedAt: Date.now(),
      status: !_.isEmpty(person),
    };
    dispatch(updateListRandomPerson(updatePerson));
    dispatch(isGettingRandomPerson(false));
  };

  return dispatch => {
    dispatch(isGettingRandomPerson(true));
    return AppClient.getRandomPerson().then(person => {
      doneFetching(dispatch, person);
    });
  };
}
