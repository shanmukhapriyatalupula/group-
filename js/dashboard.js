import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";

// Check authentication status
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadAvailableLaptops();
    } else {
        window.location.href = 'login.html';
    }
});

// Load available laptops
async function loadAvailableLaptops() {
    try {
        const q = query(collection(db, 'laptops'), where('available', '==', true));
        const querySnapshot = await getDocs(q);

        const laptopsContainer = document.getElementById('available-laptops');
        laptopsContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const laptop = doc.data();
            const laptopDiv = document.createElement('div');
            laptopDiv.innerHTML = `
                <h3>${laptop.model}</h3>
                <button onclick="bookLaptop('${doc.id}')">Book Now</button>
                <hr>
            `;
            laptopsContainer.appendChild(laptopDiv);
        });
    } catch (error) {
        console.error('Error fetching laptops:', error);
    }
}

// Book a laptop
async function bookLaptop(laptopId) {
    const user = auth.currentUser;
    if (user) {
        const timeSlot = prompt('Enter your preferred time slot (e.g., 10:00 AM - 12:00 PM):');
        if (timeSlot) {
            try {
                await addDoc(collection(db, 'bookings'), {
                    userId: user.uid,
                    laptopId: laptopId,
                    timeSlot: timeSlot,
                    timestamp: new Date()
                });

                await updateDoc(doc(db, 'laptops', laptopId), {
                    available: false
                });

                alert('Booking successful!');
                loadAvailableLaptops();
            } catch (error) {
                alert('Error booking laptop:', error.message);
            }
        }
    } else {
        alert('Please log in to book a laptop.');
        window.location.href = 'login.html';
    }
}
