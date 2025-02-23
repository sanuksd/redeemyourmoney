async function trackPayment() {
    let transactionID = document.getElementById("transactionID").value.trim();
    let message = document.getElementById("statusMessage");

    let couponRef = db.collection("coupons").doc(transactionID);
    let doc = await couponRef.get();

    if (!doc.exists) {
        message.innerText = "Invalid Transaction ID!";
        return;
    }

    message.innerText = doc.data().status === "Paid" ? "Payment Successful" : "Payment is in process";
}
