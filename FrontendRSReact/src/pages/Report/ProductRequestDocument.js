import React from "react";
import {
    Page,
    Text,
    Document,
    StyleSheet,
    View
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        fontSize: 12,
        padding: "1cm",
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center",
        textDecoration: "underline",
    },
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCellHeader: {
        backgroundColor: "#f2f2f2",
        fontWeight: "bold",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: "#000",
        padding: 5,
    },
    tableCell: {
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: "#000",
        padding: 5,
    },
});

const ProductRequestDocument = ({ selectedOrderItem }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Product Request</Text>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCellHeader}>
                        <Text>Status</Text>
                    </View>
                    <View style={styles.tableCellHeader}>
                        <Text>Bid Price</Text>
                    </View>
                    <View style={styles.tableCellHeader}>
                        <Text>Quantity</Text>
                    </View>
                    <View style={styles.tableCellHeader}>
                        <Text>Total Price</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                        <Text>{selectedOrderItem.status}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>{selectedOrderItem.bidPrice}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>{selectedOrderItem.quantity}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>
                            {selectedOrderItem.bidPrice * selectedOrderItem.quantity}
                        </Text>
                    </View>
                </View>
            </View>

            <Text>
                This is a formal request letter for the product order. Please find the details in the attached table.
            </Text>
        </Page>
    </Document>
);

export default ProductRequestDocument;
