import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import moment from 'moment';
const calenderImage = require('./src/Assets/calender.png');
const rightSlider = require('./src/Assets/rightSlidearrow.png');
const leftSlider = require('./src/Assets/leftSlideArrow.png');
const gotoBtn = require('./src/Assets/rightArrow.png');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StatCard from './src/components/StatCard';
import DateRangeModal from './src/screen/DateRangeModal';


const MyComponent = () => {
  const [fromDate, setFromDate] = useState(moment().format('YYYY/MM/DD'))
  const [toDate, setToDate] = useState(moment().format('YYYY/MM/DD'))
  const [timePeriod, setTimePeriod] = useState("Today")
  const [defaultRange, setDefaultRange] = useState(0)
  const[stats, setstats] = useState({
    score:"0",
    distanceTravelled:"0",
    timedurationHr:"0",
    timeDurationMin:"00",
    avgSpeed:"0",
    topspeed:"0",
    fuelConsume:"0",
    fuelCost:"0",
    scoreStatus:"None",
    scoreStatusColor:"#259DFE",
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
 

  useEffect(()=>{


fetch("http://192.168.1.5:8000/api/statistics", {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "startdate": toDate,
    "enddate": fromDate
  }),
})
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    if(result.success){
      if(result?.data?.statsData.length >0){
      let statsData = result?.data?.statsData[0]
      console.log({statsData})

      setstats({
        score:statsData?.score,
        distanceTravelled:statsData?.distance,
        timedurationHr:statsData?.durationHours,
        timeDurationMin:statsData?.durationMinutes,
        avgSpeed:statsData?.averageSpeed,
        topspeed:statsData?.topSpeed,
        fuelConsume:statsData?.fuelConsumed,
        fuelCost:statsData?.fuelCost,
        scoreStatus: statsData?.score > 90 ? "Excellent" : (
          statsData?.score > 70 ? "Good" : (
            statsData?.score > 40 ? "Average" : "Poor"
          )
        ),
        scoreStatusColor: statsData?.score > 90 ? "#259DFE" : (
          statsData?.score > 70 ? "#259DFE" : (
            statsData?.score > 40 ? "#E3703C" : "#C14345"
          )
        )
      })}else{
        setstats({
          score:"0",
          distanceTravelled:"0",
          timedurationHr:"0",
          timeDurationMin:"00",
          avgSpeed:"0",
          topspeed:"0",
          fuelConsume:"0",
          fuelCost:"0",
          scoreStatus:"None",
          scoreStatusColor:"#259DFE",
        })
        Alert.alert("","No data found for the selected date range")
      }
    }
   
  })
  .catch((error) => console.error(error));

  },[fromDate,toDate])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.topContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.pageTitle}>Statistics</Text>
          </View>
          <TouchableOpacity style={styles.rangeWrapper} onPress={()=>setIsModalVisible(true)}>
            <View style={styles.dateRangePickerWrapper}>
              <View style={styles.dateRangePicker} >
                <Image
                  source={calenderImage}
                  style={styles.dateRangePickerCalender}
                />
                <Text style={styles.dateRangePickerText}>{
                  fromDate==toDate ?  
                  ` ${moment(fromDate, 'YYYY/MM/DD').format('MMM D')} (${timePeriod})`
                  :
                 ` ${moment(fromDate, 'YYYY/MM/DD').format('MMM D')} - ${moment(toDate, 'YYYY/MM/DD').format('MMM D')} (${timePeriod})`
                }</Text>
              </View>
            </View>
            <View style={styles.arrowWrapper} >
              <Image source={leftSlider} style={styles.sliderArrows} />
              <Image source={rightSlider} style={styles.sliderArrows} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.middleContainer}>
{/* --------------Riding behaviour card----------- */}
          <View style={styles.ridingBehaviorcardWrapper}>
            <View style={styles.ridingBehaviorTitleWrapper}>
              <View style={styles.ridingBehaviorTextWrapper}>
                <Text style={styles.ridingBehaviorText}>Riding Behaviour</Text>
              </View>
              <TouchableOpacity style={styles.ridingBehaviorGotoButtonWrapper} >
                  <Image
                    source={gotoBtn}
                    style={styles.gotoButton}
                  />
              </TouchableOpacity>
            </View>
            <View style={styles.ridingBehaviorInfoContainerWrapper}>
            <View style={styles.ridingBehaviorInfoContainer}>
              <View style={styles.ridingBehaviorInfoLeftContainer}>
              <View style={styles.ridingBehaviorInfo}>
              <View style={[styles.ridingBehaviorInfoPercentageWrapper, {backgroundColor:stats?.scoreStatusColor,borderColor:stats?.scoreStatusColor}]} >
                <Text style={styles.ridingBehaviorInfoPercentage}>{stats?.score}%</Text>
                </View>
                <View style={[styles.ridingBehaviorInfoStatusWrapper,{borderColor:stats?.scoreStatusColor}]}>
                <Text style={styles.ridingBehaviorInfoStatus}>{stats?.scoreStatus}</Text>
                </View>
                </View>
              
              </View>
              <View style={styles.ridingBehaviorInfoRightContainer}>
                <View style={styles.ridingBehaviorInfoRightWrapper}>
                <FontAwesome6 name="arrow-trend-down" size={12} color="#900" style={{marginRight:5}}/>
                <Text style={{fontSize:10, color:"#D24343"}}>24% </Text>
                <Text style={{fontSize:10, color:"#FFF"}}>vs </Text>
                <Text style={{fontSize:10, color:"#FFF", fontStyle:"bold"}}>Preceding period</Text>

                </View>
              </View>
              </View>
            </View>
          </View>
          
{/*---------- bottom card 1----------------- */}
          <StatCard
           CardTitle={'Journey'}
           LCImg={
           <View style={[styles.IconWrapper,{backgroundColor:"rgba(110, 221, 201, 0.26)"}]}>
              <FontAwesome6 name="route" size={10} color="#6EDDC9"/>
           </View>
           }
           LCHeading="Distance travelled"
           LCRange={<View style={{marginTop:4, flexDirection:"row", alignItems:"baseline"}}>
            <Text style={styles.range}>{stats?.distanceTravelled}</Text>
            <Text style={styles.unit}>{" km"}</Text>
            </View>}
           isLCRangeIncresed={false}
           ChangedLCRangeCount={"24%"}
           RCImg={
            <View style={[styles.IconWrapper,{backgroundColor:"rgba(0, 169, 226, 0.25)"}]}>
              <MaterialIcons name="access-time" size={10} color="#00A8E2" />
           </View>
          }
          RCHeading={"Time Duration"}
          RCRange={<View style={{marginTop:4, flexDirection:"row", alignItems:"baseline"}}>
                      <Text style={styles.range}>{stats?.timedurationHr}</Text>
                      <Text style={styles.unit}>{" hr "}</Text>
                      <Text style={styles.range}>{stats?.timeDurationMin}</Text>
                      <Text style={styles.unit}>{" min"}</Text>
                   </View>}
          isRCRangeIncresed={false}
          ChangedRCRangeCount={"24%"}
          />

{/*---------- bottom card 2----------------- */}
          <StatCard
           CardTitle={'Speed'}
           LCImg={
           <View style={[styles.IconWrapper,{backgroundColor:"rgba(172, 98, 13, 0.25)"}]}>
              <MaterialCommunityIcons name="speedometer-slow" size={10} color="#AC630D"/>
           </View>
           }
           LCHeading="Average speed"
           LCRange={<View style={{marginTop:4, flexDirection:"row", alignItems:"baseline"}}>
            <Text style={styles.range}>{stats?.avgSpeed}</Text>
            <Text style={styles.unit}>{" km/hr"}</Text>
            </View>}
           isLCRangeIncresed={false}
           ChangedLCRangeCount={"24%"}
           RCImg={
            <View style={[styles.IconWrapper,{backgroundColor:"rgba(226, 182, 25, 0.25)"}]}>
              <MaterialCommunityIcons name="speedometer" size={10} color="#E2B519" />
           </View>
          }
          RCHeading={"Top speed"}
          RCRange={<View style={{marginTop:4, flexDirection:"row", alignItems:"baseline"}}>
                      <Text style={styles.range}>{stats?.topspeed}</Text>
                      <Text style={styles.unit}>{" km/hr"}</Text>
                   </View>}
          isRCRangeIncresed={true}
          ChangedRCRangeCount={"24%"}
          />

{/*---------- bottom card 3----------------- */}
          <StatCard
           CardTitle={'Fuel'}
           LCImg={
           <View style={[styles.IconWrapper,{backgroundColor:"rgba(179, 221, 110, 0.25)"}]}>
              <MaterialCommunityIcons name="oil" size={10} color="#B3DD6E"/>
           </View>
           }
           LCHeading="Fuel Consumed"
           LCRange={<View style={{marginTop:4, flexDirection:"row", alignItems:"baseline"}}>
            <Text style={styles.range}>{stats?.fuelConsume}</Text>
            <Text style={styles.unit}>{" L"}</Text>
            </View>}
           isLCRangeIncresed={false}
           ChangedLCRangeCount={"24%"}
           RCImg={
            <View style={[styles.IconWrapper,{backgroundColor:"rgba(113, 148, 56, 0.25)"}]}>
              <FontAwesome name="rupee" size={10} color="#719438" />
           </View>
          }
          RCHeading={"Fuel Cost"}
          RCRange={<View style={{marginTop:4, flexDirection:"row", alignItems:"baseline"}}>
                      <Text style={styles.unit}>{"₹ "}</Text>
                      <Text style={styles.range}>{stats?.fuelCost}</Text>
                   </View>}
          isRCRangeIncresed={false}
          ChangedRCRangeCount={"24%"}
          />
        </View>
{/* -----------------DateRange Modal -------------------------*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <DateRangeModal
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
          setIsModalVisible={setIsModalVisible}
          defaultRange={defaultRange}
          setDefaultRange={setDefaultRange}
      />
      </Modal>

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

  titleWrapper: {
    flex: 1,
    marginHorizontal: 20,
  },

  pageTitle: {
    color: '#FFFFFFE5',
    fontFamily: 'Nunito Sans',
    fontSize: 16,
    marginTop: 25,
  },

  rangeWrapper: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: 'row',
  },

  dateRangePickerWrapper: {
    flex: 4,
  },

  dateRangePicker: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  dateRangePickerCalender: {
    height: 18,
    width: 20,
  },
  sliderArrows: {
    height: 14,
    width: 10,
  },

  dateRangePickerText: {
    color: '#FFF',
    marginHorizontal: 10,
    fontSize: 14,
  },

  arrowWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // -----------------------------Middle Container StyleSheet--------------------------------
  middleContainer: {
    flex: 1,
    marginHorizontal: 20,
  },

  ridingBehaviorcardWrapper: {
    height: 116,
    borderWidth:0.25,
    borderColor:"#EEEEEE52",
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    marginTop: 20,
    marginBottom: 10,
  },

  ridingBehaviorTitleWrapper: {
    height: 53,
    marginHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  ridingBehaviorTextWrapper: {
    flex: 4,
    height: '100%',
    justifyContent: 'center',
  },

  ridingBehaviorText: {
    color: '#F3F3F3E5',
    fontSize: 14,
  },

  ridingBehaviorGotoButtonWrapper: {
    flex: 1,
    height: '100%',
    justifyContent:"center",
    alignItems:"flex-end"
  },

  gotoButton: {
    height: 10,
    width: 14,
  },

  ridingBehaviorInfoContainerWrapper: {
    height: 63,
    marginHorizontal: 15,
  },

  ridingBehaviorInfoContainer:{
    borderWidth:0.25,
    borderColor:"#EEEEEE52",
    height: 49,
    backgroundColor:"#222222",
    borderRadius:8,
    flexDirection:"row"
  },

  ridingBehaviorInfoLeftContainer:{
    // borderWidth:1,
    // borderColor:"#FFF",
    height:"100%",
    flex:10,
    justifyContent:"center",
    alignItems:"center",
  },


  ridingBehaviorInfo:{
    flex:1,
    height:"100%",
    flexDirection:"row",
    marginHorizontal:10,
    alignItems:"center",
    width:107
  },

  ridingBehaviorInfoPercentageWrapper:{
    borderWidth:0.5,
    borderColor:"#259DFE",
    height:25,
    flex:2,
    borderTopLeftRadius:4,
    borderBottomLeftRadius:4,
    alignItems:"center",
    justifyContent:"center"

  },

  ridingBehaviorInfoPercentage:{
    textAlign:"center",
    fontSize:10,
    color:"#FFF",
    padding:0
  },


  ridingBehaviorInfoStatusWrapper:{
    borderWidth:0.5,
    borderColor:"#259DFE",
    backgroundColor:"#1A1A1A",
    height:25,
    flex:4,
    borderTopRightRadius:4,
    borderBottomRightRadius:4,
    alignItems:"center",
    justifyContent:"center"
  },

  ridingBehaviorInfoStatus:{
    textAlign:"center",
    fontSize:12,
    color:"#FFF",
    padding:0,
  },


  ridingBehaviorInfoRightContainer:{
    // borderWidth:1,
    // borderColor:"#FFF",
     height:"100%",
     flex:11,
     justifyContent:"center"
  },

  ridingBehaviorInfoRightWrapper:{
    flexDirection:"row"
  },

  //----------------bottom cards------------------------

  IconWrapper:{
    width:20,
    height:20,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:50
  },

  range:{
    fontSize:24,
    color:"#rgba(255, 255, 255, 0.9)"
  },

  unit:{
    fontSize:16,
    color:"#rgba(255, 255, 255, 0.9)"
  },
});

export default MyComponent;
