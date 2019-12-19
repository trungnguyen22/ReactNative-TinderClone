import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {commonStyles, AppColorPallete} from '../../theme';
import CardSwiper from '../../components/CardSwiper';
import {UserCard} from '../../components/UserCard';
import Person from '../../models/Person';

const MOCKUP_RANDOM_PEOPLE = [
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
  },
  {
    user: {
      gender: 'female',
      name: {
        title: 'miss',
        first: 'alicia',
        last: 'stone',
      },
      location: {
        street: '5772 maple rd',
        city: 'frisco',
        state: 'alaska',
        zip: '73504',
      },
      email: 'alicia.stone70@example.com',
      username: 'bigtiger670',
      password: 'frosch',
      salt: 'Tuj2850c',
      md5: '1fe3854e581d2ee370dfaafe7770acd9',
      sha1: 'a14da5dd72fffeb14ebf025eaa7f5bf13579785d',
      sha256:
        '538ed92b9a4d4993d8d700c09eb472f38befaee7a849725709c51b241be9282b',
      registered: '1057765658',
      dob: '122000818',
      phone: '(667)-231-3445',
      cell: '(817)-456-2621',
      SSN: '152-16-6970',
      picture: 'http://api.randomuser.me/portraits/women/48.jpg',
    },
    seed: 'ecbab052770258bf',
    version: '0.4',
  },
  {
    user: {
      gender: 'male',
      name: {
        title: 'mr',
        first: 'thomas',
        last: 'henry',
      },
      location: {
        street: '1214 samaritan dr',
        city: 'salem',
        state: 'new hampshire',
        zip: '70144',
      },
      email: 'thomas.henry86@example.com',
      username: 'brownfish733',
      password: 'meier',
      salt: 'BUnw0dYb',
      md5: 'f401b906b21534011741ae5449c49f68',
      sha1: 'c09fbeedc563320b752e686a7190315af981d93c',
      sha256:
        'e880d84071ab99e8eb76dc6265e45b425b0b42a282cb9f9495733237ef39bf87',
      registered: '927872277',
      dob: '385931775',
      phone: '(539)-696-4707',
      cell: '(226)-246-4556',
      SSN: '433-65-1968',
      picture: 'http://api.randomuser.me/portraits/men/83.jpg',
    },
    seed: '2c587763bf71b2c9',
    version: '0.4',
  },
];

const styles = StyleSheet.create({
  swiper: {
    backgroundColor: AppColorPallete.light.background,
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        cards: MOCKUP_RANDOM_PEOPLE.map(Person.toObjectFromJSON),
      });
    }, 3000);
  }

  onUserCardPress = (item, index) => {
    
  };

  renderCard = (card, index) => {
    console.tron.log(`Card: ${card} - Index: ${index}`);
    return card ? (
      <UserCard item={card} index={index} onCardPress={this.onUserCardPress} />
    ) : null;
  };

  onSwiped = type => {
    console.log(`on swiped ${type}`);
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <CardSwiper
          containerStyle={styles.swiper}
          dataSource={this.state.cards}
          cardIndex={this.state.cardIndex}
          renderCard={this.renderCard}
          onSwiped={this.onSwiped}
        />
      </View>
    );
  }
}

export default HomeScreen;
