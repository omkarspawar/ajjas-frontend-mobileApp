import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CustomDateRangeCard = ({window, selected = false, setInitialWindow, setSelectedStartDate, setSelectedEndDate, fromDate, toDate}) => {


  const[customStartDate, setCustomStartDate] = useState(moment(fromDate,'YYYY/MM/DD').startOf('day'))
  const[customEndDate, setCustomEndDate] = useState(moment(toDate,'YYYY/MM/DD').endOf('day'))
  const [ isStartDateCalenderVisible, setIsStartDateCalenderVisible ] = useState(false)
  const [ isEndDateCalenderVisible, setIsEndDateCalenderVisible ] = useState(false)


  const handleConfirm = (date, interval) => {
    setInitialWindow(window)
    if(interval=="start"){ 
      setCustomStartDate(moment(date).startOf('day'))
      setCustomEndDate(moment().startOf('day'))
    }
    else{
      setCustomEndDate(moment(date).startOf('day'))
    }
    setIsStartDateCalenderVisible(false);
    setIsEndDateCalenderVisible(false)
  };

  useEffect(()=>{
    if(selected){
      console.log(customStartDate.format('YYYY/MM/DD'), customEndDate.format('YYYY/MM/DD'))
      setSelectedStartDate(customStartDate.format('YYYY/MM/DD'))
      setSelectedEndDate(customEndDate.format('YYYY/MM/DD'))
    }
  },[customStartDate,customEndDate])


  
  return (
    <TouchableOpacity
    onPress={()=>{
        setInitialWindow(window)
        // setSelectedStartDate(startDate.format('YYYY/MM/DD'))
        // setSelectedEndDate(endDate.format('YYYY/MM/DD'))
    }}
      style={{
        display: 'flex',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
      <View style={{display:"flex", justifyContent:"space-between", flexDirection:"row", width:"100%"}}>
      <Text style={{color:selected ? "#FFBE00" : '#FFF', fontSize: 14}}>{window}</Text>
        {selected && (
          <Text style={{display:"flex", justifyContent:"flex-end"}}>
            <AntDesign
              name="check"
              size={18}
              color="#FFBE00"
              style={{marginHorizontal: 20}}
            />
          </Text>
        )}
      </View>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:10}}>
          {/* ------start card---------- */}
          <TouchableOpacity style={styles.calenderCard} onPress={() => setIsStartDateCalenderVisible(true) }>
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Fontisto
              name="date"
              size={18}
              color="#9B9B9B"
            />
            </View>
            <View  style={{flex:2, justifyContent:"center", alignItems:"flex-start"}}>
              <Text style={{color:"#F3F3F3", fontSize:14}}>Start Date</Text>
              <Text style={{color:"rgba(255, 255, 255, 0.60)", fontSize:12}}>{customStartDate.format('dddd, MMM D')}</Text>
            </View>
            <DateTimePickerModal
                date={new Date(customStartDate)}
                isVisible={isStartDateCalenderVisible}
                mode="date"
                onConfirm={(date) => { handleConfirm(date, "start") }}
                onCancel={() => setIsStartDateCalenderVisible(false) }
                maximumDate={new Date()}
                minimumDate={ new Date(moment().startOf('year'))}            />
          </TouchableOpacity>
         {/* ------end card---------- */}

          <TouchableOpacity style={styles.calenderCard} onPress={() => setIsEndDateCalenderVisible(true) }>
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Fontisto
              name="date"
              size={18}
              color="#9B9B9B"
            />
            </View>
            <View  style={{flex:2, justifyContent:"center", alignItems:"flex-start"}}>
              <Text style={{color:"#F3F3F3", fontSize:14}}>End Date</Text>
              <Text style={{color:"rgba(255, 255, 255, 0.60)", fontSize:12}}>{customEndDate.format('dddd, MMM D')}</Text>
            </View>
            <DateTimePickerModal
                date={new Date(customEndDate)}
                isVisible={isEndDateCalenderVisible}
                mode="date"
                onConfirm={(date) => { handleConfirm(date, "end") }}
                onCancel={() => setIsEndDateCalenderVisible(false) }
                maximumDate={new Date()}
                minimumDate={ new Date(customStartDate)}
            />
          </TouchableOpacity>
        </View>
      </View>
     
    </TouchableOpacity>
  );
};

export default CustomDateRangeCard;

const styles = StyleSheet.create({
  calenderCard:{
    height:50,
    borderWidth:0.5,
    borderColor:"rgba(255, 255, 255, 0.30)",
    width:"45%",
    borderRadius:6,
    flexDirection:"row"
  }
});
