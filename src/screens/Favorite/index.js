import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet, Button} from 'react-native';
import {commonStyles, AppColorPallete} from '../../theme';
import Card from '../../components/Card';
import CircleImage from '../../components/CircleImage';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {scale} from 'react-native-size-matters';
import {clearListFavoritePerson} from '../../redux/actions/randomPerson';

const styles = StyleSheet.create({
  favItemContainer: {
    backgroundColor: 'white',
    marginBottom: 8,
  },
  favItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favTitle: {
    fontWeight: '600',
    fontSize: 18,
  },
  favDesc: {
    color: '#c4c4c4',
    fontSize: 14,
  },
});

const FavoriteItem = ({avatarURL, title, description}) => (
  <Card
    containerStyle={styles.favItemContainer}
    child={
      <View style={styles.favItem}>
        <CircleImage imageSize={scale(44)} imageSource={{uri: avatarURL}} />
        <View style={{marginLeft: 16}}>
          <Text style={styles.favTitle}>{title}</Text>
          <Text style={[styles.favDesc, {marginTop: 4}]}>{description}</Text>
        </View>
      </View>
    }
  />
);

class FavoritesScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: () => (
      <TouchableOpacity
        style={{paddingLeft: 16, paddingRight: 16}}
        hitSlop={{top: 16, bottom: 16, right: 16, left: 16}}
        onPress={navigation.getParam('clearAll')}>
        <Text
          style={{
            color: AppColorPallete.light.primary,
            fontSize: 14,
            fontWeight: '600',
          }}>
          {'Clear All'}
        </Text>
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    this.props.navigation.setParams({clearAll: this.onClearAllButtonPress});
  }

  onClearAllButtonPress = () => {
    this.props.clearListFavoritePerson();
  };

  renderFavoriteItem = ({item, index}) => (
    <FavoriteItem
      avatarURL={item.avatarURL}
      title={item.fullName}
      description={`${item.address} - ${item.phone}`}
    />
  );

  renderFavoriteList = listFavoritePerson => (
    <FlatList
      data={listFavoritePerson}
      renderItem={this.renderFavoriteItem}
      keyExtractor={item => item.fullName}
    />
  );

  render() {
    const {listFavoritePerson} = this.props;
    return (
      <View style={[commonStyles.container, {padding: 8}]}>
        {this.renderFavoriteList(listFavoritePerson)}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  clearListFavoritePerson: person => dispatch(clearListFavoritePerson(person)),
});

const mapStateToProps = state => ({
  listFavoritePerson: state.listFavoritePerson,
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
