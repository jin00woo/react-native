import { View, Text } from "react-native";
import React from "react";

const OrderItem = ({ item }) => {
  const { title, price } = item;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#999",
      }}
    >
      <Text style={{ fontWeight: "600", fontSize: 16, opacity: 0.7 }}>
        {title}
      </Text>
      <Text style={{ opacity: 0.7, fontSize: 16 }}>{price}</Text>
    </View>
  );
};

export default OrderItem;
