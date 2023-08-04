import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const ViewCart = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0)
    .toFixed(2);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text style={styles.subtotalText}>${totalUSD}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  useEffect(() => {}, [total]);

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total !== 0 ? (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                View Cart - ${totalUSD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "black",
    alignItems: "center",
    padding: 13,
    borderRadius: 30,
    width: 300,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: 500,
    borderWidth: 1,
  },
  restaurantName: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  subtotalText: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: "black",
    alignItems: "center",
    padding: 13,
    borderRadius: 30,
    width: 300,
    position: "relative",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 20,
  },
});
