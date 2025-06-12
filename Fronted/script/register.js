document.getElementById('registerform').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const segundoNombre = document.getElementById('segundoNombre').value;
    const apellidoP = document.getElementById('apellidoP').value;
    const apellidoM = document.getElementById('apellidoM').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nombre,
                segundoNombre,
                apellidoP,
                apellidoM,
                email,
                password
            })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Usuario registrado con éxito');
            window.location.href = 'bienvenida.html';
        } else {
            alert(data.message || 'Error al registrar');
        }
    } catch (err) {
        console.log('Error en la petición del registro', err);
        alert('Error en la red o el servicio');
    }
});
