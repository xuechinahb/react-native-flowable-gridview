/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
import FlowableGridView from 'react-native-flowable-gridview';
const colors = ['aliceblue', 'antiquewhite', 'aquamarine', 'lavenderblush', 'lavenderblush'];
const itemWidth = 60 ;
export default class extends Component {
  constructor(props){
    super(props);
    const width = 0;
    this.state = {width};
  }

  render() {
    let datas =  [
      Array(12).fill('').map((_,i) => ({key: i, text: `item #${i}`})),
      Array(8).fill('').map((_,i) => ({key: i, text: `item #${i}`})),
    ];
    const itemViews = datas.map((value, index)=>
      <View key={index}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Goup #{index}</Text>
        </View>
        <FlowableGridView
          dataSource={value}
          itemWidth={itemWidth}
          columnSpace={20}
          rowSpace={10}
          keyExtractor={(data, index) =>  data.key}
          renderItem={(data, index)=>
                <View style={[styles.item, {backgroundColor: colors[index % colors.length]}]}>
                  <Text>{data.text}</Text>
                </View>
          }
        />
      </View>
    )

    let renderGroup = (index) =>
      <View style={styles.groupView}>
        <Text style={styles.groupText}>Goup #{index}</Text>
      </View>;
    let renderGrid = (datas, style) =>
      <FlowableGridView
        style={style}
        dataSource={datas}
        itemWidth={itemWidth}
        columnSpace={20}
        rowSpace={10}
        keyExtractor={(data, index) =>  data.key}
        renderItem={(data, index)=>
              <View style={[styles.item, {backgroundColor: colors[index % colors.length]}]}>
                <Text>{data.text}</Text>
              </View>
        }
      /> ; 


    return (
      <ScrollView style={styles.container}
        onLayout={({nativeEvent}) => {
                const width =  Dimensions.get('window').width * 0.6;
                this.setState({width});
              }}
      >
        <View>
          {renderGroup(0)}
          {renderGrid(datas[0])}
          {renderGroup(1)}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={[styles.centerView, {width: this.state.width}]}>
              {renderGrid(datas[1], style={flex: 1, alignItems: 'center'})}
            </View>
          </View>
        </View>
      </ScrollView>
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  groupView: {
    height: 44,
    justifyContent: 'center',
  },
  groupText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  item: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 8,
  },
  centerView: {
    height: 180, 
    flexDirection: 'row', 
    backgroundColor: 'gainsboro',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
