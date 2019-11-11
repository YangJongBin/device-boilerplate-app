import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import _ from "lodash";

const CustomTable = props => {
  const { headerRow = [], bodyRows = [] } = props;

  const widthArr = _.chain(bodyRows)
    .head()
    .values()
    .map(() => {
      //FIXME: 동적으로 바뀌어야함.
      return 50;
    });

  return (
    <Table borderStyle={styles.borderStyle} style={styles.table}>
      <Row data={headerRow} widthArr={widthArr} style={styles.tableHeader} textStyle={styles.textCenter}></Row>
      <Rows data={bodyRows} widthArr={widthArr} textStyle={styles.textRight}></Rows>
    </Table>
  );
};

export default CustomTable;

const styles = StyleSheet.create({
  table: {
    backgroundColor: "white"
  },
  tableHeader: {
    backgroundColor: "yellow",
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  },
  textCenter: {
    textAlign: "center"
  },
  tableBody: {},
  borderStyle: {
    borderWidth: 1
  }
});
