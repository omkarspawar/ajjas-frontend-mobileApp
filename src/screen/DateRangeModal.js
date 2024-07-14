import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateRangeCard from '../components/DateRangeCard';
import CustomDateRangeCard from '../components/CustomDateRangeCard';

const DateRangeModal = ({fromDate, toDate, setFromDate, setToDate, timePeriod, setTimePeriod, setIsModalVisible, defaultRange, setDefaultRange}) => {
    const [initialWindow, setInitialWindow] = useState(timePeriod)
    const [ranges, setRanges] = useState(["Day", "Week", "Month", "Other"])
    const [selectedRangeIndex, setSelectedRangeIndex] = useState(defaultRange)
    const [windows, setWindows] = useState([
        ["Today", "Yesterday", "Day Before Yesterday"],
        ["This Week", "Last Week", "Last 7 Days"],
        ["This Month", "Last Month", "Last 30 Days"],
        ["This Year", "Previous Year", "Lifetime"]
    ])
    const [selectedStartDate , setSelectedStartDate] = useState(fromDate)
    const [selectedEndDate , setSelectedEndDate] = useState(toDate)


    const handleSaveBtn=()=>{
        setFromDate(selectedStartDate);
        setToDate(selectedEndDate);
        setTimePeriod(initialWindow);
        setDefaultRange(selectedRangeIndex)
        setIsModalVisible(false);
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.topContainer}>
          <View style={styles.titleAndCloseAndSaveWrapper}>
            <View style={styles.titleAndCloseWrapper}>
            <TouchableOpacity onPress={()=>{setIsModalVisible(false)}}>
            <AntDesign name="close" size={18} color="#FFFFFF" style={{marginHorizontal:20}}/>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Date range</Text>
            </View>
            <View style={styles.saveWrapper}>
            <TouchableOpacity onPress={handleSaveBtn}>
            <Text style={styles.saveBtn}>Save</Text>
             </TouchableOpacity>
           
            </View>
          </View>
         
          <View style={styles.rangeWrapper}>
          {ranges.map((i, index)=>{
            return <TouchableOpacity
            key={index}
                    onPress={()=>setSelectedRangeIndex(index)}
                    style={[styles.range, {borderColor:index==selectedRangeIndex ? "#FFBE00" :"#1A1A1A"}]}
                    >
                        <Text style={styles.rangeName}>{i}</Text>
                    </TouchableOpacity>
          })}
          </View>
        </View>
        <View style={styles.middleContainer}>
            {
                windows[selectedRangeIndex].map((J,Jindex)=>{
                   return( 
                    <View key={Jindex} style={[styles.windowContainerWrapper, {borderColor: (Jindex<windows[selectedRangeIndex].length-1 || selectedRangeIndex==3) ? "rgba(255, 255, 255, 0.15)" : "#060606"}]}>
                        <DateRangeCard 
                        type={ranges[selectedRangeIndex]} 
                        window={J} 
                        selected={J===initialWindow} 
                        setInitialWindow={setInitialWindow}
                        setSelectedStartDate={setSelectedStartDate}
                        setSelectedEndDate={setSelectedEndDate}
                        />
                    </View>
                )
                })
            }
                     {selectedRangeIndex == 3 &&<View style={[styles.windowContainerWrapper, {borderColor:"#060606"}]}>
                        <CustomDateRangeCard
                        type={ranges[3]} 
                        window={"Custom"} 
                        selected={initialWindow == "Custom"} 
                        setInitialWindow={setInitialWindow}
                        fromDate={fromDate}
                        toDate={toDate}
                        setSelectedStartDate={setSelectedStartDate}
                        setSelectedEndDate={setSelectedEndDate}
                        />
                    </View>}

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // -----------------------------Top Container StyleSheet--------------------------------
  container: {
    flex: 1,
    backgroundColor: '#060606',
    color: '#FFF',
  },

  topContainer: {
    width: '100%',
    height: 108,
    backgroundColor: '#1A1A1A',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  titleAndCloseAndSaveWrapper: {
    flex: 1,
    flexDirection:"row",
    marginTop: 25,
  },

  titleAndCloseWrapper: {
    flex: 1,
    flexDirection:"row",
    alignItems:"center"
  },

  saveWrapper: {
    flex: 1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-end",
    marginHorizontal:20
  },

  pageTitle: {
    color: '#FFFFFFE5',
    fontFamily: 'Nunito Sans',
    fontSize: 16,
  },

  saveBtn: {
    color: '#FFBE00',
    fontFamily: 'Nunito Sans',
    fontSize: 16,
  },

  rangeWrapper: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent:"space-around"
  },


  range:{
    display:"flex",
    justifyContent:"center",
    flex:1,
    borderBottomWidth:2, 
  },

  rangeName:{
    color:"#FFF",
    textAlign:"center"
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: 20,
  },

  windowContainerWrapper:{
    minHeight:55,
    borderBottomWidth:1,
  }
});

export default DateRangeModal;
