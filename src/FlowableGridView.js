import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

export default class FlowableGridView extends Component {

    constructor(props){
        super(props);
        const width = 0;
        this.state = {width};
    }

    static propTypes = {
        renderItem: PropTypes.func,
        dataSource: PropTypes.array,
        itemWidth: PropTypes.number,
        columnSpace: PropTypes.number,
        rowSpace: PropTypes.number,
        keyExtractor: PropTypes.func,
    }
    static defaultProps = {
        columnSpace: 0,
        rowSpace: 0 ,
    }

    static calculateFillCount(sum, gridWidth, itemWidth,  columnSpace, style ) {//计算需要填充的元素个数
        const paddingLeft = style&&style.paddingLeft || 0 ;
        const paddingRight = style&&style.paddingRight || 0;
        let colunmCount =  Math.floor( (gridWidth -  paddingLeft - paddingRight  + columnSpace) / (itemWidth + columnSpace)) ;
        let result =  sum - Math.floor(sum / colunmCount) * colunmCount ;
        return colunmCount - result;
    }

    render() {
        let {style, renderItem, dataSource, itemWidth, columnSpace, rowSpace, keyExtractor, ...others} = this.props;
        if(!dataSource){
            console.warn('FlowableGridView: dataSource is undefined');
            return (<View/>);
        }
        let items = <View/>;
        if(this.state.width){
          items = dataSource.map( (data, index)=>{
              let keyVal = keyExtractor&&keyExtractor(data, index);
              keyVal = keyVal || index;
              return (
                  <View key={keyVal} style={{marginLeft: columnSpace, marginTop: rowSpace, width: itemWidth}}>
                      {
                          renderItem(data, index)
                      }
                  </View>
                  )
          } );
          let fillCount = FlowableGridView.calculateFillCount(dataSource.length, this.state.width, itemWidth, columnSpace, style);
          for(let i = 0; i < fillCount; i++){
              let item = <View key={i+'b'} style={{marginLeft: columnSpace, width: itemWidth}}/>;
              items.push(item);
          }
        }
        return (
            <View
              onLayout={({nativeEvent}) => {
                const {width} = nativeEvent.layout;
                this.setState({width});
              }}
              style={[styles.container, style,{marginLeft: columnSpace ? style&&style.marginLeft || 0 - columnSpace : 0}]}
              {...others}
              >
                {
                    items
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        // alignItems: 'flex-start'
    }
});
