import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';

import {commonStyles, AppColorPallete} from '../../theme';
import CardSwiper from '../../components/CardSwiper';
import {UserCard} from '../../components/UserCard';
import {
  fetchRandomPerson,
  updateListFavoritePerson,
} from '../../redux/actions/randomPerson';

const styles = StyleSheet.create({
  swiper: {
    backgroundColor: AppColorPallete.light.background,
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Pre-fetch 4 random person
    this.props.fetchRandomPerson();
    this.props.fetchRandomPerson();
    this.props.fetchRandomPerson();
    this.props.fetchRandomPerson();
    this.props.fetchRandomPerson();
  }

  onUserCardPress = (item, index) => {};

  renderCard = (card, index) => {
    return card ? (
      <UserCard item={card} index={index} onCardPress={this.onUserCardPress} />
    ) : null;
  };

  onSwiped = (type, index) => {
    const {listRandomPerson} = this.props;
    switch (type) {
      case 'right':
        this.props.updateListFavoritePerson(listRandomPerson[index]);
        this.props.fetchRandomPerson();
        break;
      case 'left':
        this.props.fetchRandomPerson();
        break;
      case 'top':
        this.props.fetchRandomPerson();
        break;
    }
  };

  render() {
    const {listRandomPerson} = this.props;
    return (
      <View style={commonStyles.container}>
        <CardSwiper
          containerStyle={styles.swiper}
          dataSource={listRandomPerson}
          cardIndex={0}
          renderCard={this.renderCard}
          onSwiped={this.onSwiped}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRandomPerson: () => dispatch(fetchRandomPerson()),
  updateListFavoritePerson: person =>
    dispatch(updateListFavoritePerson(person)),
});

const mapStateToProps = state => ({
  listRandomPerson: state.listRandomPerson,
  listFavoritePerson: state.listFavoritePerson,
  isGettingRandomPerson: state.isGettingRandomPerson,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
