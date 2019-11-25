import React, { Component, useEffect, useState, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  AsyncStorage
} from "react-native";
import { Card, Container, Content, Segment, Button } from "native-base";
import { connect } from "react-redux";
import EntypoIcon from "react-native-vector-icons/Entypo";
import _ from "lodash";
import moment from "moment";
//compoents
import CustomHeader from "../../components/CustomHeader";
import LineChart from "../../components/LineChart";
import OverlayLoading from "react-native-loading-spinner-overlay";
//action
import { reqTrendData } from "../../actions/upsas/trendAction";
import { changeSearchInfo } from "../../actions/upsas/trendSearchAction";

//load icon
EntypoIcon.loadFont();

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

const waitRefresh = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const TrendScreen = props => {
  //state
  const [selectedSegment, setSelectedSegment] = useState("sensor");
  const defaultSearchInfo = {
    searchType: "days",
    searchInterval: "hour",
    strStartDateInputValue: moment().format("YYYY-MM-DD"),
    strEndDateInputValue: ""
  };
  const [searchInfo, setSearchInfo] = useState(defaultSearchInfo);
  //props
  const { trendReducerInfo, authReducerInfo, trendSearchReducerInfo } = props;
  //
  const { changedSearchInfo } = trendSearchReducerInfo;
  // trend 응답 데이터 정보
  const { trendDataInfo, isLoading } = trendReducerInfo;
  const { sensorTrendList, inverterTrendList } = trendDataInfo;
  // auth 응답 데이터 정보
  const { userInfo } = authReducerInfo;
  const { siteList } = userInfo;
  const { siteId } = props.siteIdSaveReducerInfo; // 선택된 장소 id
  const {
    searchType,
    searchInterval,
    strStartDateInputValue,
    strEndDateInputValue
  } = searchInfo;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    props.trendDataReqHandler(
      siteId,
      searchType,
      searchInterval,
      strStartDateInputValue,
      strEndDateInputValue
    );
    waitRefresh(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  // 검색 상태 변경시 데이터 재 요청
  useEffect(() => {
    if (!_.isUndefined(changedSearchInfo)) {
      if (!_.isEqual(changedSearchInfo, searchInfo)) {
        setSearchInfo(changedSearchInfo);
      }
    }
  }, [changedSearchInfo]);

  // 트렌드 데이터 요청
  useEffect(() => {
    props.trendDataReqHandler(
      siteId,
      searchType,
      searchInterval,
      strStartDateInputValue,
      strEndDateInputValue
    );
  }, [siteId, searchInfo]);

  return (
    <Container style={styles.container}>
      <OverlayLoading visible={isLoading}></OverlayLoading>
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
        <Text>
          {strStartDateInputValue}, {searchInterval}
        </Text>
        <Button
          active
          first
          last
          style={styles.searchButton}
          onPress={() => {
            props.navigation.navigate("SearchScreen", {
              searchInfo: searchInfo
            });
          }}
        >
          <EntypoIcon name="calendar"></EntypoIcon>
        </Button>
      </Segment>
      {/* <Content> */}
      <SafeAreaView style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            ></RefreshControl>
          }
        >
          {makeLineChartList(
            selectedSegment === "sensor" ? sensorTrendList : inverterTrendList
          )}
        </ScrollView>
      </SafeAreaView>
      {/* </Content> */}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    trendReducerInfo: state.trendReducerInfo,
    trendSearchReducerInfo: state.trendSearchReducerInfo,
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
      strStartDateInputValue,
      strEndDateInputValue
    ) => {
      dispatch(
        reqTrendData(
          siteId,
          searchType,
          searchInterval,
          strStartDateInputValue,
          strEndDateInputValue
        )
      );
      dispatch(
        changeSearchInfo({
          searchType,
          searchInterval,
          strStartDateInputValue,
          strEndDateInputValue
        })
      );
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  segment: {
    paddingHorizontal: 10,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  segmentButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    padding: 10,
    marginHorizontal: 10
  },
  scrollView: {
    flex: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendScreen);
