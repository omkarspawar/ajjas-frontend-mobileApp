import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {getDateRange} from '../commonFunctions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DateRangeCard = ({type, window, selected = false, setInitialRange, setInitialWindow, setSelectedStartDate, setSelectedEndDate}) => {
  const {startDate, endDate, dateRange} = getDateRange(type, window);

  
  return (
    <TouchableOpacity
    onPress={()=>{
        setInitialWindow(window)
        setSelectedStartDate(startDate.format('YYYY/MM/DD'))
        setSelectedEndDate(endDate.format('YYYY/MM/DD'))
    }}
      style={{
        display: 'flex',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        <Text style={{color:selected ? "#FFBE00" : '#FFF', fontSize: 14}}>{window}</Text>
        <Text style={{color: 'rgba(255, 255, 255, 0.60)', fontSize: 12}}>
          {dateRange}
        </Text>
      </View>
      <View>
        {selected && (
          <Text>
            <AntDesign
              name="check"
              size={18}
              color="#FFBE00"
              style={{marginHorizontal: 20}}
            />
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DateRangeCard;

const styles = StyleSheet.create({});
