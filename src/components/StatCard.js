import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
const gotoBtn = require('../Assets/rightArrow.png');
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const StatCard = ({
  CardTitle,
  LCImg,
  LCHeading,
  LCRange,
  isLCRangeIncresed,
  ChangedLCRangeCount,
  RCImg,
  RCHeading,
  RCRange,
  isRCRangeIncresed,
  ChangedRCRangeCount,
}) => {
  return (
    <View style={styles.CardWrapper}>
      <View style={styles.CardTitleWrapper}>
        <View style={styles.CardTextWrapper}>
          <Text style={styles.CardText}>{CardTitle}</Text>
        </View>
        <TouchableOpacity style={styles.CardGotoButtonWrapper}>
          <Image source={gotoBtn} style={styles.gotoButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.CardInfoContainerWrapper}>
        <View style={styles.CardInfoContainer}>
          <View style={styles.CardInfoLeftContainer}>
            <View style={styles.CardInfoLeftWrapper}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}>
                <Text style={{marginLeft: 5, color: '#FFFFFF99', fontSize: 10}}>
                  {LCHeading}
                </Text>
                {LCImg}
              </View>
              {LCRange}
              <View style={{flexDirection: 'row'}}>
                {isLCRangeIncresed ? (
                  <FontAwesome6
                    name="arrow-trend-up"
                    size={12}
                    color="#5FA04F"
                    style={{marginRight: 5}}
                  />
                ) : (
                  <FontAwesome6
                    name="arrow-trend-down"
                    size={12}
                    color="#D24343"
                    style={{marginRight: 5}}
                  />
                )}
                <Text
                  style={{
                    fontSize: 10,
                    color: isLCRangeIncresed ? '#5FA04F' : '#D24343',
                  }}>
                  {ChangedLCRangeCount}{' '}
                </Text>
                <Text style={{fontSize: 10, color: '#FFF'}}>vs </Text>
                <Text style={{fontSize: 10, color: '#FFF', fontStyle: 'bold'}}>
                  Preceding period
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.CardInfoRightContainer}>
            <View style={styles.CardInfoLeftWrapper}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}>
                <Text style={{marginLeft: 5, color: '#FFFFFF99', fontSize: 10}}>
                  {RCHeading}
                </Text>
                {RCImg}
              </View>

              {RCRange}
              <View style={{flexDirection: 'row'}}>
                {isRCRangeIncresed ? (
                  <FontAwesome6
                    name="arrow-trend-up"
                    size={12}
                    color="#5FA04F"
                    style={{marginRight: 5}}
                  />
                ) : (
                  <FontAwesome6
                    name="arrow-trend-down"
                    size={12}
                    color="#D24343"
                    style={{marginRight: 5}}
                  />
                )}
                <Text
                  style={{
                    fontSize: 10,
                    color: isRCRangeIncresed ? '#5FA04F' : '#D24343',
                  }}>
                  {ChangedRCRangeCount}{' '}
                </Text>
                <Text style={{fontSize: 10, color: '#FFF'}}>vs </Text>
                <Text style={{fontSize: 10, color: '#FFF', fontStyle: 'bold'}}>
                  Preceding period
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardWrapper: {
    height: 139,
    borderWidth: 0.25,
    borderColor: '#EEEEEE52',
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    marginTop: 10,
    marginBottom: 10,
  },

  CardTitleWrapper: {
    height: 53,
    marginHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  CardTextWrapper: {
    flex: 4,
    height: '100%',
    justifyContent: 'center',
  },

  CardText: {
    color: '#F3F3F3E5',
    fontSize: 14,
  },

  CardGotoButtonWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  gotoButton: {
    height: 10,
    width: 14,
  },

  CardInfoContainerWrapper: {
    height: 63,
    marginHorizontal: 15,
  },

  CardInfoContainer: {
    // borderWidth: 0.25,
    // borderColor: '#EEEEEE52',
    height: 74,
    // backgroundColor: '#222222',
    // borderRadius: 8,
    flexDirection: 'row',
  },

  CardInfoLeftContainer: {
    borderRightWidth: 0.25,
    borderColor: '#FFF',
    height: '100%',
    flex: 1,
    alignItems: 'flex-start',
  },

  CardInfoLeftWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  CardInfoRightContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  CardInfoRightWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export default StatCard;
