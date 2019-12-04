import React, { Component, useEffect, useState, useCallback } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl
} from "react-native";
import Modal from "react-native-modal";
import {
  Card,
  CardItem,
  Container,
  Content,
  Segment,
  Header,
  Button,
  Left,
  Right
} from "native-base";
import { connect } from "react-redux";
import EntypoIcon from "react-native-vector-icons/Entypo";
import _ from "lodash";
import moment from "moment";
import Picker from "react-native-picker-select";
import DatePicker from "react-native-datepicker";
//compoents
import CustomHeader from "../components/CustomHeader";
import LineChart from "../components/TrendLineChart";
//action
import { reqTrendData } from "../actions/trendAction";

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
  const defaultSearchInfo = {
    searchType: "days",
    searchInterval: "hour",
    strStartDateInputValue: moment().format("YYYY-MM-DD"),
    strEndDateInputValue: ""
  };
  //props
  const { trendReducerInfo, authReducerInfo } = props;
  const { trendDataInfo, isLoading } = trendReducerInfo; // trend 응답 데이터 정보
  const { sensorTrendList, inverterTrendList } = trendDataInfo;
  const { siteList } = authReducerInfo.userInfo; // auth 응답 데이터 정보
  const { siteId } = props.siteIdSaveReducerInfo; // 선택된 장소 id
  //state
  const [selectedSegment, setSelectedSegment] = useState("sensor"); // sensor or inverter
  const [isVisibleSearchModal, setIsVisibleSearchModal] = useState(false); // 검색 창 열람
  const [searchInfo, setSearchInfo] = useState(defaultSearchInfo); // 기간, 조회 형택 등 정보
  const [refreshing, setRefreshing] = useState(false); // 새로고침 기능 상태
  // 검색 창의 조회 타입
  const [modalSearchType, setModalSearchType] = useState(
    defaultSearchInfo.searchType
  );
  // 검색 창의 조회 간격
  const [modalSearchInterval, setModalSearchInterval] = useState(
    defaultSearchInfo.searchInterval
  );
  // 검색 창의 시작 날
  const [
    modalStrStartDateInputValue,
    setModalStrStartDateInputValue
  ] = useState(defaultSearchInfo.strStartDateInputValue);
  // 검색 창의 종료 날
  const [modalStrEndDateInputValue, setModalStrEndDateInputValue] = useState(
    defaultSearchInfo.strEndDateInputValue
  );
  // select 목록에 쓰일 조회 형태 list
  const searchTypeItems = [
    {
      label: "일일",
      value: "days"
    },
    {
      label: "기간 선택",
      value: "range"
    }
  ];

  // select 목록에 쓰일 조회 간격 list
  const searchIntervalItems = [
    {
      label: "1시간",
      value: "hour"
    },
    {
      label: "1분",
      value: "min"
    },
    {
      label: "10분",
      value: "min10"
    }
  ];

  // 검색 창 모델 토글
  const toggleSearchModal = () => {
    setIsVisibleSearchModal(!isVisibleSearchModal);
  };

  // 새로고침 이벤트 발생시 데이터 재요청 실행
  const onRefresh = useCallback(() => {
    props.handleTrendDataReq(
      siteId,
      searchInfo.searchType,
      searchInfo.searchInterval,
      searchInfo.strStartDateInputValue,
      searchInfo.strEndDateInputValue
    );
  }, [searchInfo, siteId]);

  // 데이터 요청에 따른 로딩 상태 변경
  useEffect(() => {
    setRefreshing(isLoading);
  }, [isLoading]);

  // 트렌드 데이터 요청
  useEffect(() => {
    props.handleTrendDataReq(
      siteId,
      searchInfo.searchType,
      searchInfo.searchInterval,
      searchInfo.strStartDateInputValue,
      searchInfo.strEndDateInputValue
    );
  }, [siteId, searchInfo]);

  return (
    <Container style={styles.container}>
      <Modal
        isVisible={isVisibleSearchModal}
        animationIn="slideInUp"
        deviceWidth={1}
      >
        <Header>
          <Left>
            <Button transparent onPress={toggleSearchModal}>
              <Text>취소</Text>
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              onPress={() => {
                setSearchInfo({
                  searchType: modalSearchType,
                  searchInterval: modalSearchInterval,
                  strStartDateInputValue: modalStrStartDateInputValue,
                  strEndDateInputValue: modalStrEndDateInputValue
                });
                toggleSearchModal();
              }}
            >
              <Text>검색</Text>
            </Button>
          </Right>
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          <Card>
            <CardItem header bordered>
              <Text>조회기간</Text>
            </CardItem>
            <CardItem>
              <Picker
                placeholder
                style={pickerStyle}
                value={modalSearchType}
                items={searchTypeItems}
                onValueChange={searchTypeVal => {
                  setModalSearchType(searchTypeVal);
                  searchTypeVal == "range"
                    ? setModalStrEndDateInputValue(modalStrStartDateInputValue)
                    : setModalStrEndDateInputValue("");
                }}
                Icon={() => {
                  return <EntypoIcon name="chevron-down"></EntypoIcon>;
                }}
              ></Picker>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>조회간격</Text>
            </CardItem>
            <CardItem>
              <Picker
                placeholder
                style={pickerStyle}
                value={modalSearchInterval}
                items={searchIntervalItems}
                onValueChange={searchIntervalVal => {
                  setModalSearchInterval(searchIntervalVal);
                }}
                Icon={() => {
                  return <EntypoIcon name="chevron-down"></EntypoIcon>;
                }}
              ></Picker>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>{modalSearchType == "range" ? "시작날짜" : "날짜"}</Text>
            </CardItem>
            <CardItem>
              <DatePicker
                date={modalStrStartDateInputValue}
                locale="ko"
                cancelBtnText=""
                confirmBtnText="확인"
                onDateChange={startDate => {
                  setModalStrStartDateInputValue(startDate);
                }}
              ></DatePicker>
            </CardItem>
          </Card>
          <Card
            style={
              modalSearchType == "range" ? styles.showCard : styles.hideCard
            }
          >
            <CardItem header bordered>
              <Text>종료날짜</Text>
            </CardItem>
            <CardItem>
              <DatePicker
                date={modalStrEndDateInputValue}
                minDate={modalStrStartDateInputValue}
                locale="ko"
                cancelBtnText=""
                confirmBtnText="확인"
                onDateChange={endDate => {
                  setModalStrEndDateInputValue(endDate);
                }}
              ></DatePicker>
            </CardItem>
          </Card>
        </Content>
      </Modal>
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
          {searchInfo.strStartDateInputValue}{" "}
          {searchInfo.searchType == "range" &&
            "~ " + searchInfo.strEndDateInputValue}
          , {searchInfo.searchInterval}
        </Text>
        <Button
          active
          first
          last
          style={styles.searchButton}
          onPress={() => {
            toggleSearchModal();
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
    handleTrendDataReq: (
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
    }
  };
};

const pickerStyle = StyleSheet.create({
  inputIOS: {
    paddingRight: 15
  }
});

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
  },
  showCard: {
    display: "flex"
  },
  hideCard: {
    display: "none"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendScreen);
