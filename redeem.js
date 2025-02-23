async function redeemCoupon() {
    let couponCode = document.getElementById("couponCode").value.trim();
    let upiID = document.getElementById("upiID").value.trim();
    let message = document.getElementById("message");

    if (!couponCode || !upiID) {
        message.innerText = "Please enter both coupon code and UPI ID.";
        return;
    }

    let couponRef = db.collection("coupons").doc(couponCode);
    let doc = await couponRef.get();

    if (!doc.exists || doc.data().used) {
        message.innerText = "Invalid or already used coupon!";
        return;
    }

    await couponRef.update({
        used: true,
        upi: upiID,
        status: "Pending"
    });

    message.innerText = "Your amount will be credited in 24 hours.";
    setTimeout(() => window.location.href = "index.html", 15000);
}
