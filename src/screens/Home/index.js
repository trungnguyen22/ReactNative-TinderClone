import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import _ from 'lodash';

import {commonStyles, AppColorPallete} from '../../theme';
import CardSwiper, {SWIPE_TYPE} from '../../components/CardSwiper';
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

  componentDidMount() {
    this.preloadData();
  }

  componentDidUpdate() {
    this.onlyShowLoadingAtTheFirstTime = false;
  }

  preFetchSomeRandomPerson(listRandomPerson) {
    if (_.isEmpty(listRandomPerson)) {
      this.props.fetchRandomPerson();
      this.props.fetchRandomPerson();
      this.props.fetchRandomPerson();
      this.props.fetchRandomPerson();
    }
  }

  preloadData = () => {
    const {listRandomPerson} = this.props;
    this.preFetchSomeRandomPerson(listRandomPerson);
  };

  handleOnSwiped = (type, index) => {
    const {listRandomPerson} = this.props;
    const person = listRandomPerson[index];
    if (!_.isEmpty(listRandomPerson)) {
      switch (type) {
        case SWIPE_TYPE.RIGHT:
          this.props.updateListFavoritePerson(person);
          this.props.fetchRandomPerson();
          // this.props.deleteRandomPerson(person);
          break;
        case SWIPE_TYPE.LEFT:
          this.props.fetchRandomPerson();
          // this.props.deleteRandomPerson(person);
          break;
        case SWIPE_TYPE.TOP:
          this.props.updateListFavoritePerson(listRandomPerson[index]);
          this.props.fetchRandomPerson();
          // this.props.deleteRandomPerson(person);
          break;
      }
    }
  };

  onUserCardPress = (item, index) => {
    // TODO: When click on card, move to PersonInfoDetailsScreen
  };

  onSwiped = (type, index) => {
    this.handleOnSwiped(type, index);
  };

  onReloadPress = () => {
    this.preloadData();
  };

  renderCard = (card, index) => {
    return card ? (
      <UserCard item={card} index={index} onCardPress={this.onUserCardPress} />
    ) : null;
  };

  renderCardSwiper = listRandomPerson => (
    <CardSwiper
      containerStyle={styles.swiper}
      dataSource={listRandomPerson}
      cardIndex={0}
      renderCard={this.renderCard}
      onSwiped={this.onSwiped}
    />
  );

  renderEmptyData = () => (
    <EmptyData
      message="Data is not available. There is something wrong."
      onReloadPress={this.onReloadPress}
    />
  );

  render() {
    const {listRandomPerson, isGettingRandomPerson} = this.props;
    const showLoading =
      isGettingRandomPerson && this.onlyShowLoadingAtTheFirstTime;
    return (
      <View style={commonStyles.container}>
        {this.renderCardSwiper(listRandomPerson)}
        {_.isEmpty(listRandomPerson) ? this.renderEmptyData() : null}
        {showLoading ? <FullscreenLoading /> : null}
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
