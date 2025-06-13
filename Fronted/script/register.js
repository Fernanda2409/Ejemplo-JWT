document.getElementById('registerform').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        nombre: document.getElementById('nombre').value,
        segundo_nombre: document.getElementById('segundo_nombre').value,
        apellido_paterno: document.getElementById('apellido_paterno').value,
        apellido_materno: document.getElementById('apellido_materno').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmar_password: document.getElementById('confirmar_password').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.text();
        alert(result);

        if (response.ok) {
            window.location.href = 'bienvenida.html';
        }
    } catch (error) {
        console.error('Error al registrar:', error);
        alert('Error en el registro');
    }
});
