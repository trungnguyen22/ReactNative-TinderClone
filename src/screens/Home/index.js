import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import _ from 'lodash';

import {commonStyles, AppColorPallete} from '../../theme';
import CardSwiper from '../../components/CardSwiper';
import {UserCard} from '../../components/UserCard';
import {
  fetchRandomPerson,
  updateListFavoritePerson,
  deleteRandomPerson,
} from '../../redux/actions/randomPerson';
import EmptyData from '../../components/Empty';
import FullscreenLoading from '../../components/FullscreenLoading';

const styles = StyleSheet.create({
  swiper: {
    backgroundColor: AppColorPallete.light.background,
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.onlyShowLoadingAtTheFirstTime = true;
  }

  preloadData = () => {
    for (let i = 0; i < 5; i += 1) {
      this.props.fetchRandomPerson();
    }
  };

  componentDidMount() {
    this.preloadData();
  }

  componentDidUpdate() {
    this.onlyShowLoadingAtTheFirstTime = false;
  }

  onUserCardPress = (item, index) => {};

  onReloadPress = () => {
    this.preloadData();
  };

  renderCard = (card, index) => {
    return card ? (
      <UserCard item={card} index={index} onCardPress={this.onUserCardPress} />
    ) : null;
  };

  onSwiped = (type, index) => {
    const {listRandomPerson} = this.props;
    const person = listRandomPerson[index];
    switch (type) {
      case 'right':
        this.props.updateListFavoritePerson(person);
        this.props.deleteRandomPerson(person.phone);
        this.props.fetchRandomPerson();
        break;
      case 'left':
        this.props.deleteRandomPerson(person.phone);
        this.props.fetchRandomPerson();
        break;
      case 'top':
        this.props.updateListFavoritePerson(listRandomPerson[index]);
        this.props.deleteRandomPerson(person.phone);
        this.props.fetchRandomPerson();
        break;
    }
  };

  render() {
    const {listRandomPerson, isGettingRandomPerson} = this.props;
    return (
      <View style={commonStyles.container}>
        <CardSwiper
          containerStyle={styles.swiper}
          dataSource={listRandomPerson}
          cardIndex={0}
          renderCard={this.renderCard}
          onSwiped={this.onSwiped}
        />
        {_.isEmpty(listRandomPerson) && (
          <EmptyData onReloadPress={this.onReloadPress} />
        )}
        {isGettingRandomPerson && this.onlyShowLoadingAtTheFirstTime ? (
          <FullscreenLoading />
        ) : null}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRandomPerson: () => dispatch(fetchRandomPerson()),
  updateListFavoritePerson: person =>
    dispatch(updateListFavoritePerson(person)),
  deleteRandomPerson: phone => dispatch(deleteRandomPerson(phone)),
});

const mapStateToProps = state => ({
  listRandomPerson: state.listRandomPerson,
  listFavoritePerson: state.listFavoritePerson,
  isGettingRandomPerson: state.isGettingRandomPerson,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
