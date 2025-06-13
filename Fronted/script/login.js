document.getElementById('loginform').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Guarda el token en localStorage
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
        } else {
            alert(data || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error en el login');
    }
});
