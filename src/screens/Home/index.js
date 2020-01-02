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
  }

  componentDidMount() {
    this.preloadData();
  }

  preFetchSomeRandomPerson(listRandomPerson) {
    if (_.isEmpty(listRandomPerson)) {
      for (let i = 0; i < 5; i += 1) {
        this.props.fetchRandomPerson();
      }
    }
  }

  preloadData = () => {
    const {listRandomPerson} = this.props;
    this.preFetchSomeRandomPerson(listRandomPerson);
  };

  handleOnSwiped = (type, index) => {
    const {listRandomPerson} = this.props;
    if (!_.isEmpty(listRandomPerson)) {
      const person = listRandomPerson[index];
      switch (type) {
        case SWIPE_TYPE.RIGHT:
          this.props.updateListFavoritePerson(person);
          this.props.fetchRandomPerson();
          break;
        case SWIPE_TYPE.LEFT:
          this.props.fetchRandomPerson();
          break;
        case SWIPE_TYPE.TOP:
          this.props.updateListFavoritePerson(person);
          this.props.fetchRandomPerson();
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
      <UserCard
        key={card.registered}
        item={card}
        index={index}
        onCardPress={this.onUserCardPress}
      />
    ) : null;
  };

  renderCardSwiper = listRandomPerson => (
    <CardSwiper
      refSwiper={ref => {
        this.cardSwiper = ref;
      }}
      containerStyle={styles.swiper}
      dataSource={listRandomPerson}
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
