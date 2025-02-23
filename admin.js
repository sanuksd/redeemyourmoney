async function loadCoupons() {
    let table = document.getElementById("couponTable");
    table.innerHTML = "<tr><th>Coupon</th><th>UPI ID</th><th>Status</th><th>Action</th></tr>";

    let querySnapshot = await db.collection("coupons").where("used", "==", true).get();

    querySnapshot.forEach(doc => {
        let data = doc.data();
        let row = table.insertRow();
        row.insertCell(0).innerText = doc.id;
        row.insertCell(1).innerText = data.upi;
        row.insertCell(2).innerText = data.status;
        let btn = document.createElement("button");
        btn.innerText = "Mark as Paid";
        btn.onclick = () => markAsPaid(doc.id);
        if (data.status === "Paid") btn.disabled = true;
        row.insertCell(3).appendChild(btn);
    });
}

async function markAsPaid(couponCode) {
    await db.collection("coupons").doc(couponCode).update({ status: "Paid" });
    alert("Marked as Paid");
    loadCoupons();
}

loadCoupons();
