import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Container, Content, Header } from "native-base";

const { height } = Dimensions.get("window");

const ReportScreen = props => {
  return (
    <Container style={styles.container}>
      <Content style={styles.content}>
        <View style={styles.view}>
          <Text>업데이트 예정입니다.</Text>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  view: {
    height: height,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ReportScreen;
