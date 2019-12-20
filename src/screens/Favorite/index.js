import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {commonStyles} from '../../theme';
import Card from '../../components/Card';
import CircleImage from '../../components/CircleImage';
import {FlatList} from 'react-native-gesture-handler';
import {scale} from 'react-native-size-matters';

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

const mapStateToProps = state => ({
  listFavoritePerson: state.listFavoritePerson,
});

export default connect(mapStateToProps, null)(FavoritesScreen);
