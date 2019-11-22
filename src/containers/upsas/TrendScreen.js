import React, { Component, useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Card, Container, Content, Segment, Button } from "native-base";
import { connect } from "react-redux";
import _ from "lodash";
import DatePicker from "react-native-datepicker";
import Picker from "react-native-picker-select";
//compoents
import CustomHeader from "../../components/CustomHeader";
import LineChart from "../../components/LineChart";
//action
import { reqTrendData } from "../../actions/upsas/trendAction";
import moment from "moment";

// 라인 차트 리스트 생성
const makeLineChartList = lineChartDataList => {
  return _.map(lineChartDataList, lineChartDataInfo => {
    return (
      <Card>
        <LineChart chartInfo={lineChartDataInfo}></LineChart>
      </Card>
    );
  });
};

const TrendScreen = props => {
  const [selectedSegment, setSelectedSegment] = useState("sensor");
  const [startDateInputVal, setStartDateInputVal] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [searchInterval, setSearchInterval] = useState("hour");
  const { trendReducerInfo, authReducerInfo } = props;
  // trend 응답 데이터 정보
  const { trendDataInfo, isLoading } = trendReducerInfo;
  const { sensorTrendList, inverterTrendList } = trendDataInfo;
  // auth 응답 데이터 정보
  const { userInfo } = authReducerInfo;
  const { siteList } = userInfo;
  const { siteId } = props.siteIdSaveReducerInfo; // 선택된 장소 id
  const intervalPickerItems = [
    {
      label: "1시간",
      value: "hour"
    },
    {
      label: "10분",
      value: "min10"
    },
    {
      label: "1분",
      value: "min"
    }
  ];

  // 트렌드 데이터 요청
  useEffect(() => {
    props.trendDataReqHandler(
      siteId,
      "days",
      searchInterval,
      startDateInputVal,
      ""
    );
  }, [siteId]);

  return (
    <Container>
      <CustomHeader
        hasSegment={true}
        siteId={siteId}
        siteList={siteList}
      ></CustomHeader>
      <Segment style={styles.segment}>
        <Button
          first
          active={selectedSegment === "sensor" && true}
          style={styles.segmentButton}
          onPress={() => {
            setSelectedSegment("sensor");
          }}
        >
          <Text>생육환경</Text>
        </Button>
        <Button
          last
          active={selectedSegment === "inverter" && true}
          style={styles.segmentButton}
          onPress={() => {
            setSelectedSegment("inverter");
          }}
        >
          <Text>인버터</Text>
        </Button>
      </Segment>
      <Segment style={styles.segment}>
        <Picker
          value={searchInterval}
          style={intervalPickerStyle}
          placeholder
          onValueChange={selectedInterval => {
            setSearchInterval(selectedInterval);
          }}
          items={intervalPickerItems}
        ></Picker>
        <DatePicker
          date={startDateInputVal}
          mode="date"
          locale="ko"
          confirmBtnText="확인"
          cancelBtnText="취소"
          showIcon={false}
          style={styles.datePicker}
          onDateChange={date => {
            setStartDateInputVal(date);
          }}
        ></DatePicker>
        <Button
          active
          first
          last
          onPress={() => {
            props.trendDataReqHandler(
              siteId,
              "days",
              searchInterval,
              startDateInputVal,
              ""
            );
          }}
        >
          <Text>검색</Text>
        </Button>
      </Segment>
      <Content>
        <ScrollView>
          {makeLineChartList(
            selectedSegment === "sensor" ? sensorTrendList : inverterTrendList
          )}
        </ScrollView>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    trendReducerInfo: state.trendReducerInfo,
    authReducerInfo: state.authReducerInfo,
    siteIdSaveReducerInfo: state.siteIdSaveReducerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    trendDataReqHandler: (
      siteId,
      searchType,
      searchInterval,
      startDateInputValue,
      endDateInputValue
    ) => {
      dispatch(
        reqTrendData(
          siteId,
          searchType,
          searchInterval,
          startDateInputValue,
          endDateInputValue
        )
      );
    }
  };
};

const styles = StyleSheet.create({
  segment: {
    paddingHorizontal: 10,
    justifyContent: "flex-end"
  },
  segmentButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  datePicker: { marginHorizontal: 5 }
});

const intervalPickerStyle = StyleSheet.create({
  inputIOS: {
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 11
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendScreen);
