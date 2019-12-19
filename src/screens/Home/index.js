import React, {Component} from 'react';
import {View} from 'react-native';

import {commonStyles} from '../../theme';
import CardSwiper from '../../components/CardSwiper';
import Card from '../../components/Card';

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [...range(1, 50)],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
    };
  }

  renderCard = (card, index) => {
    return <Card />;
  };

  onSwiped = type => {
    console.log(`on swiped ${type}`);
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <CardSwiper
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
