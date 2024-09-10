document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        // Access auth and db from the window object
        const userCredential = await window.auth.createUserWithEmailAndPassword(email, password);
        const userId = userCredential.user.uid;
        await window.db.collection('users').doc(userId).set({
            email: email,
            createdAt: new Date()
        });
        alert('Registration successful!');
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Error registering:', error);
        alert(error.message);
    }
});
