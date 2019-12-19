import {capitalizeFLetter} from '../utils/String';
import moment from 'moment';
import {formatUnixTimeStampToString} from '../utils/Time';

/**
* @example
{
    user: {
      gender: 'female',
      name: {
        title: 'mrs',
        first: 'rose',
        last: 'rhodes',
      },
      location: {
        street: '5280 park rd',
        city: 'great falls',
        state: 'new jersey',
        zip: '76932',
      },
      email: 'rose.rhodes56@example.com',
      username: 'whiteelephant169',
      password: 'birdie',
      salt: 'SXC15j3g',
      md5: 'c998e2ef42f9b2fb6a91c13410c97cfc',
      sha1: '360180640de3264da2569fcc0fc52dbc9c3879ab',
      sha256:
        '0524963de0f3ddced42aafc6d92dd26cf47c76e7c4df20033c34b3171a1b76fb',
      registered: '1228103756',
      dob: '167430791',
      phone: '(116)-326-4089',
      cell: '(136)-194-4284',
      SSN: '887-38-6677',
      picture: 'http://api.randomuser.me/portraits/women/68.jpg',
    },
    seed: '7ec79e8347996abd',
    version: '0.4',
}
 */

export default class Person {
  user = {};
  gender = '';
  title = '';
  nameObj = {};
  fullName = '';
  location = {};
  address = '';
  email = '';
  userName = '';
  password = '';
  registered = ''; // timestamp
  dob = ''; // timestamp
  formattedDOB = '';
  formattedRegistered = '';
  phone = '';
  cell = '';
  SSN = '';
  avatarURL = '';

  static toObjectFromJSON(json) {
    const person = new Person();
    person.user = json.user;
    person.gender = json.user.gender;
    person.nameObj = json.user.name;
    person.title = json.user.name.title;
    person.fullName = `${capitalizeFLetter(
      json.user.name.first,
    )} ${capitalizeFLetter(json.user.name.last)}`;
    person.location = json.user.location;
    person.address = `${capitalizeFLetter(
      json.user.location.street,
    )} ${capitalizeFLetter(json.user.location.city)}`;
    person.dob = json.user.dob;
    person.formattedDOB = formatUnixTimeStampToString(
      Number(json.user.dob),
      'DD/MM/YYYY',
    );
    person.registered = json.user.registered;
    person.formattedRegistered = formatUnixTimeStampToString(
      Number(json.user.registered),
      'DD/MM/YYYY',
    );
    person.phone = json.user.phone;
    person.cell = json.user.cell;
    person.SSN = json.user.SSN;
    person.avatarURL = json.user.picture;

    return person;
  }
}
